// import { getUser } from "@/_lib/prisma-data-service";
// import { NextRequest, NextResponse } from "next/server";
// import { Resend } from "resend";




// export async function POST(req: NextRequest) {
//   try {

//     // Validate request body
//     const body = await req.json();
    
//     const { email } = body;

//     // Check if user exists and has valid status
//     const user = await getUser(email);
//     const validStatuses = ["onboarded"];
    
//     if (!user || !validStatuses.includes(user.status)) {
//       // Return success even if user doesn't exist to prevent email enumeration
//       return NextResponse.json(
//         {
//           message: "If an account with this email exists and is eligible, a property selection link has been sent.",
//           success: true,
//         },
//         { status: 200 }
//       );
//     }

//     // Validate environment variables
//     if (!process.env.NEXTAUTH_URL || !process.env.RESEND_API_KEY) {
//       console.error("Missing required environment variables");
//       return NextResponse.json(
//         {
//           message: "Service temporarily unavailable",
//           success: false,
//         },
//         { status: 503 }
//       );
//     }

//     const selectPropertyUrl = `${process.env.NEXTAUTH_URL}/properties`;

//     // Send property selection email
//     const emailResult = await resend.emails.send({
//       from: "noreply@hisnad.com",
//       to: email,
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
//               <a href="${selectPropertyUrl}" 
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

//     // Check for email sending errors
//     if (emailResult.error) {
//       console.error("Email sending error:", emailResult.error);
//       return NextResponse.json(
//         {
//           message: "Failed to send property selection link",
//           success: false,
//         },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json(
//       {
//         message: `Property selection link sent successfully to ${user.email}`,
//         success: true,
//       },
//       { status: 200 }
//     );

//   } catch (error) {
//     console.error("Property selection email error:", error);
//     return NextResponse.json(
//       {
//         message: "Failed to send property selection link",
//         success: false,
//       },
//       { status: 500 }
//     );
//   }
// }