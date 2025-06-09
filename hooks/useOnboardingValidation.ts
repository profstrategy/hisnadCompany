import { CLIENT_ROUTES } from "@/_lib/routes";
import { CompleteOnboardingApiResponse, RegisterEmailApiResponse, UserDataType } from "@/constants/types";
import { useGlobalStore } from "@/providers/store-provider";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useOnboardingValidation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"success" | "error" | "idle">("idle");
  const router = useRouter()
  
  // Global store actions
  const setRegisteredEmailData = useGlobalStore((store) => store.setRegisteredEmailData);
  const setCompletedOnboardingData = useGlobalStore((store) => store.setCompletedOnboardingData);
  const setRegisteringEmail = useGlobalStore((store) => store.setRegisteringEmail);
  const setCompletingOnboarding = useGlobalStore((store) => store.setCompletingOnboarding);
  const setRegisterEmailError = useGlobalStore((store) => store.setRegisterEmailError);
  const setCompleteOnboardingError = useGlobalStore((store) => store.setCompleteOnboardingError);

  const registerEmail = async (
    email: string
  ): Promise<RegisterEmailApiResponse> => {
    setIsLoading(true);
    setRegisteringEmail(true);
    setStatus("idle");
    setMessage("");
    setRegisterEmailError(null);

    try {
      const response = await fetch("/api/create-user/register-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data: RegisterEmailApiResponse = await response.json();
      
      if (!response.ok) {
        setStatus("error");
        setMessage(data.message || "Failed to validate email");
        setRegisterEmailError(data.message || "Failed to validate email");
        return {
          success: false,
          message: data.message || "Failed to validate email",
          shouldRedirectToProperties: data.shouldRedirectToProperties || false,
         
        };
      }

      // Store the resolved data in global state
      setRegisteredEmailData(data);
      setStatus("success");
      
      if (data.success) {

        if(data.isReturningPendingUser) {
          setMessage(data.message || "Welcome back! Your email is already registered. Proceeding to next step...");
        }else {
        setMessage("Email registered successfully! Proceeding to next step...");
      }
        
      } else {
        setMessage(data.message || 'An Error occurred');
      }
      
       if (data.shouldRedirectToProperties) {
        setMessage(data.message);

        setTimeout(() => {
       router.push(CLIENT_ROUTES.PublicPages.properties.index)
        }, 3000)
 
      }
      return data;
      
    } catch (error) {
      console.error("Error registering email:", error);
      setStatus("error");
      const errorMessage = "Network error. Please check your connection and try again.";
      setMessage(errorMessage);
      setRegisterEmailError(errorMessage);
      
      return {
        success: false,
        message: errorMessage,
      };
    } finally {
      setIsLoading(false);
      setRegisteringEmail(false);
    }
  };

  const completeOnboarding = async (
    userData: UserDataType,
    userId: string 
  ): Promise<CompleteOnboardingApiResponse> => {
    setIsLoading(true);
    setCompletingOnboarding(true);
    setCompleteOnboardingError(null);
    
    try {
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
          }
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        setStatus("error");
        setMessage(data.message || "Failed to complete onboarding");
        setCompleteOnboardingError(data.message || "Failed to complete onboarding");
        return {
          success: false,
          message: data.message || "Failed to complete onboarding",
        };
      }

      // Store the resolved data in global state
      setCompletedOnboardingData(data);
      setStatus("success");
      setMessage("Onboarding completed successfully!");
      
      return data;
      
    } catch (error) {
      console.error("Error completing onboarding:", error);
      setStatus("error");
      
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      setMessage(`Network Error: ${errorMessage}`);
      setCompleteOnboardingError(errorMessage);
      
      return {
        success: false,
        message: "Failed to complete onboarding. Please try again.",
      };
    } finally {
      setIsLoading(false);
      setCompletingOnboarding(false);
    }
  };

  const deleteIncompleteRegistration = async (email: string): Promise<boolean> => {
    setIsLoading(true)
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
    }finally{ setIsLoading(false) }
  };

   const getOnboardingStatus = async (email: string) => {
        try {
            const response = await fetch(`/api/create-user/onboarding-status/?email=${encodeURIComponent(email)}`)
            
            if (!response.ok) {
                throw new Error('Failed to fetch onboarding status')
            }

            const data = await response.json()
            return {
                email: data.email,
                userId: data.userId,
                status: data.status
            }
        } catch (error) {
            console.error('Error fetching onboarding status:', error)
            return null
        }
    }


  const clearMessage = () => {
    setMessage("");
    setStatus("idle");
  };

  return {
    registerEmail,
    completeOnboarding,
    clearMessage,
    deleteIncompleteRegistration,
    getOnboardingStatus,
    isLoading,
    message,
    status,
  };
};