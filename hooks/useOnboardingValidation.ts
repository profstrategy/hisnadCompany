import {
  AppErrorToast,
  AppLoadingToast,
  AppSuccessToast,
} from "@/components/reusables/app-toast";
import {
  CompleteOnboardingApiResponse,
  RegisterEmailApiResponse,
  UserDataType,
} from "@/constants/types";
import { useGlobalStore } from "@/providers/store-provider";
import { useState } from "react";
import { toast } from "sonner";

export const useOnboardingValidation = () => {
  const completedOnboardingData = useGlobalStore(data => data.setCompletedOnboardingData)
  const [sendEmailModal, setSendEmailModal] = useState(false)

  const registerEmail = async (
    email: string
  ): Promise<RegisterEmailApiResponse> => {

    try {
      const loadingToastId = AppLoadingToast('Validating Email')
      const response = await fetch("/api/create-user/register-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data: RegisterEmailApiResponse = await response.json();

      if (loadingToastId) {
        toast.dismiss(loadingToastId)
      }
      if (!response.ok) {
        AppErrorToast({ message: data.message ?? '', description: "Retry again!!" });
        return {
          success: false,
          message: data.message || "Failed to validate email",
        };
      }

      if (data.success) {
        if (data.isReturningPendingUser) {
          AppSuccessToast({
            message:
              data.message ||
              "Welcome back! Your email is already registered. Proceeding to next step...",
            description: "Complete your onboarding now!!!",
          });
        } else if (data.resendEmailModal) {
          AppSuccessToast({
            message:
              data.message ?? '',
          });

          setSendEmailModal(true)
        }
        else {
          AppSuccessToast({
            message:
              data.message ||
              "Email registered successfully! Proceeding to next step...",
            description: "You can proceed!!!",
          });
        }

      } else {
        AppErrorToast({ message: data.message || "An Error occurred" });
      }
      return data;
    } catch (error) {
      const errorMessage =
        "Network error. Please check your connection and try again.";
      AppErrorToast({ message: errorMessage })

      return {
        success: false,
        message: errorMessage,
      };
    }
  };

  const completeOnboarding = async (
    userId: string,
    userData: UserDataType,
  ): Promise<CompleteOnboardingApiResponse> => {

    try {
      const loadingToastId = AppLoadingToast('Processing, please wait...')
      const response = await fetch("/api/create-user/complete-onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          userData: {
            ...userData,
            accountType: userData?.accountType || "USER",
            status: userData?.status || "onboarded",
          },

        }),
      });

      const data = await response.json();
      if (loadingToastId) {
        toast.dismiss(loadingToastId)
      }

      if (!response.ok) {
        AppErrorToast({ message: data.message })
        return {
          success: false,
          message: data.message || "Failed to complete onboarding",
        };
      }
      completedOnboardingData(data)
      return data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      AppErrorToast({ message: errorMessage })

      return {
        success: false,
        message: "Failed to complete onboarding. Please try again.",
      };
    }
  };

  const resendOnboardingEmail = async (
    userId: string,
  ): Promise<CompleteOnboardingApiResponse> => {
    try {
      const loadingToastId = AppLoadingToast('Please wait...')
      const response = await fetch(`/api/create-user/complete-onboarding`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          resendEmail: true
          // No userData needed when resending email for already onboarded users
        }),
      });

      const data = await response.json();
      if (loadingToastId) {
        toast.dismiss(loadingToastId)
      }

      if (!response.ok) {
        AppErrorToast({ message: data.message })
        return {
          success: false,
          message: data.message || "Failed to resend email",
        };
      }
      return data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      AppErrorToast({ message: errorMessage })

      return {
        success: false,
        message: "Failed to resend email. Please try again.",
      };
    }
  };

  const deleteIncompleteRegistration = async (
    email: string
  ): Promise<boolean> => {
    try {
      const response = await fetch("/api/create-user/delete-pending-user", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      return response.ok;
    } catch (error) {
      return false;
    }
  };

  const getOnboardingStatus = async (email: string) => {
    try {
      const response = await fetch(
        `/api/create-user/onboarding-status/?email=${encodeURIComponent(email)}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch onboarding status");
      }

      const data = await response.json();
      return {
        email: data.email,
        userId: data.userId,
        status: data.status,
      };
    } catch (error) {
      return null;
    }
  };

  return {
    sendEmailModal,
    setSendEmailModal,
    resendOnboardingEmail,
    registerEmail,
    completeOnboarding,
    deleteIncompleteRegistration,
    getOnboardingStatus,
  };
};
