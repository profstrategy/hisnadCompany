// import jwt from "jsonwebtoken";
// import { prisma } from "../prisma";
// import crypto from 'crypto'
// import { CustomToken } from "@/constants/types";
// const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
// const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;
// const ACCESS_EXPIRY_TIME = "15m";
// const REFRESH_EXPIRY_TIME = "7d";

// interface User {
//   id: string;
//   email: string;
//   status: string;
// }

// if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
//   throw new Error("Token secrets must be defined");
// }

// interface User {
//   id: string;
//   email: string;
//   status: string;
// }

// export const generateTokens = (user: User | null
// ) => {
//   if (!user?.id || !user?.email) {
//     throw new Error("Invalid user data for token generation");
//   }

//   const payload = {
//     userId: user.id,
//     email: user.email,
//     status: user.status,
//     iat: Math.floor(Date.now() / 1000),
//   };

//   const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
//     expiresIn: ACCESS_EXPIRY_TIME,
//     issuer: "hisnad",
//     audience: "hisnad",
//     algorithm: "HS256"
//   });

//   const refreshToken = jwt.sign(
//     { 
//       userId: user.id, 
//       tokenId: crypto.randomUUID(),
//       type: "refresh" 
//     },
//     REFRESH_TOKEN_SECRET,
//     { 
//       expiresIn: REFRESH_EXPIRY_TIME,
//       algorithm: "HS256"
//     }
//   );

//   return { accessToken, refreshToken };
// };


// export const verifyToken = (token: string, secret: string, tokenType: 'access' | 'refresh' = 'access') => {

//   if (!token || typeof token !== 'string' || token.trim() === "") {
//     throw new Error("Invalid token provided");
//   }

//   if (!secret) {
//     throw new Error("Token secret not provided");
//   }

//   try {
//     const decoded = jwt.verify(token, secret, {
//       issuer: tokenType === 'access' ? "hisnad" : undefined,
//       audience: tokenType === 'access' ? "hisnad" : undefined,
//       algorithms: ["HS256"] 
//     }) as any;


//     const validStatuses = ["paid", "onboarded", "active"];
//     if (tokenType === 'access' && !validStatuses.includes(decoded.status)) {
//       throw new Error("Invalid user status");
//     }


//     if (tokenType === 'refresh' && decoded.type !== 'refresh') {
//       throw new Error("Invalid token type");
//     }

//     return decoded;
//   } catch (error) {
//     if (error instanceof jwt.JsonWebTokenError) {
//       throw new Error(`Token verification failed: ${error.message}`);
//     }
//     throw error;
//   }
// };

// export const storeRefreshToken = async (
//   userId: string,
//   refreshToken: string
// ) => {
  
//   if (!userId || !refreshToken) {
//     throw new Error("UserId and refresh token are required");
//   }

//   const hashedRefreshToken = crypto
//     .createHash("sha256")
//     .update(refreshToken)
//     .digest("hex");

//   try {
   
//     await prisma.$transaction(async (tx:any) => {

//       await tx.refreshToken.deleteMany({
//         where: {
//           user_id: userId,
//           OR: [
//             { expires_at: { lt: new Date() } },
//             { isActive: false }
//           ]
//         },
//       });

//       const activeTokenCount = await tx.refreshToken.count({
//         where: {
//           user_id: userId,
//           isActive: true,
//           expires_at: { gt: new Date() }
//         }
//       });

//       if (activeTokenCount >= 5) { 
//         const oldestToken = await tx.refreshToken.findFirst({
//           where: {
//             user_id: userId,
//             isActive: true
//           },
//           orderBy: { created_at: 'asc' }
//         });

//         if (oldestToken) {
//           await tx.refreshToken.delete({
//             where: { id: oldestToken.id }
//           });
//         }
//       }

//       // Store new token
//       await tx.refreshToken.create({
//         data: {
//           token: hashedRefreshToken,
//           user_id: userId,
//           isActive: true,
//           expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
//           created_at: new Date(),
//         },
//       });
//     });

//   } catch (error) {
//     console.error("Error storing refresh token:", error);
//     throw new Error("Failed to store refresh token");
//   }
// };


// export async function refreshAccessToken(token: CustomToken): Promise<CustomToken | null> {
//   try {
    
//     const response = await fetch('api/create-user/refresh', {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         refreshToken: token.refreshToken,
//         sessionId: token.sessionId,
//       }),
//     });

//     if (!response.ok) {
//       console.error("Refresh token API error:", response.status);
//       return null;
//     }

//     const refreshedTokens = await response.json();

//     if (!refreshedTokens.success || !refreshedTokens.accessToken) {
//       console.error("Invalid refresh token response");
//       return null;
//     }

//     return {
//       ...token,
//       accessToken: refreshedTokens.accessToken,
//       refreshToken: refreshedTokens.refreshToken || token.refreshToken,
//       tokenExpires: Date.now() + (24 * 60 * 60 * 1000), // 24 hours from now
//     };
//   } catch (error) {
//     console.error("Error refreshing access token:", error);
//     return null;
//   }
// }