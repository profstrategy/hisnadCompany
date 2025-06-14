import { AppErrorToast, AppLoadingToast, AppSuccessToast } from "@/components/reusables/app-toast";
import { PaymentInitializationResponse } from "@/constants/types";
import { toast } from "sonner";
import { handleHttpError } from "../utils";



class PaymentInitializationError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'PaymentInitializationError';
  }
}

// Input validation
const validateInputs = (userId: string, propertyId: string): void => {
  if (!userId?.trim()) {
    throw new PaymentInitializationError("User ID is required");
  }
  if (!propertyId?.trim()) {
    throw new PaymentInitializationError("Property ID is required");
  }
};


export const PaymentInitialization = async (
  userId: string,
  propertyId: string,
  selectedSize:string
): Promise<PaymentInitializationResponse | null> => {
  // Show loading toast
  const loadingToastId = AppLoadingToast("Initializing payment...");
  
  try {
    // Input validation
    validateInputs(userId, propertyId);

    const response = await fetch("/api/initiate-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, propertyId, selectedSize }),
    });

    let data: PaymentInitializationResponse;
    
    try {
      data = await response.json();
    } catch (parseError) {
      // If JSON parsing fails, create a generic error response
      data = {
        success: false,
        message: `Server error (${response.status}): Unable to parse response`,
      } as PaymentInitializationResponse;
    }

    // Dismiss loading toast
    if (loadingToastId) {
      toast.dismiss(loadingToastId);
    }


    if (response.ok) {
      // Success case - return the data
      if (data.success) {
        if(data.isReturning){
           AppSuccessToast({message:data.message, description: data.description, duration: 6000})
        }
        AppSuccessToast({message:data.message, description: data.description})
        console.log(data)
        return data;
      } else {
        // API returned 200 but indicated failure in response body
        AppErrorToast({ 
          message: "Payment initialization failed",
          description: `${data.description || 'Please try again or contact support'}`
        });
        return null;
      }
    } else {
      // HTTP error status codes
      handleHttpError(response.status, data);
      return null;
    }

  } catch (error) {
    // Dismiss loading toast on error
    if (loadingToastId) {
      toast.dismiss(loadingToastId);
    }

    AppErrorToast({message:`Error initializing payment`});
    
    // Handle different types of errors
    if (error instanceof PaymentInitializationError) {
      AppErrorToast({ message: error.message });
    } else if (error instanceof TypeError && error.message.includes('fetch')) {
      // Network error
      AppErrorToast({message: 'Network error, try again!!!'})
    } else {
      // Generic error
      AppErrorToast({
        message: "An unexpected error occurred while initializing payment",
        description: "Please try again or contact support if the problem persists"
      });
    }
    
    return null;
  }
};