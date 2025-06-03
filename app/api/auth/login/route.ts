import { getUserById } from "@/_lib/data-service";
import bcrypt from "bcryptjs";
import { refreshAccessToken } from "@/_lib/tokens/auth-token";
import { loginSchema } from "@/schemas/auth.schema";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/_lib/prisma";
import { CustomToken } from "@/constants/types";

export async function POST(request: NextRequest) {
  try {
    // Validate content type
    if (!request.headers.get("content-type")?.includes("application/json")) {
      return NextResponse.json(
        { success: false, error: "Content-Type must be application/json" },
        { status: 400 }
      );
    }

    // Parse and validate request body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        {
          message: "Invalid JSON format",
          success: false,
        },
        { status: 400 }
      );
    }

    const { email, password } = await request.json();
    const validateLoginFields = loginSchema.safeParse(email, password);

    if (
      !validateLoginFields.success ||
      !email ||
      !password ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      email.trim() === "" ||
      password.trim() === "" ||
      password.length < 6
    ) {
      return NextResponse.json(
        {
          message: "Please provide a valid email and password",
          success: false,
          error: validateLoginFields.error?.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    //    get user by id
    const user = await getUserById(email);

    // hash password and compare with the stored password
    const isPasswordValid =
      typeof user?.password_hash === "string" &&
      bcrypt.compare(password, user?.password_hash);

    // check if user email exist
    if (!user || !isPasswordValid) {
      console.error("Invalid email or password");
      return NextResponse.json(
        {
          message: "Invalid email or password",
          success: false,
        },
        { status: 401 }
      );
    }

    if (user && user.status === "pending") {
      return NextResponse.json(
        {
          message: "Complete onboarding",
          success: false,
          requuiresOnboarding: true,
        },
        { status: 403 }
      );
    }

    // Validate user status for login
    const validStatuses = ["paid", "onboarded", "active"];
    if (!validStatuses.includes(user.status)) {
      return NextResponse.json(
        {
          message:
            "Account status does not allow login. Please contact support.",
          success: false,
        },
        { status: 403 }
      );
    }

    // Generate tokens
    const tokenResult = await refreshAccessToken(
      user as unknown as CustomToken
    );
    if (!tokenResult) {
      throw new Error("Failed to refresh access token.");
    }

    const hashedRefreshToken = await bcrypt.hash(tokenResult.refreshToken, 12);
    const sessionId = crypto.randomUUID();
    const session = await prisma.session.create({
      data: {
        id: sessionId,
        token: hashedRefreshToken,
        user_id: user.id,
        expires_at: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000),
      },
    });

    if (!tokenResult.refreshToken || !session) {
      console.error("Token generation failed for user:", user.id);
      return NextResponse.json(
        {
          message: "Authentication service temporarily unavailable",
          success: false,
        },
        { status: 503 }
      );
    }

    // Set secure cookie
    const cookiesStore = await cookies();
    cookiesStore.set({
      name: "refreshToken",
      value: tokenResult.refreshToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    // Log successful login (without sensitive data)
    console.log(
      `Successful login for user ID: ${user.id} at ${new Date().toISOString()}`
    );

    console.log(cookiesStore.get("refreshToken"));

    return NextResponse.json(
      {
        message: "Login successful, start tracking your payments",
        success: true,
        sessionId: session.id,
        accessToken: tokenResult.accessToken,
        refreshToken: tokenResult.refreshToken,
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          userId: user.id,
          accountType: user.accountType,
          redirectToDashboard: true,
        },
      },
      {
        status: 200,
        headers: {
          // Security headers
          "X-Content-Type-Options": "nosniff",
          "X-Frame-Options": "DENY",
          "X-XSS-Protection": "1; mode=block",
        },
      }
    );
  } catch (error) {
    console.error("Login error:", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        message: "An internal error occurred. Please try again later.",
        success: false,
      },
      { status: 500 }
    );
  }
}
