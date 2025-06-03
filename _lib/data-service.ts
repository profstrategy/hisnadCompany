import { prisma } from "./prisma";

export const getUser = async (email: string) => {
 const user  = await prisma.user.findUnique({
    where: { email: email },
  });
return user
};

export const getUserById = async (id:string) => { 
    const userId = await prisma.user.findUnique({
    where: { id: id }
})
return userId
}


// async session(params): Promise<CustomSession> {
//       const { session, token } = params;
//       const customToken = token as CustomToken;

//       // Check if there's an error (like expired refresh token)
//       if (customToken.error) {
//         console.log("Session callback - token error:", customToken.error);
//         // You might want to redirect to login or handle this differently
//         throw new Error("Session expired");
//       }

//       const customSession: CustomSession = {
//         ...session,
//         user_id: customToken.user_id,
//         accessToken: customToken.accessToken,
//         sessionId: customToken.sessionId,
//         accountType: customToken.accountType,
//         status: customToken.status,
//         user: {
//           ...session.user,
//           id: customToken.user_id,
//           name:
//             customToken.firstName && customToken.lastName
//               ? `${customToken.firstName} ${customToken.lastName}`
//               : session.user?.name,
//           accountType: customToken.accountType,
//         },
//       };

//       // Update last used timestamp in database
//       if (customToken.sessionId) {
//         try {
//           await prisma.session
//             .update({
//               where: { id: customToken.sessionId },
//               data: {
//                 updated_at: new Date(),
//               },
//             })
//             .catch(() => {
//               // Session might have been deleted, ignore error
//               console.warn("Could not update session timestamp");
//             });
//         } catch (error) {
//           console.error("Error updating session:", error);
//         }
//       }

//       return customSession;
//     },


//  async jwt(params): Promise<CustomToken> {
//       const { token, user, account } = params;

//       // Initial sign in
//       if (user && account) {
//         const customUser = user as CustomUser;
//         console.log("JWT callback - initial sign in:", {
//           userId: customUser.id,
//         });

//         return {
//           ...token,
//           user_id: customUser.id,
//           accessToken: customUser.accessToken,
//           refreshToken: customUser.refreshToken,
//           sessionId: customUser.sessionId,
//           firstName: customUser.firstName,
//           lastName: customUser.lastName,
//           accountType: customUser.accountType,
//           status: customUser.status,
//           tokenExpires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours from now
//         } as CustomToken;
//       }

//       // Return previous token if the access token has not expired yet
//       const customToken = token as CustomToken;
//       if (Date.now() < customToken.tokenExpires) {
//         return customToken;
//       }

//       // Access token has expired, try to refresh it
//       console.log("JWT callback - token expired, refreshing...");

//       try {
//         const refreshedToken = await refreshAccessToken(customToken);
//         if (refreshedToken) {
//           return refreshedToken;
//         }
//       } catch (error) {
//         console.error("Error refreshing access token:", error);
//       }

//       // Refresh failed, invalidate session
//       console.log("JWT callback - refresh failed, invalidating session");
//       return {
//         ...customToken,
//         error: "RefreshAccessTokenError",
//       } as CustomToken;
//     },
