import { prisma } from "@/_lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { hashedData, splitPhoneNumber } from "@/_lib/utils";
import { getUserByHashedIdFromDB } from "@/_lib/prisma-data-service";
import { Resend } from "resend";
import { generateNewPropertySelectionToken, generatePropertySelectionToken } from "@/_lib/tokens/select-property-token";

export async function POST(request: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    // Validate content type
    if (!request.headers.get("content-type")?.includes("application/json")) {
      return NextResponse.json(
        { success: false, error: "Content-Type must be application/json" },
        { status: 400 }
      );
    }

    const body = await request.json();

    const { userId, userData, resendEmail = false } = body;
    if (!userId) {
      return NextResponse.json(
        {
          message: "User ID is required",
          success: false,
        },
        { status: 400 }
      );
    }

    // Validate environment variables
    if (!process.env.NEXTAUTH_URL || !process.env.RESEND_API_KEY) {
      console.error("Missing required environment variables");
      return NextResponse.json(
        {
          message: "Service temporarily unavailable",
          success: false,
        },
        { status: 503 }
      );
    }

    // Get user by hashed ID
    const onboardingUser = await getUserByHashedIdFromDB(userId);

    // If onboardingUser is not found, return a 404 response
    if (!onboardingUser) {
      return NextResponse.json(
        {
          message: "User not found",
          success: false,
        },
        { status: 404 }
      );
    }

    const isAlreadyOnboarded = ['onboarded', 'paid', 'active'];

    // Handle resend email for already onboarded users
    if (isAlreadyOnboarded.includes(onboardingUser.status)) {
      if (resendEmail) {
        return await sendPropertySelectionEmail(resend, true, onboardingUser);
      } else {
        return NextResponse.json(
          {
            message: "User is already onboarded. Set resendEmail=true to resend property selection email.",
            success: false,
          },
          { status: 400 }
        );
      }
    }

    // Handle normal onboarding flow
    if (onboardingUser.status === 'pending') {
      if (resendEmail) {
        return NextResponse.json(
          {
            message: "Cannot resend email for pending users. Complete onboarding first.",
            success: false,
          },
          { status: 400 }
        );
      }

      if (!userData) {
        return NextResponse.json(
          {
            message: "User data is required for onboarding",
            success: false,
          },
          { status: 400 }
        );
      }

      // destructure userData
      const {
        password,
        firstName,
        lastName,
        address,
        phoneNumber,
        nextOfKinName,
        nextOfKinPhoneNumber,
        nextOfKinAddress,
        accountType = "USER",
        status = "onboarded",
      } = userData;

      if (!password || !firstName || !lastName) {
        return NextResponse.json(
          {
            message: "Required fields are missing",
            success: false,
          },
          { status: 400 }
        );
      }

      // hash password
      const hashedPassword = await bcrypt.hash(password, 12);
      // format phone number
      const formattedPhoneNumber = phoneNumber
        ? splitPhoneNumber(phoneNumber)
        : null;
      const formattedNextOfKinPhoneNumber = nextOfKinPhoneNumber
        ? splitPhoneNumber(nextOfKinPhoneNumber)
        : null;

      // update the onboardingUser with the provided data
      // Use the actual database ID field, not hashedId
      const updatedUser = await prisma.user.update({
        where: { id: onboardingUser.id }, 
        data: {
          firstName: firstName,
          lastName: lastName,
          address: address,
          phoneNumber: formattedPhoneNumber,
          nextOfKinName: nextOfKinName,
          nextOfKinPhoneNumber: formattedNextOfKinPhoneNumber,
          nextOfKinAddress: nextOfKinAddress,
          password_hash: hashedPassword,
          accountType: accountType.toUpperCase(),
          status: status,
        },
      });

      return await sendPropertySelectionEmail(resend, false, updatedUser);
    }

    // Handle case where user status is not recognized
    return NextResponse.json(
      {
        message: `User status '${onboardingUser.status}' is not supported for this operation.`,
        success: false,
      },
      { status: 400 }
    );

  } catch (error: any) {
    console.error("Onboarding error:", error);
    return NextResponse.json(
      {
        message: "Onboarding failed, please try again",
        success: false,
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}

// Helper function to send property selection email
async function sendPropertySelectionEmail(resend: any, newToken = false, user?: any) {
  try {
    if (!user) {
      throw new Error("User object is required");
    }

    const renewExistingToken = generateNewPropertySelectionToken(user.hashedId);
    const propertySelectionToken = generatePropertySelectionToken(user.hashedId);
    const validatedToken = newToken ? renewExistingToken : propertySelectionToken;
    const selectPropertyUrl = `${process.env.NEXTAUTH_URL}/properties?token=${validatedToken}`;
    const emailResult = await resend.emails.send({
      from: "noreply@hisnad.com",
      to: user.email,
      subject: "Select Your Property - HISNAD",
      html: `
        <div style="font-family: 'Roboto', sans-serif; max-width: 600px; margin: 0 auto; background-color: #eaf5ff; padding: 20px;">
          <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h1 style="color: #007cba; margin-bottom: 20px; text-align: center;">HISNAD</h1>
            <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
              Welcome, ${user.firstName}!
            </p>
            <p style="font-size: 14px; color: #666; margin-bottom: 30px;">
              We're excited to have you onboard. Click the button below to start your property selection process.
            </p>
            <div style="text-align: center; margin: 40px 0;">
              <a href="${selectPropertyUrl}" 
                 style="background-color: #007cba; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold; font-size: 16px;">
                Select a Property
              </a>
            </div>
            <p style="font-size: 12px; color: #999; text-align: center; margin-top: 30px;">
              If you didn't request this email, please ignore it.
            </p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            <p style="font-size: 12px; color: #999; text-align: center;">
              © ${new Date().getFullYear()} HISNAD. All rights reserved.
            </p>
          </div>
        </div>
      `,
    });

    if (emailResult.error) {
      console.error("Email sending error:", emailResult.error);
      return NextResponse.json(
        {
          message: "Failed to send property selection link, try again",
          success: false,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: `Email confirmation link sent successfully to ${user.email}`,
        success: true,
        onboardingUser: {
          userId: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          status: user.status,
          accountType: user.accountType,
          userstatus: user.status,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in sendPropertySelectionEmail:", error);
    return NextResponse.json(
      {
        message: "Failed to send property selection email",
        success: false,
      },
      { status: 500 }
    );
  }
}