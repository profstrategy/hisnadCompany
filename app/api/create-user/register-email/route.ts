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
      where: { email: cleanEmail },
    });

    if (existingUser) {
      const completedStatuses = ['onboarded', 'paid', 'active'];
      
    if (completedStatuses.includes(existingUser.status)) {
  return NextResponse.json(
    {
      message: "You have completed onboarding process, Redirecting to properties page...",
      registeredEmail: existingUser.email,
      status: existingUser.status,
      success: true,
      shouldRedirectToProperties: true,
      action: 'redirect' 
    },
    { status: 200 }
  );
}

      // If user is pending, generate token and return success
      if (existingUser.status === 'pending') {
        const onboardingToken = generateOnboardingToken(existingUser.id);
        console.log("Generated onboarding token for existing pending user:", onboardingToken);

        return NextResponse.json(
          {
            userId: onboardingToken,
            message: `Welcome back! We found your email ${existingUser.email} in our database. Continue your onboarding process.`,
            email: existingUser.email,
            status: existingUser.status,
            success: true,
            isReturningPendingUser: true,
            shouldRedirectToProperties: false,
          },
          { status: 200 }
        );
      }

      // Handle any other status (fallback)
      return NextResponse.json(
        {
          message: `We found your email ${existingUser.email} with status: ${existingUser.status}`,
          email: existingUser.email,
          status: existingUser.status,
          success: false,
          isReturningPendingUser: true,
          shouldRedirectToProperties: false,
        },
        { status: 200 }
      );
    }

    // Create a new pending user
    const pendingUser = await prisma.user.create({
      data: {
        email: cleanEmail,
        status: "pending",
        created_at: new Date().toISOString(),
      },
    });

    // Generate secure token for new user
    const onboardingToken = generateOnboardingToken(pendingUser.id);
    console.log("Generated onboarding token for new user:", onboardingToken);

    // Return successful response
    return NextResponse.json(
      {
        userId: onboardingToken,
        status: pendingUser.status,
        message: "Email registered successfully",
        success: true,
        isReturningPendingUser: false,
      },
      { status: 201 }
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