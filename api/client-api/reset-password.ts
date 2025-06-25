'use client'
import { AppErrorToast, AppLoadingToast, AppSuccessToast } from "@/components/reusables/app-toast";
import { ResetPasswordResponse } from "@/constants/types";
import { toast } from "sonner";
import { z } from "zod";

class ResetPasswordError extends Error {
    constructor(
        message:string,
        public status: number
    ){
        super(message)
        this.name = 'ResetPasswordError'
    }
}

let loadingToastId: string | number | undefined;

export const resetPasswordClient = async (id:string, newPassword:string):Promise<ResetPasswordResponse | null> => {
try{
      const loadingToastId = AppLoadingToast('Validating your credentials')
const response = await fetch('/api/auth/reset-password', {
    method: 'POST',
    headers: {
        'Content-Type' : 'application/json'
    },
    body: JSON.stringify({ newPassword, id })
})

let data:ResetPasswordResponse

if(loadingToastId){
    toast.dismiss(loadingToastId)
}

try{
    data = await response.json()
}catch(passError){
    throw new ResetPasswordError(
         `Server error (${response.status}): Unable to parse response`,
        response.status
    )
}

if(!response.ok){
    throw new ResetPasswordError(
         data.message || `HTTP error: ${response.status}`,
        response.status
    )
}

AppSuccessToast({ message: data.message, description: data.description, duration: 6000 })
return data

}catch (error) {
    // Dismiss loading toast if still showing
    if (loadingToastId) {
      toast.dismiss(loadingToastId);
    }

    if (error instanceof z.ZodError) {
      // password validation error
      AppErrorToast({
        message: "Passwords don't match",
      });
      return null;
    } else if (error instanceof ResetPasswordError) {
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
}