import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();
    
    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }
    
    try {
      const decoded = jwt.verify(userId, process.env.JWT_SECRET_EMAIL!) as any;
      
      if (decoded.purpose !== 'property_selection') {
        return NextResponse.json({ error: 'Invalid userId purpose' }, { status: 400 });
      }
      
      return NextResponse.json({ 
        success: true, 
        userId: decoded.userId,
        message: 'userId verified successfully' 
      });
    } catch (jwtError:any) {
      
      if (jwtError.name === 'TokenExpiredError') {
        return NextResponse.json({ error: 'Token has expired' }, { status: 401 });
      } else if (jwtError.name === 'JsonWebTokenError') {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
      }
      
      return NextResponse.json({ error: 'Token verification failed' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
