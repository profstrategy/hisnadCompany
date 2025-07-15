import { prisma } from "@/_lib/prisma";
import { getUserByHashedIdFromDB } from "@/_lib/prisma-data-service";
import { generateOnboardingToken } from "@/_lib/tokens/onboarding-token";
import { hashUserId } from "@/_lib/utils";
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
      message: "You have completed onboarding process, please validate your account first...",
      registeredEmail: existingUser.email,
      status: existingUser.status,
      success: true,
      resendEmailModal: true,
      action: 'redirect' 
    },
    { status: 200 }
  );
}

const onboardingId = await getUserByHashedIdFromDB(existingUser.hashedId ?? '');
      // If user is pending, generate token and return success
      if (existingUser.status === 'pending') {
        
        console.log("Generated onboarding token for existing pending user:", onboardingId);

        return NextResponse.json(
          {
            userId: onboardingId?.hashedId,
            message: `Welcome back! We found your email ${existingUser.email} in our database. Continue your onboarding process.`,
            email: existingUser.email,
            status: existingUser.status,
            success: true,
            isReturningPendingUser: true,
          },
          { status: 200 }
        );
      }

      // Handle any other status (fallback)
      return NextResponse.json(
        {
          message: `We found your email ${existingUser.email} with status: ${existingUser.status}`,
          userId: onboardingId?.hashedId,
          email: existingUser.email,
          status: existingUser.status,
          success: false,
          isReturningPendingUser: true,
          shouldRedirectToProperties: false,
        },
        { status: 200 }
      );
    }

    // create hash id
    const hashId = await hashUserId(crypto.randomUUID())

    // Create a new pending user
    const pendingUser = await prisma.user.create({
      data: {
        hashedId:hashId,
        email: cleanEmail,
        status: "pending",
        created_at: new Date().toISOString(),
      },
    });

    // Generate secure token for new user
    // const onboardingId = generateOnboardingToken(pendingUser.id);

    // Return successful response
    return NextResponse.json(
      {
        userId: hashId,
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