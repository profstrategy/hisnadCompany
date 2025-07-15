import { VerifyEmailConfirmResponseType } from "@/constants/types";
import jwt from "jsonwebtoken";

export const generatePropertySelectionToken = (userId: string) => {
  return jwt.sign(
    { userId, purpose: 'property_selection' },
    process.env.JWT_SECRET_EMAIL!,
    { expiresIn: '24h' }
  );
};

export const generateNewPropertySelectionToken = (userId: string) => {
  return jwt.sign(
    { userId, purpose: 'property_selection' },
    process.env.JWT_SECRET_EMAIL!,
    { expiresIn: '24h' }
  );
};

export const verifyPropertySelectionToken = async (userId: string):Promise<VerifyEmailConfirmResponseType | null> => {
  try {
    // const baseUrl = process.env.NEXTAUTH_URL
    const response = await fetch(`/api/token/verify-email-token/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId })
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