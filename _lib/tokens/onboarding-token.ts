import jwt from "jsonwebtoken";
const ONBOOARDING_TOKEN_SECRET = process.env.ONBOOARDING_TOKEN_SECRET!;
const EXPIRY_TIME = "1h";
export const generateOnboardingToken = (userId: string) => {
  return jwt.sign(
    {
      userId,
      type: "pending",
      iat: Math.floor(Date.now() / 1000),
    },
  ONBOOARDING_TOKEN_SECRET ,
    { expiresIn: EXPIRY_TIME }
  );
};

interface OnboardingTokenPayload {
  userId: string;
  type: string;
}

export const verifyOnboardingToken = (token: string): { userId: string } | null => {
  if (!token || token.trim() === '') {
    console.error("Error verifying onboarding token: No token provided");
    return null;
  }

  try {
    const decoded = jwt.verify(token, ONBOOARDING_TOKEN_SECRET) as OnboardingTokenPayload;
    if (decoded.type !== "pending") {
      return null;
    }
    console.log('decoded:', decoded)
    return { userId: decoded.userId };
  } catch (error) {
    console.error("Error verifying onboarding token:", error);
    return null;
  }
};
