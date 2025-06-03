import { prisma } from "@/_lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateTokens } from "@/_lib/tokens/auth-token";

export async function POST(request: NextRequest) {
  try {
    // Validate content type
    const contentType = request.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Content-Type must be application/json" 
        },
        { status: 400 }
      );
    }

    const { refreshToken, sessionId } = await request.json();

    if (!refreshToken || !sessionId) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing refresh token or session ID",
        },
        { status: 400 }
      );
    }

    // Find the session
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: { user: true },
    });

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid session",
        },
        { status: 401 }
      );
    }

    // Check if session is expired
    if (session.expires_at < new Date()) {
      // Clean up expired session
      await prisma.session.delete({
        where: { id: sessionId },
      });

      return NextResponse.json(
        {
          success: false,
          message: "Session expired",
        },
        { status: 401 }
      );
    }

    // Verify the refresh token against stored hash
    const isValidToken = await bcrypt.compare(refreshToken, session.token);
    if (!isValidToken) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid refresh token",
        },
        { status: 401 }
      );
    }

    // Check if user is still active
    if (session.user.status !== "active" && session.user.status !== "paid" && session.user.status !== "onboarded") {
      return NextResponse.json(
        {
          success: false,
          message: "User account is not active",
        },
        { status: 403 }
      );
    }

    // Generate new access token
    const newAccessToken = await generateTokens(session.user);

    // Optionally generate new refresh token for rotation
    let newRefreshToken = refreshToken;
    let newTokenHash = session.token;

    // Implement refresh token rotation for better security
    if (process.env.REFRESH_TOKEN_ROTATION === "true") {
      newRefreshToken = await generateTokens(session.user);
      newTokenHash = await bcrypt.hash(newRefreshToken, 10);

      // Update session with new refresh token hash
      await prisma.session.update({
        where: { id: sessionId },
        data: {
          token: newTokenHash,
          last_used_at: new Date(),
        },
      });
    } else {
      // Just update last used timestamp
      await prisma.session.update({
        where: { id: sessionId },
        data: {
          last_used_at: new Date(),
        },
      });
    }

    console.log(`Token refreshed for user: ${session.user.id}`);

    return NextResponse.json(
      {
        success: true,
        accessToken: newAccessToken,
        refreshToken: process.env.REFRESH_TOKEN_ROTATION === "true" ? newRefreshToken : undefined,
        message: "Token refreshed successfully",
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Refresh token error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while refreshing token",
      },
      { status: 500 }
    );
  }
}