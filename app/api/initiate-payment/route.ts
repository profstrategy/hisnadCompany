import { prisma } from "@/_lib/prisma";
import {
  getPropertyById,
  getSubscriptions,
  getUserById,
} from "@/_lib/prisma-data-service";
import { PROPERTY_TYPES, sizeOptions } from "@/constants/generic";
import { GetPropertyById } from "@/constants/types";
import { SubscriptionStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface CreateSubscriptionRequest {
  userId: string;
  propertyId: string;
  selectedSize: string;
}

const validateRequest = (body: any): body is CreateSubscriptionRequest => {
  return (
    body &&
    typeof body.userId === "string" &&
    typeof body.propertyId === "string" &&
    typeof body.selectedSize === "string"
  );
};

const calculateAmount = (
  property: GetPropertyById,
  selectedSize: string | null
): number | null => {
  const propertyType = property.type?.toLowerCase();
  const sizeOption = selectedSize?.toLowerCase();

  if (propertyType === PROPERTY_TYPES.FEATURED.toLowerCase()) {
    if (sizeOption === sizeOptions.PLOT.toLowerCase()) {
      return property.featured_farmland_amount_plot;
    }
    if (sizeOption === sizeOptions.ACRE.toLowerCase()) {
      return property.featured_farmland_amount_acre;
    }
  }

  if (propertyType === PROPERTY_TYPES.HISNAD.toLowerCase()) {
    if (sizeOption === sizeOptions.PLOT.toLowerCase()) {
      return property.hisnad_estate_amount_plot;
    }
    if (sizeOption === sizeOptions.ACRE.toLowerCase()) {
      return property.hisnad_estate_amount_acre;
    }
  }

  return null;
};

export async function POST(req: NextRequest) {
  try {
    // Validate content type
    if (!req.headers.get("content-type")?.includes("application/json")) {
      return NextResponse.json(
        { success: false, error: "Content-Type must be application/json" },
        { status: 400 }
      );
    }

    const body = await req.json();
    console.log("Received request body:", body);

    // Validate request body
    if (!validateRequest(body)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request body. userId and propertyId are required.",
        },
        { status: 400 }
      );
    }

    const { userId, propertyId, selectedSize } = body;

    // Get user and validate onboarding status
    const onboardedUser = await getUserById(userId);

    if (!onboardedUser) {
      return NextResponse.json(
        {
          message: "User not found",
          success: false,
          redirectToRegister: true,
        },
        { status: 404 }
      );
    }

    const validStatuses = ["onboarded", "paid", "active"];
    if (!validStatuses.includes(onboardedUser.status)) {
      return NextResponse.json(
        {
          message: "Pending status, complete your onboarding process...",
          success: false,
          redirectToRegister: true,
        },
        { status: 403 }
      );
    }

    // Get property and validate it exists
    const selectedProperty = await getPropertyById(propertyId);

    if (!selectedProperty) {
      return NextResponse.json(
        {
          message: "Property not found",
          success: false,
        },
        { status: 404 }
      );
    }

    // Check existing subscriptions
    const existingSubscriptions = await getSubscriptions(
      onboardedUser.id,
      selectedProperty.id ?? ""
    );

    const existingSubscription = existingSubscriptions.find(
      (subscription) =>
        subscription.user_id === onboardedUser.id &&
        subscription.product_id === selectedProperty.id &&
        subscription.size?.toLowerCase() === selectedSize.toLowerCase()
    );

    // Handle existing subscription states
    if (existingSubscription) {
      if (existingSubscription.status === "incomplete") {
        return NextResponse.json(
          {
            message: `Your ${selectedSize} payment for this property wasn't successful. Do you want to try again?`,
            success: true,
            isCompletePaymentModal: true,
            subscriptionId: existingSubscription.id,
            property_id: selectedProperty.id,
            amount: calculateAmount(selectedProperty, selectedSize),
            property_type: selectedProperty.type,
            property_select: selectedProperty.slug || "",
            initialized_payment_id:
              existingSubscription.initialized_payment_id || "",
          },
          { status: 409 }
        );
      }

      if (
        existingSubscription.status === "initialized" ||
        existingSubscription.size === selectedSize
      ) {
        return NextResponse.json(
          {
            message: `Welcome back, complete your ${selectedSize} payment for this property`,
            description: `Dear ${existingSubscription.fullName} your payment is not yet completed`,
            success: true,
            subscriptionId: existingSubscription.id,
            property_id: selectedProperty.id,
            amount: calculateAmount(selectedProperty, selectedSize),
            property_type: selectedProperty.type,
            redirectToPaymentPage: true,
            isReturning: true,
            property_select: selectedProperty.slug || "",
            initialized_payment_id:
              existingSubscription.initialized_payment_id || "",
          },
          { status: 200 }
        );
      }

      // If subscription is completed
      if (["completed"].includes(existingSubscription.status || "")) {
        return NextResponse.json(
          {
            message: `You already have an inactive ${selectedSize} subscription for this property`,
            description: `Please activate your subscription by a one time login to your dashboard inorder to purchase new property of the same ${selectedSize}`,
            success: false,
            property_id: selectedProperty.id,
            isActivateAccount:true,
            isReturning: true,
            property_type: selectedProperty.type,
            initialized_payment_id: "",
          },
          { status: 409 }
        );
      }

      // if subscription is active
      if (["active"].includes(existingSubscription?.status || "")) {
        return NextResponse.json(
          {
            message: `You already have an active ${selectedSize} subscription for this property`,
            description: `Dear ${existingSubscription.fullName}, do you want to buy this property again?`,
            success: false,
            property_id: selectedProperty.id,
            isForcePropertyPurchase: true,
            isReturning: true,
            property_type: selectedProperty.type,
            initialized_payment_id: "",
          },
          { status: 409 }
        );
      }
    }

    const activeSubscriptionsForProperty = existingSubscriptions.filter(
      (sub) =>
        sub.user_id === onboardedUser.id &&
        sub.product_id === selectedProperty.id &&
        ["completed"].includes(sub.status || "")
    );

    const subscriptionCount = activeSubscriptionsForProperty.length;
    // check for the maximum number of subscription per user
    if (subscriptionCount > 5) {
      return NextResponse.json(
        {
          message: `You have reached the limit of purchase for this property (${subscriptionCount} times purchase)`,
          description: "Please contact our support for the next action",
          isExeedLimit: true,
          // limit_user_id
          initialized_payment_id: "",
        },
        { status: 409 }
      );
    }

    const amount = calculateAmount(selectedProperty, selectedSize);

    if (amount === null || amount <= 0) {
      return NextResponse.json(
        {
          message: "Invalid property configuration or amount",
          success: false,
          redirectToPaymentPage: false,
          isCompletePaymentModal: false,
          redirectToRegister: false,
          property_type: selectedProperty.type,
          property_id: selectedProperty.id,
          initialized_payment_id: "",
        },
        { status: 400 }
      );
    }

    const generatedInitializedPaymentId = crypto.randomUUID();

    const result = await prisma.$transaction(async (tx) => {
      // Update user's selected property
      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: {
          selected_product_id: selectedProperty.id,
        },
      });

      // Create subscription
      const newSubscription = await tx.subscription.create({
        data: {
          user_id: updatedUser.id,
          property_select: selectedProperty.slug || "",
          property_type: selectedProperty.type,
          status: SubscriptionStatus.initialized,
          fullName: `${updatedUser.firstName || ""} ${
            updatedUser.lastName || ""
          }`.trim(),
          email: updatedUser.email,
          amount: amount,
          product_id: selectedProperty.id,
          size: selectedSize,
          initialized_payment_id: generatedInitializedPaymentId,
        },
      });

      return { updatedUser, newSubscription };
    });

    // Success response
    return NextResponse.json(
      {
        message: `${selectedSize} payment initialized successfully`,
        description: "You can proceed to checkout your payment",
        success: true,
        amount: amount,
        property_type: selectedProperty.type,
        property_select: selectedProperty.slug || "",
        redirectToPaymentPage: true,
        property_id: selectedProperty.id,
        subscriptionId: result.newSubscription.id,
        initialized_payment_id: generatedInitializedPaymentId,
      },
      { status: 201 }
    );
  } catch (error) {
    const isDevelopment = process.env.NODE_ENV === "development";

    return NextResponse.json(
      {
        message: "Failed to initialize payment",
        success: false,
        redirectToPaymentPage: false,
        isCompletePaymentModal: false,
        redirectToRegister: false,
        property_type: "",
        property_id: "",
        initialized_payment_id: "",
        ...(isDevelopment && {
          error: error instanceof Error ? error.message : "Unknown error",
        }),
      },
      { status: 500 }
    );
  }
}
