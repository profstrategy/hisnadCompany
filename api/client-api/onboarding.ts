'use client'
import { AppErrorToast, AppLoadingToast, AppSuccessToast } from "@/components/reusables/app-toast";
import { toast } from "sonner";
import z from "zod";

class EmailConfirmationError extends Error {
    constructor(
        message:string,
        public status: number
    ){
        super(message)
        this.name = 'ResetPasswordError'
    }
}

type EmailConfirmationResponse = {
    message: string,
    success: boolean
}

export const sendOnboardingLinkToGmail = async (email:string):Promise<EmailConfirmationResponse | null> => {
      let loadingToastId: string | number | undefined;
    try{
         // Show loading toast
        loadingToastId = AppLoadingToast("Processing");
    // Email validation schema
const emailSchema = z.object({
  email: z.string().email("Invalid email format").min(1, "Email is required"),
});
const validatedEmail = emailSchema.parse(email)
    const response = await fetch('/auth/onboard-user', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ email: validatedEmail })
    })

     // Dismiss loading toast
    if (loadingToastId) {
      toast.dismiss(loadingToastId);
    }
    let data: EmailConfirmationResponse

    try{
    data = await response.json()
}catch(passError){
    throw new EmailConfirmationError(
         `Server error (${response.status}): Unable to parse response`,
        response.status
    )
}

if(!response.ok){
    throw new EmailConfirmationError(
         data.message || `HTTP error: ${response.status}`,
        response.status
    )
}
return data

}catch (error) {
    // Dismiss loading toast if still showing
    if (loadingToastId) {
      toast.dismiss(loadingToastId);
    }

    if (error instanceof z.ZodError) {
      // password validation error
      AppErrorToast({
        message: "Invalid Email format",
      });
      return null;
    } else if (error instanceof EmailConfirmationError) {
      // Custom API error
      AppErrorToast({ message: error.message });
      return null;
    } else if (error instanceof TypeError && error.message.includes("fetch")) {
      // Network error
      AppErrorToast({ message: "Network error, please try again!" });
      return null;
    } else {
      AppErrorToast({
        message: "An unexpected error occurred",
        description: "Please try again or contact support if the problem persists",
      });
      return null;
    }
  }
}