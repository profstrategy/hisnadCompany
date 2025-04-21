import * as z from "zod";
type PasswordResetType = "stepOne" | "stepTwo" | "stepThree";

export const resetPasswordStepOneSchema = z
  .object({
    email: z
      .string({ required_error: "Email is required." })
      .trim()
      .email({ message: "Please enter your active email address." }),
  })
  .partial();

export const resetPasswordStepTwoSchema = z
  .object({
    otp: z
      .string({ required_error: "Email is required." }).trim()
      .min(6, "Must be exactly 6 digits")
      .max(6, "Must be exactly 6 digits")
      .regex(/^[0-9]+$/, "Must be only digits"),
  })
  .partial();

export const resetPasswordStepThreeSchema = z
  .object({
    password: z
       .string({ required_error: 'Password is required.' })
       .max(8, { message: 'Password must not exceed 8 characters.' })
       .regex(/[a-z]/, { message: 'Password must include at least one lowercase letter.' })
       .regex(/[A-Z]/, { message: 'Password must include at least one uppercase letter.' })
       .regex(/\d/, { message: 'Password must include at least one number.' })
       .regex(/[^a-zA-Z0-9]/, { message: 'Password must include at least one special character.' }).trim(),

    confirmPassword: z
       .string({ required_error: 'Password is required.' })
       .max(8, { message: 'Password must not exceed 8 characters.' })
       .regex(/[a-z]/, { message: 'Password must include at least one lowercase letter.' })
       .regex(/[A-Z]/, { message: 'Password must include at least one uppercase letter.' })
       .regex(/\d/, { message: 'Password must include at least one number.' })
       .regex(/[^a-zA-Z0-9]/, { message: 'Password must include at least one special character.' }).trim(),
  })
  .partial()
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password does not match",
  });

export const passwordResetZodValidator = (formType: PasswordResetType) => {
  switch (formType) {
    case "stepOne":
      return resetPasswordStepOneSchema;
    case "stepTwo":
      return resetPasswordStepTwoSchema;
    case "stepThree":
      return resetPasswordStepThreeSchema;
    default:
      return;
  }
};
