import { prisma } from "@/_lib/prisma";
import { NextResponse } from "next/server";

export async function POST(response: NextResponse) {
  try {
    if (!response.headers.get('content-type')?.includes('application/json')) {
      return NextResponse.json(
        { success: false, error: 'Content-Type must be application/json' },
        { status: 400 }
      );
    }

    const { email } = await response.json();
    
    // Validate email
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Valid email is required' },
        { status: 400 }
      );
    }

    const deletedUser = await prisma.user.delete({
      where: { email: email },
    });

    return NextResponse.json(
      { success: true, deletedUser: { email: deletedUser.email } },
      { status: 200 }
    );
    
  } catch (error:any) {
    if (error.code === 'P2025') { 
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }
    
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}