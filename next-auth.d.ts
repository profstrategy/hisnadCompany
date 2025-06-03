import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user_id: string;
    accessToken: string;
    sessionId: string;
    refreshToken: string;
    status?: string;
    user: {
      id: string;
      accountType?: string;
      status?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    email:string;
    accountType?: string;
    status?: string;
    firstName?: string;
    lastName?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    user_id: string;
    accessToken: string;
    refreshToken: string;
    sessionId: string;
    firstName?: string;
    lastName?: string;
    accountType?: string;
    status?: string;
    tokenExpires: number;
    error?: string;
  }
}