import { z, ZodTypeAny } from "zod";

type FormType = "login" | "initialStep" | "finalStep";

export const initialStepSchema = z.object({
  email: z
    .string({ required_error: "Email is required." })
    .trim()
    .email({ message: "Please enter your active email address." }),
});

export const finalStepSchema = z
  .object({
    firstName: z
      .string({ required_error: "First name is required." })
      .trim()
      .min(2, { message: "First must be at least two character long." }),

    lastName: z
      .string({ required_error: "Last name is required." })
      .trim()
      .min(2, { message: "Last Name must be at least two character long." }),

    password: z
      .string({ required_error: "Password is required." })
      .min(6, { message: "Password must be at least six characters long." })
      .regex(/[a-z]/, {
        message: "Password must include at least one lowercase letter.",
      })
      .regex(/[A-Z]/, {
        message: "Password must include at least one uppercase letter.",
      })
      .regex(/\d/, { message: "Password must include at least one number." })
      .regex(/[^a-zA-Z0-9]/, {
        message:
          "Password must include at least one special character {@#$%&*+^!?><}.",
      }),

    phoneNumber: z
      .string()
      .min(1, "Phone number is required")
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number must not exceed 15 digits")
      .regex(/^\d+$/, "Phone number should contain only digits")
      .refine((val) => {
        return val.length >= 10 && val.length <= 15;
      }, "Please enter a valid phone number"),

    address: z
      .string({ required_error: " Your permanent home address is required." })
      .trim()
      .min(3, { message: "Address must be at least three character long." }),

    nextOfKinName: z
      .string({ required_error: "Next of kin name is required." })
      .trim()
      .min(2, {
        message: "Next of kin name must be at least two character long.",
      }),

    nextOfKinPhoneNumber: z
      .string()
      .min(1, "Phone number is required")
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number must not exceed 15 digits")
      .regex(/^\d+$/, "Phone number should contain only digits")
      .refine((val) => {
        return val.length >= 10 && val.length <= 15;
      }, "Please enter a valid phone number"),

    nextOfKinAddress: z
      .string({ required_error: "Next of kin address is required." })
      .trim()
      .min(2, {
        message: "Next of kin address must be at least two character long.",
      }),

    // agreement: z.boolean().refine(val => val === true, { message: 'You must agree to the terms' }),
  })
  .partial();

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required." })
    .trim()
    .email({ message: "Please enter a valid email address." }),

  password: z
    .string({ required_error: "Password is required." })
    .min(6, { message: "Password must be at least six characters long." })
    .regex(/[a-z]/, {
      message: "Password must include at least one lowercase letter.",
    })
    .regex(/[A-Z]/, {
      message: "Password must include at least one uppercase letter.",
    })
    .regex(/\d/, { message: "Password must include at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must include at least one special character.",
    }),
});

export const authZodValidator = (formType: FormType): ZodTypeAny => {
  switch (formType) {
    case "initialStep":
      return initialStepSchema;
    case "finalStep":
      return finalStepSchema;
    case "login":
      return loginSchema;
    default:
      throw new Error("Invalid form type");
  }
};

export type loginTypeSchema = z.infer<typeof loginSchema>;
export type initialStepTypeSchema = z.infer<typeof initialStepSchema>;
export type finalStepTypeSchema = z.infer<typeof finalStepSchema>;
