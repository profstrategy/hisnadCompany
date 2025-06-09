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

export const getUserOnboardingStatus = async (userId: string) => {
  try {
    const userStatus = await prisma.user.findFirst({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        status: true,
      }
    });

    if (!userStatus) {
      return null; 
    }

    return userStatus;
  } catch (error) {
    console.error('Error fetching user onboarding status:', error);
    throw new Error('Failed to fetch user status');
  }
};

