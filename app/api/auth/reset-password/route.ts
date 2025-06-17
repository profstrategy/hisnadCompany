import { prisma } from "@/_lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";


export async function POST(req: NextRequest) {
  try {
    // Check content type
    if (!req.headers.get("content-type")?.includes("application/json")) {
      return NextResponse.json(
        { success: false, error: "Content-Type must be application/json" },
        { status: 400 }
      );
    }

    // Parse request body
    const { newPassword, reset_password_token } = await req.json();

    // find reset token in the db
    const user = await prisma.user.findFirst({
  where: { 
    reset_password_token: reset_password_token,
  }
});

const validStatus = ["paid", "active"];

if (!user || !validStatus.includes(user.status)) {
  console.log("User status:", user?.status);
  return NextResponse.json(
    {
      message: "Incomplete registration or account not active",
      success: false,
    },
    { status: 403 } 
  );
}


    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password and clear the reset token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password_hash: hashedPassword,
        reset_password_token: null,
      },
    });

    return NextResponse.json({
      message: "Password changed successfully",
      description: 'You can login with your updated details',
      redirectToLogin: true,
      success: true,
    });
  } catch (error: any) {
    console.error("Failed to reset password:", error);

    // Check if it's a Prisma error
    if (error.code === "P2025") {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
