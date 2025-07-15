"use client";
import {
  AppErrorToast,
  AppLoadingToast,
  AppSuccessToast,
} from "@/components/reusables/app-toast";
import { ForgotPasswordResponse } from "@/constants/types";
import { toast } from "sonner";
import { z } from "zod";

class PasswordResetStepOneError extends Error {
  constructor(
    message: string,
    public status: number
  ) {
    super(message);
    this.name = "PasswordResetStepOneError";
  }
}

export const forgotPassword = async (
  email: string
): Promise<ForgotPasswordResponse | null> => {
  const schema = z.string().email();
  let loadingToastId: string | number | undefined;

  try {
    const validatedEmail = schema.parse(email);
    
    // Show loading toast
    loadingToastId = AppLoadingToast("Processing");

    const response = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: validatedEmail }),
    });

    // Dismiss loading toast
    if (loadingToastId) {
      toast.dismiss(loadingToastId);
    }

    let data: ForgotPasswordResponse;
    
    try {
      data = await response.json();
    } catch (parseError) {
      throw new PasswordResetStepOneError(
        `Server error (${response.status}): Unable to parse response`,
        response.status
      );
    }

    // Check HTTP status codes
    if (!response.ok) {
      throw new PasswordResetStepOneError(
        data.message || `HTTP error: ${response.status}`,
        response.status
      );
    }

    // Show success message
    AppSuccessToast({ message: data.message, duration: 6000 });
    
    return data;

  } catch (error) {
    // Dismiss loading toast if still showing
    if (loadingToastId) {
      toast.dismiss(loadingToastId);
    }

    if (error instanceof z.ZodError) {
      // Email validation error
      AppErrorToast({
        message: "Please enter a valid email address",
      });
      return null;
    } else if (error instanceof PasswordResetStepOneError) {
      // Custom API error
      AppErrorToast({ message: error.message });
      return null;
    } else if (error instanceof TypeError && error.message.includes("fetch")) {
      // Network error
      AppErrorToast({ message: "Network error, please try again!" });
      return null;
    } else {
      // Generic error
      console.error("Password reset error:", error);
      AppErrorToast({
        message: "An unexpected error occurred",
        description: "Please try again or contact support if the problem persists",
      });
      return null;
    }
  }
};