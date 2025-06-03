import { prisma } from "@/_lib/prisma";
import { generateOnboardingToken } from "@/_lib/tokens/onboarding-token";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    const cleanEmail = email.toLowerCase().trim();

    // Validate input
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        {
          message: "Please provide a valid email address",
          success: false,
          userExists: false,
        },
        { status: 400 }
      );
    }

    // Check if email exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    // if email exist and is on pending return a message and generate a new token
    if (existingUser) {
      // if email exists and is onboarded, return a message
      if (existingUser.status !== "pending") {
        return NextResponse.json(
          {
            message:
              "You have completed onboarding process, please select a property to continue",
            registeredEmail: existingUser.email,
            status: existingUser.status,
            success: false,
            shouldRedirectToProperties: true,
          },
          { status: 409 }
        );
      }
      // Return conflict response if user already exists
      return NextResponse.json(
        {
          message: `We found your email ${existingUser.email} in our database`,
          email: existingUser.email,
          status: existingUser.status,
          success: false,
          isReturningPendingUser: true,
          shouldRedirectToProperties: false,
        },
        { status: 409 }
      );
    }

    // create a pending user
    const pendingUser = await prisma.user.create({
      data: {
        email: cleanEmail,
        status: "pending",
        created_at: new Date().toISOString(),
      },
    });

    // Generate secure token
    const onboardingToken =  generateOnboardingToken(pendingUser.id);
    console.log("Generated onboarding token:", onboardingToken);

    // Return successful response
    return NextResponse.json(
      {
        userId: onboardingToken,
        status: pendingUser.status,
        message: "Email Registered successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      {
        message: "Internal server error due to network",
        success: false,
      },
      { status: 500 }
    );
  }
}
