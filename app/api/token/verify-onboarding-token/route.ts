import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();
    
    if (!token) {
      return NextResponse.json({ error: 'Token is required' }, { status: 400 });
    }
    
    try {
      const decoded = jwt.verify(token, process.env.ONBOARDING_TOKEN_SECRET!) as any;
         if (decoded.type !== 'pending') {
        return NextResponse.json({ error: 'Invalid token type' }, { status: 400 });
      }
      
      return NextResponse.json({ 
        success: true, 
        userId: decoded.userId,
        message: 'Token verified successfully' 
      }, { status:200 });
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

// async function sendPropertySelectionEmail(user: any, resend: any, newToken = false) {
//   try {
// const renewExistingToken = generateNewPropertySelectionToken(user.id)
//  const propertySelectionToken = generatePropertySelectionToken(user.id);
//     const validatedToken = newToken ? `${process.env.NEXTAUTH_URL}/properties?token=${renewExistingToken}` : `${process.env.NEXTAUTH_URL}/properties?token=${propertySelectionToken}`;

//     const emailResult = await resend.emails.send({
//       from: "noreply@hisnad.com",
//       to: user.email,
//       subject: "Select Your Property - HISNAD",
//       html: `
//         <div style="font-family: 'Roboto', sans-serif; max-width: 600px; margin: 0 auto; background-color: #eaf5ff; padding: 20px;">
//           <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
//             <h1 style="color: #007cba; margin-bottom: 20px; text-align: center;">HISNAD</h1>
//             <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
//               Welcome, ${user.firstName}!
//             </p>
//             <p style="font-size: 14px; color: #666; margin-bottom: 30px;">
//               We're excited to have you onboard. Click the button below to start your property selection process.
//             </p>
//             <div style="text-align: center; margin: 40px 0;">
//               <a href="${validatedToken}" 
//                  style="background-color: #007cba; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold; font-size: 16px;">
//                 Select a Property
//               </a>
//             </div>
//             <p style="font-size: 12px; color: #999; text-align: center; margin-top: 30px;">
//               If you didn't request this email, please ignore it.
//             </p>
//             <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
//             <p style="font-size: 12px; color: #999; text-align: center;">
//               © ${new Date().getFullYear()} HISNAD. All rights reserved.
//             </p>
//           </div>
//         </div>
//       `,
//     });

//     if (emailResult.error) {
//       console.error("Email sending error:", emailResult.error);
//       return NextResponse.json(
//         {
//           message: "Failed to send property selection link, try again",
//           success: false,
//         },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json(
//       {
//         message: `Email confirmation link sent successfully to ${user.email}`,
//         success: true,
//         onboardingUser: {
//           userId: user.id,
//           email: user.email,
//           firstName: user.firstName,
//           lastName: user.lastName,
//           status: user.status,
//           accountType: user.accountType,
//           userstatus: user.status,
//         },
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error in sendPropertySelectionEmail:", error);
//     return NextResponse.json(
//       {
//         message: "Failed to send property selection email",
//         success: false,
//       },
//       { status: 500 }
//     );
//   }
// }