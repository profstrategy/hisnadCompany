import { prisma } from "@/_lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { splitPhoneNumber } from "@/_lib/utils";
import { getUserById } from "@/_lib/data-service";
import { verifyOnboardingToken } from "@/_lib/tokens/onboarding-token";


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { userId: onboardingToken, userData } = body;
    if (!onboardingToken) {
      return NextResponse.json({
        message: "Onboarding token is required",
        success: false,
      }, { status: 400 });
    }
    
   // Verify and extract userId from token
    const tokenData = verifyOnboardingToken(onboardingToken);

    if (!tokenData) {
      return NextResponse.json({
        message: "Invalid or expired onboarding token",
        success: false,
      }, { status: 401 });
    }

    const { userId } = tokenData

    if (!userData) {
      return NextResponse.json({
        message: "User data is required",
        success: false,
      }, { status: 400 });
    }

    const onboardingUser = await getUserById(userId)

    // If user is not found or not in pending status, return a 404 response
    if (!onboardingUser || onboardingUser.status !== "pending") {
      return NextResponse.json({
        message: "User not found or not in pending status",
        success: false,
      }, { status: 404 });
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
      accountType = 'USER',
      status = 'onboarded'
    } = userData;

    // Fix 3: Add validation for required fields
    if (!password || !firstName || !lastName) {
      return NextResponse.json({
        message: "Required fields are missing",
        success: false,
      }, { status: 400 });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    // format phone number
    const formattedPhoneNumber = phoneNumber ?  splitPhoneNumber(phoneNumber) : null;
    const formattedNextOfKinPhoneNumber = nextOfKinPhoneNumber ? splitPhoneNumber(nextOfKinPhoneNumber) : null;

    // update the user with the provided data
    const updatedUser = await prisma.user.update({
      where: { id: userId },
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
        status: status
      }
    });
   
    return NextResponse.json(
      {
        message: "Onboarding completed successfully",
        success: true,
        user: {
          userId: updatedUser.id, 
          email: updatedUser.email,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          status: updatedUser.status,
          accountType: updatedUser.accountType,
          userstatus: updatedUser.status
        }
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Onboarding error:', error);
   
    return NextResponse.json(
      {
        message: "Onboarding failed, please try again",
        success: false,
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}