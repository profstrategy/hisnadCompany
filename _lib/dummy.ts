// Create a temporary minimal auth config for testing
import Credentials from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Authorize function called with:", credentials);
        
        // Simple test - just return a dummy user
        if (credentials?.email === "test@test.com" && credentials?.password === "test123") {
          return {
            id: "1",
            email: "test@test.com",
            firstName: "Test",
            lastName: "User",
            accountType: "user",
          };
        }
        
        return null;
      },
    }),
  ],

  pages: {
    signIn: "/auth/login",
  },

  session: {
    strategy: "jwt" as const,
    maxAge: 24 * 60 * 60,
  },

  callbacks: {
    jwt: async (params: any) => {
      console.log("JWT callback called");
      const { token, user } = params;
      
      if (user) {
        return {
          ...token,
          user_id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          accountType: user.accountType,
        };
      }
      
      return token;
    },

    session: async (params: any) => {
      console.log("Session callback called");
      const { session, token } = params;
      
      return {
        ...session,
        user: {
          ...session.user,
          id: token.user_id,
          firstName: token.firstName,
          lastName: token.lastName,
          accountType: token.accountType,
        },
      };
    },
  },

  debug: true,
  secret: process.env.AUTH_SECRET,
};