import { VerifyEmailConfirmResponseType } from "@/constants/types";
import jwt from "jsonwebtoken";
const ONBOARDING_TOKEN_SECRET = process.env.ONBOARDING_TOKEN_SECRET!;
const EXPIRY_TIME = "1h";
export const generateOnboardingToken = (userId: string) => {
  return jwt.sign(
    {
      userId,
      type: "pending",
      iat: Math.floor(Date.now() / 1000),
    },
  ONBOARDING_TOKEN_SECRET ,
    { expiresIn: EXPIRY_TIME }
  );
};

export const verifyOnboardingToken = async (token: string):Promise<VerifyEmailConfirmResponseType | null> => {
  try {
    const baseUrl = process.env.NEXTAUTH_URL
    const response = await fetch(`${baseUrl}/api/token/verify-onboarding-token/`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ token })
    })

    const data = await response.json();
    
    if (!response.ok) {
      console.error('Server token verification failed:', data.error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error verifying token on server:', error);
    return null;
  }
}