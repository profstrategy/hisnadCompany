// lib/auth-service.ts
import { prisma } from "@/_lib/prisma";
import bcrypt from "bcryptjs"; // or whatever password library you're using
import { generateTokens } from "./tokens/auth-token";

export async function authenticateUser(email: string, password: string) {
  try {
    // Find user in database
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { success: false, message: "Invalid credentials" };
    }

    // Verify password

    let isValidPassword = false
    if(user.password_hash){
      isValidPassword = await bcrypt.compare(password, user.password_hash)
    }
    if (!isValidPassword) {
      return { success: false, message: "Invalid credentials" };
    }


    const accessToken = generateTokens(user).accessToken;
    const refreshToken = generateTokens(user).refreshToken;
    const sessionId = generateSessionId();

    return {
      success: true,
      user: {
        userId: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        accountType: user.accountType,
        status: user.status
      },
      accessToken,
      refreshToken,
      sessionId,
    };
  } catch (error) {
    console.error("Authentication error:", error);
    return { success: false, message: `Authentication failed, ${error}` };
  }
}

const generateSessionId = () => {
    return crypto.randomUUID()
}