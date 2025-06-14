import { prisma } from "@/_lib/prisma";
import {
  GetActiveProperties,
  GetPropertyById,
  SegregatedProperties,
  Subscriptions,
} from "@/constants/types";

export const getUser = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email: email },
  });
  return user;
};

export const getUserById = async (id: string) => {
  const userId = await prisma.user.findUnique({
    where: { id: id },
  });
  return userId;
};

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
        selected_product_id: true,
      },
    });

    if (!userStatus) {
      return null;
    }

    return userStatus;
  } catch (error) {
    console.error("Error fetching user onboarding status:", error);
    throw new Error("Failed to fetch user status");
  }
};

export const getActiveProperties = async (): Promise<GetActiveProperties[]> => {
  const activeProperties = await prisma.segregatedProperties.findMany({
    select: {
      id: true,
      slug: true,
      mainImage: true,
      title: true,
      location: true,
      type: true,
    },
  });

  if (!activeProperties) {
    throw new Error("Unable to load packages, might be your network");
  }

  return activeProperties;
};

export const getAllProperties = async (): Promise<SegregatedProperties[]> => {
  const properties = await prisma.segregatedProperties.findMany({
    select: {
      id: true,
      tier: true,
      title: true,
      status: true,
      type: true,
      mainImage: true,
      location: true,
      featured_farmland_amount_acre: true,
      featured_farmland_amount_plot: true,
      hisnad_estate_amount_acre: true,
      hisnad_estate_amount_plot: true,
      slug: true,
    },
  });

  if (!properties) {
    throw new Error("Unable to load properties, might be your network");
  }

  return properties;
};

export const getSingularProperty = async (
  slug: string
): Promise<SegregatedProperties | null> => {
  try {
    const singularProperty = await prisma.segregatedProperties.findFirst({
      where: {
        slug: slug,
      },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        location: true,
        features: true,
        mainImage: true,
        benefit: true,
        type: true,
        tier: true,
        featured_farmland_amount_acre: true,
        featured_farmland_amount_plot: true,
        hisnad_estate_amount_acre: true,
        hisnad_estate_amount_plot: true,
        payment: true,
        status: true,
        category: true,
        documents: true,
        created_at: true,
        updated_at: true,
      },
    });

    return singularProperty;
  } catch (error) {
    console.error("Error fetching property:", error);
    throw new Error("Unable to load property, might be your network");
  }
};

export const getPropertyById = async (id: string): Promise<GetPropertyById> => {
  const property = await prisma.segregatedProperties.findUnique({
    where: { id: id },
    select: {
      id: true,
      property_id: true,
      slug: true,
      type: true,
      category: true,
      location: true,
      payment: true,
      title: true,
      status: true,
      hisnad_estate_amount_acre: true,
      hisnad_estate_amount_plot: true,
      featured_farmland_amount_plot: true,
      featured_farmland_amount_acre: true,
    },
  });

  try {
    if (!property) {
      throw new Error("Property not found");
    }
  } catch (error) {
    console.error("Error fetching property by ID:", error);
    throw new Error("Failed to fetch property by ID");
  }
  return property;
};

export const getSubscriptions = async (
  userId: string,
  productId: string
): Promise<Subscriptions[]> => {
  const subscribedUser = prisma.subscription.findMany({
    where: { user_id: userId, product_id: productId },
    select: {
      id: true,
      property_select: true,
      property_type: true,
      amount: true,
      size: true,
      fullName: true,
      email: true,
      status: true,
      payment_intent_id: true,
      payment_plan: true,
      user_id: true,
      product_id: true,
      initialized_payment_id: true,
    },
  });

  try {
    if (!subscribedUser) {
      throw new Error("Invalid payment");
    }
  } catch (error) {
    console.error("Error fetching subscriptions", error);
    throw new Error("Failed to fetch subscriptions");
  }

  return subscribedUser;
};

export const getSubscriptionByInitializedPaymentId = async (
  initialized_payment_id: string
): Promise<Subscriptions | null> => {
  try {
    const subscription = await prisma.subscription.findUnique({
      where: { initialized_payment_id: initialized_payment_id },
      select: {
        id: true,
        property_select: true,
        property_type: true,
        amount: true,
        size: true,
        fullName: true,
        email: true,
        status: true,
        payment_intent_id: true,
        payment_plan: true,
        user_id: true,
        product_id: true,
        initialized_payment_id: true,
      },
    });

    if (!subscription) {
      throw new Error("Subscription not found with initialized payment ID");
    }

    return subscription;
  } catch (error) {
    console.error("Error fetching subscription by initialized payment ID:", error);
    throw new Error("Failed to fetch subscription");
  }
};