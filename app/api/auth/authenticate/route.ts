import { NextRequest, NextResponse } from 'next/server';
import { authenticateUser } from '@/_lib/auth-service';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    const authResult = await authenticateUser(email, password);

    if (authResult.success) {
      return NextResponse.json(authResult);
    } else {
      return NextResponse.json(authResult, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Authentication failed' },
      { status: 500 }
    );
  }
}