import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email Address", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || 
            !credentials?.password || 
            typeof credentials.email !== 'string' || 
            typeof credentials.password !== 'string') {
          throw new Error("Missing or invalid email/password in credentials")
        }

        try {
          const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/authenticate`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!response.ok) {
            return null;
          }

          const authResult = await response.json();

          if (authResult.success && authResult.user) {
            
            return {
              id: authResult.user.userId,
              email: authResult.user.email,
              name: `${authResult.user.firstName} ${authResult.user.lastName}`,
              firstName: authResult.user.firstName,
              lastName: authResult.user.lastName,
              accountType: authResult.user.accountType,
              property_type: authResult.user.property_type,
              property_size: authResult.user.property_size,
              accessToken: authResult.accessToken,
              refreshToken: authResult.refreshToken,
              sessionId: authResult.sessionId,
              status: authResult.user.status
            };
          } else {
            return null;
          }
        } catch (error) {
          return null;
        }
      }
    })
  ],

  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, 
    updateAge: 60 * 60,
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.accountType = user.accountType;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.sessionId = user.sessionId;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.status = user.status 
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.accountType = token.accountType as string;
        session.user.accessToken = token.accessToken as string;
        session.user.refreshToken = token.refreshToken as string;
        session.user.sessionId = token.sessionId as string;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
      }
      return session;
    }
  },

  pages: {
    signIn: '/auth/login',
  },

  debug: process.env.NODE_ENV === "development",
  
  secret: process.env.NEXTAUTH_SECRET,
})