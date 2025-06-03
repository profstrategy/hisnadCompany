// hooks/useOnboardingValidation.ts
import { ACCOUNT_TYPE } from "@/constants/generic";
import { useState } from "react";

interface RegisterEmailApiResponse {
  success: boolean;
  message: string;
  email?: string;
  registeredEmail?: string;
  userId?: string;
  status?: string;
  isReturningUser?: boolean;
  shouldRedirectToProperties?: boolean;
}

interface CompleteOnboardingApiResponse {
  success?: boolean;
  message?: string;
  user?: {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    status: string;
    accountType: ACCOUNT_TYPE;
  };
}

interface UserDataType {
  password?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  phoneNumber?: string;
  nextOfKinName?: string;
  nextOfKinPhoneNumber?: string;
  nextOfKinAddress?: string;
  accountType: "USER" | "ADMIN";
  status: "onboarded" | "pending";
}

export const useOnboardingValidation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"success" | "error" | "idle">("idle");

  const registerEmail = async (
    email: string
  ): Promise<RegisterEmailApiResponse> => {
    setIsLoading(true);
    setStatus("idle");
    setMessage("");

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
      return {
        success: false,
        message: data.message || "Failed to validate email",
        shouldRedirectToProperties: data.shouldRedirectToProperties || false,
      };
    }


      // Handle successful responses
    if (response.ok) {
      setStatus("success");
      
      if (data.isReturningUser) {
        setMessage("Welcome back! Continue your onboarding process.");
      } else {
        setMessage("Email registered successfully! Proceeding to next step...");
      }
      
      return {
        success: true,
        message: data.message,
        email: data.email,
        registeredEmail: data.registeredEmail,
        userId: data.userId,
        isReturningUser: data.isReturningUser,
      };
    }
      // Handle unexpected responses
      setStatus("error");
      return {
        success: false,
        message: "Unexpected response. Please try again.",
      };
    } catch (error) {
      console.error("Error registerring email:", error);
      setStatus("error");
      setMessage("Email registration failed. Please try again.");
      return {
        success: false,
        message: "Network error. Please check your connection and try again.",
      };
    } finally {
      setIsLoading(false);
    }
  };

  const completeOnboarding = async (
  userData: UserDataType,
  userId: string 
): Promise<CompleteOnboardingApiResponse> => {
  const {
    password,
    firstName,
    lastName,
    address,
    phoneNumber,
    nextOfKinName,
    nextOfKinPhoneNumber,
    nextOfKinAddress,
    accountType,
    status,
  } = userData;
  
  setIsLoading(true);
  
  try {
    const response = await fetch("/api/create-user/complete-onboarding", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId, 
        userData: {
          firstName: firstName,
          lastName: lastName,
          address: address,
          phoneNumber: phoneNumber,
          nextOfKinName: nextOfKinName,
          nextOfKinPhoneNumber: nextOfKinPhoneNumber,
          nextOfKinAddress: nextOfKinAddress,
          password: password,
          accountType: accountType || "USER",
          status: status || "onboarded",
        }
      }),
    });

  
    if (!response.ok) {
     
      let errorData;
      try {
        errorData = await response.json();
      } catch (jsonError) {
        console.error("Failed to parse error response as JSON:", jsonError);
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      setStatus("error");
      setMessage(errorData.message || "Failed to complete onboarding");
      return {
        success: false,
        message: errorData.message || "Failed to complete onboarding",
      };
    }

    setStatus("success");
    setMessage("Onboarding completed successfully!");
    return { success: true, message: "Onboarding completed successfully!" };
    
  } catch (error) {
    console.error("Error completing onboarding:", error);
    setStatus("error");
    
   
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    setMessage(`Network Error: ${errorMessage}`);
    
    return {
      success: false,
      message: "Failed to complete onboarding. Please try again.",
    };
  } finally {
    setIsLoading(false);
  }
};

const deleteIncompleteRegistration = async (email: string): Promise<boolean> => {
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

  const clearMessage = () => {
    setMessage("");
    setStatus("idle");
  };

  return {
    registerEmail,
    completeOnboarding,
    clearMessage,
    deleteIncompleteRegistration,
    isLoading,
    message,
    status,
  };
};
