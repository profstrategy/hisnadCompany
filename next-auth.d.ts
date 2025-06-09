// types/next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth"
import { DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      firstName?: string
      lastName?: string
      accountType?: string
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    firstName?: string
    lastName?: string
    accountType?: string
    accessToken?: string
    refreshToken?: string
    sessionId?: string,
    status?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    user_id?: string
    firstName?: string
    lastName?: string
    accountType?: string
    accessToken?: string
    refreshToken?: string
    sessionId?: string
    status?: string
    error?: string
  }
}