import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/_lib/prisma";
import { refreshAccessToken } from "./tokens/auth-token";
import { CustomSession, CustomToken, CustomUser } from "@/constants/types";
import { getUser } from "./data-service";

export const authOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<CustomUser | null> {
        try {
          // Validate input
          if (!credentials?.email || !credentials?.password) {
            console.error("Missing email or password in credentials");
            return null;
          }

          // Fixed the API endpoint path
          const baseUrl =
            process.env.NEXTAUTH_URL ||
            process.env.VERCEL_URL ||
            "http://localhost:3000";
          const loginUrl = `${baseUrl}/api/auth/login`;

          console.log("Attempting login to:", loginUrl);

          const response = await fetch(loginUrl, {
            method: "POST",
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
            headers: {
              "Content-Type": "application/json",
              "User-Agent": "NextAuth-Internal",
            },
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("Login API error:", {
              status: response.status,
              error: errorData,
            });

            throw new Error(
              errorData?.error ||
                `Request failed with status ${response.status}`
            );
          }

          const data = await response.json();
          console.log("Login API response:", {
            success: data.success,
            userId: data.user?.userId,
          });

          // Validate response data
          if (!data?.success || !data?.accessToken || !data?.user?.userId) {
            console.error("Invalid response from login API:", data);
            return null;
          }
          if (data?.accessToken && data?.refreshToken) {
            return {
              id: data?.user?.userId,
              email: data?.user?.email,
              firstName: data?.user?.firstName,
              lastName: data?.user?.lastName,
              accountType: data?.user?.accountType,
              accessToken: data?.accessToken,
              refreshToken: data?.refreshToken,
              sessionId: data?.sessionId,
            };
          }

          return null;
        } catch (error: any) {
          console.error("Error in authorize function:", error);
          if (error.message?.includes("401")) {
            throw new Error("Invalid email or password");
          }
          throw new Error(error.message || "Authentication failed");
        }
      },
    }),
  ],

  pages: {
    signIn: "/auth/login",
    // error: "/auth/error",
  },

  session: {
    strategy: "jwt" as const,
    maxAge: 24 * 60 * 60, // 24 hours
    updateAge: 60 * 60, // Update session every hour
  },

  callbacks: {
    // async session({ session, user }):Promise<CustomUser | null> {
    //   const customSession = session as CustomSession
    //   const guest = await getUser(session.user.email);
    //   if (session.user.email) {
    //     return {
    //       ...session,
    //       user: {
    //         id: guest?.id,
    //         firstName: guest?.firstName,
    //         lastName: guest?.lastName,
    //         accountType: guest?.accountType,
    //       },
    //     };
    //   }
    // },

    async session(params): Promise<CustomSession> {
      const { session, token } = params;
      const customToken = token as CustomToken;

      
      if (customToken.error) {
        console.log("Session callback - token error:", customToken.error);
        
        throw new Error("Session expired");
      }

      const customSession: CustomSession = {
        ...session,
        user: {
          ...session.user,
          id: customToken.user_id,
          name:
            customToken.firstName && customToken.lastName
              ? `${customToken.firstName} ${customToken.lastName}`
              : session.user?.name,
          accountType: customToken.accountType,
        },
      };

      return customSession;
    },
  },

  debug: process.env.NODE_ENV === "development",

  secret: process.env.NEXTAUTH_SECRET,
};
