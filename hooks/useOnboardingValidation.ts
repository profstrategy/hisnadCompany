import { CLIENT_ROUTES } from "@/_lib/routes";
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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const useOnboardingValidation = () => {
  const router = useRouter();

  // Global store actions
  const setRegisteredEmailData = useGlobalStore(
    (store) => store.setRegisteredEmailData
  );
  const setCompletedOnboardingData = useGlobalStore(
    (store) => store.setCompletedOnboardingData
  );
  const setRegisteringEmail = useGlobalStore(
    (store) => store.setRegisteringEmail
  );
  const setCompletingOnboarding = useGlobalStore(
    (store) => store.setCompletingOnboarding
  );
  const setRegisterEmailError = useGlobalStore(
    (store) => store.setRegisterEmailError
  );
  const setCompleteOnboardingError = useGlobalStore(
    (store) => store.setCompleteOnboardingError
  );

  const registerEmail = async (
    email: string
  ): Promise<RegisterEmailApiResponse> => {
    setRegisterEmailError(null);

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

      if(loadingToastId){
        toast.dismiss(loadingToastId)
      }
      if (!response.ok) {
        AppErrorToast({ message: data.message, description: "Retry again!!" });
        setRegisterEmailError(data.message || "Failed to validate email");
        return {
          success: false,
          message: data.message || "Failed to validate email",
          shouldRedirectToProperties: data.shouldRedirectToProperties || false,
        };
      }

      // Store the resolved data in global state
      setRegisteredEmailData(data);

      if (data.success) {
        if (data.isReturningPendingUser) {
          AppSuccessToast({
            message:
              data.message ||
              "Welcome back! Your email is already registered. Proceeding to next step...",
            description: "Complete your onboarding now!!!",
          });
        } else {
          AppSuccessToast({
            message:
              data.message ||
              "Email registered successfully! Proceeding to next step...",
            description: "Check available properties out",
          });
        }
      } else {
        AppErrorToast({ message: data.message || "An Error occurred" });
      }

      if (data.shouldRedirectToProperties) {
        AppSuccessToast({ message: data.message, description: 'Explore available properties' });

        setTimeout(() => {
          router.push(CLIENT_ROUTES.PublicPages.properties.index);
        }, 3000);
      }
      return data;
    } catch (error) {
      const errorMessage =
        "Network error. Please check your connection and try again.";
      AppErrorToast({ message: errorMessage })
      setRegisterEmailError(errorMessage);

      return {
        success: false,
        message: errorMessage,
      };
    } finally {
      setRegisteringEmail(false);
    }
  };

  const completeOnboarding = async (
    userData: UserDataType,
    userId: string
  ): Promise<CompleteOnboardingApiResponse> => {
    setCompletingOnboarding(true);
    setCompleteOnboardingError(null);

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
            accountType: userData.accountType || "USER",
            status: userData.status || "onboarded",
          },
        }),
      });

      const data = await response.json();

      if(loadingToastId){
        toast.dismiss(loadingToastId)
      }

      if (!response.ok) {
        AppErrorToast({ message: data.message })
        setCompleteOnboardingError(
          data.message || "Failed to complete onboarding"
        );
        return {
          success: false,
          message: data.message || "Failed to complete onboarding",
        };
      }

      // Store the resolved data in global state
      setCompletedOnboardingData(data);
AppSuccessToast({ message: data.message || 'Onboarding completed successfully!', description: 'Proceed to properties page' })
      return data;
    } catch (error) {
      console.error("Error completing onboarding:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      setCompleteOnboardingError(errorMessage);
      AppErrorToast({ message: errorMessage })

      return {
        success: false,
        message: "Failed to complete onboarding. Please try again.",
      };
    } finally {
      setCompletingOnboarding(false);
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
      console.error("Error deleting pending user:", error);
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
      console.error("Error fetching onboarding status:", error);
      return null;
    }
  };

  return {
    registerEmail,
    completeOnboarding,
    deleteIncompleteRegistration,
    getOnboardingStatus,
  };
};
