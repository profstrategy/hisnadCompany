import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import bcrypt from "bcryptjs";
import { ACCOUNT_TYPE, paymentStatus } from "@/constants/generic";
import { CLIENT_ROUTES } from "./routes";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { PaymentInitializationResponse } from "@/constants/types";
import { AppErrorToast } from "@/components/reusables/app-toast";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function latLongToVector3(lat: number, lon: number, radius = 2.5) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return [x, y, z] as [number, number, number];
}

export const splitPhoneNumber = (str: string) => {
  const formatNumber = str.split("").join("");
  return `${formatNumber.substring(0, 3)} ${formatNumber.substring(
    3,
    6
  )} ${formatNumber.substring(6, 10)} ${formatNumber.substring(10)}`;
};

export const addSearchParamsToUrl = (
  url: string,
  params: Record<string, string>
) => {
  const searchParams = new URLSearchParams(params);
  return `${url}?${searchParams.toString()}`;
};

export const removeSearchParamsFromUrl = (
  url: string,
  params: Record<string, string>
) => {
  const searchParams = new URLSearchParams(params);
  return url.split("?")[0];
};

export const hashedData = (data: string): string => {
  return bcrypt.hashSync(data, 12);
};

export const checkAuth = ({
  pageType,
}: {
  pageType: (typeof ACCOUNT_TYPE)[keyof typeof ACCOUNT_TYPE];
}) => {
  const session = useSession();

  if (!session) {
    redirect(CLIENT_ROUTES.PublicPages.auth.login);
  }

  if (
    pageType === "ADMIN" &&
    session.data?.user.accountType !== ACCOUNT_TYPE.ADMIN
  ) {
    redirect(CLIENT_ROUTES.PublicPages.auth.login);
  }
};

export const extractUserIdFromToken = (token: string): string | null => {
  try {
    if (!token || typeof token !== "string") {
      return null;
    }
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.userId || null;
  } catch (error) {
    console.error("Error extracting userId from token:", error);
    return null;
  }
};

export const removeNoneAlphanumericEntity = (str: string) => {
  return str.replace(/[^a-z0-9]/gi, " ");
};

export const handleHttpError = async (
  data?: PaymentInitializationResponse | null,
  status?: number
): Promise<void> => {
  console.log(data);
  switch (status) {
    case 400:
      AppErrorToast({
        message: data?.message || "Invalid request",
        description: `Please check your input and try again, ${data?.status} status`,
        duration: 8000,
      });
      break;

    case 401:
      AppErrorToast({
        message: "Authentication required",
        description: `Please log in and try again ${data?.status} status`,
        action: {
          label: "Login",
          onClick: () => (window.location.href = "/auth/login"),
        },
        duration: 8000,
      });

      break;

    case 403:
      AppErrorToast({
        message: data?.message || "Access denied",
        description: `You don't have permission to perform this action, ${data?.status} status`,
        duration: 8000,
      });
      break;

    case 404:
      AppErrorToast({
        message: data?.message || "Resource not found",
        description: `The requested property or user was not found, ${data?.status} status`,
      });
      break;

    case 409:
      AppErrorToast({
        message: data?.message || "Subscription already exists",
        description: `${data?.paymentStatus === paymentStatus.INCOMPLETE ? `Click continue to continue with payment, ${data?.status} status` : data?.paymentStatus === paymentStatus.COMPLETED ? data.description : data?.paymentStatus === paymentStatus.ACTIVE ? data.description : ""}`,
        action: {
          label: `${
            data?.paymentStatus === paymentStatus.INCOMPLETE ||
            paymentStatus.ACTIVE
              ? "Continue Payment"
              : data?.paymentStatus === paymentStatus.COMPLETED
                ? "Send me a link"
                : ""
          }`,
          onClick: () => {
            data?.paymentStatus === paymentStatus.INCOMPLETE ||
            paymentStatus.ACTIVE
              ? redirect(
                  CLIENT_ROUTES.PublicPages.make_payment(
                    data?.initialized_payment_id ?? "",
                    data?.size ?? "",
                    data?.plan ?? ""
                  )
                )
              : data?.paymentStatus === paymentStatus.COMPLETED
                ? ""
                : "";
          },
        },
      });
      break;

    case 500:
    case 502:
    case 503:
    case 504:
      AppErrorToast({
        message: "Server error",
        description:
          "Our servers are experiencing issues. Please try again later",
      });
      break;

    default:
      AppErrorToast({
        message: data?.message || "An error occurred",
        description: ` Please try again or contact support`,
      });
  }
};

/**
 * Format numbers into readable formats with K, M, B suffixes
 * @param value - The number to format
 * @param options - Formatting options
 * @returns Formatted string
 */
interface FormatNumberOptions {
  decimals?: number;
  currency?: string;
  locale?: string;
  showFullNumber?: boolean;
}

export const formatNumber = (
  value: number | string | null | undefined,
  options: FormatNumberOptions = {}
): string => {
  const {
    decimals = 1,
    currency,
    locale = "en-US",
    showFullNumber = false,
  } = options;

  // Handle null, undefined, or invalid values
  if (value === null || value === undefined || value === "") {
    return "0";
  }

  const numValue = typeof value === "string" ? parseFloat(value) : value;

  // Handle invalid numbers
  if (isNaN(numValue)) {
    return "0";
  }

  // If showFullNumber is true, return the full formatted number
  if (showFullNumber) {
    return currency
      ? new Intl.NumberFormat(locale, {
          style: "currency",
          currency: currency,
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(numValue)
      : new Intl.NumberFormat(locale).format(numValue);
  }

  const absValue = Math.abs(numValue);
  const sign = numValue < 0 ? "-" : "";

  let formattedValue: string;
  let suffix: string;

  if (absValue >= 1_000_000_000) {
    // Billions
    formattedValue = (absValue / 1_000_000_000).toFixed(decimals);
    suffix = "B";
  } else if (absValue >= 1_000_000) {
    // Millions
    formattedValue = (absValue / 1_000_000).toFixed(decimals);
    suffix = "M";
  } else if (absValue >= 1_000) {
    // Thousands
    formattedValue = (absValue / 1_000).toFixed(decimals);
    suffix = "K";
  } else {
    // Less than 1000
    formattedValue = absValue.toString();
    suffix = "";
  }

  // Remove trailing zeros after decimal point
  if (suffix && formattedValue.includes(".")) {
    formattedValue = parseFloat(formattedValue).toString();
  }

  const result = `${sign}${formattedValue}${suffix}`;

  // Add currency symbol if provided
  if (currency) {
    return `${currency}${result}`;
  }

  return result;
};

/**
 * Format currency specifically for Nigerian Naira
 * @param value - The number to format
 * @param options - Formatting options
 * @returns Formatted currency string
 */
export const formatNaira = (
  value: number | string | null | undefined,
  options: Omit<FormatNumberOptions, "currency"> = {}
): string => {
  return formatNumber(value, { ...options, currency: "₦" });
};

/**
 * Get the full formatted number without abbreviations
 * @param value - The number to format
 * @param currency - Currency symbol (optional)
 * @param locale - Locale for formatting
 * @returns Fully formatted number string
 */
export const formatFullNumber = (
  value: number | string | null | undefined,
  currency?: string,
  locale: string = "en-US"
): string => {
  return formatNumber(value, { showFullNumber: true, currency, locale });
};

export const extractInitials = (name: string) => {
  return name
    .split(" ")
    .map((itm) => itm.charAt(0) + itm.charAt(itm.length - 1).toUpperCase())
    .join("");
};

export const hashUserId = async (userId: string): Promise<string> => {
  try {
    // Convert string to ArrayBuffer
    const encoder = new TextEncoder();
    const data = encoder.encode(userId);
    
    // Hash the data using SHA-256
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    
    // Convert ArrayBuffer to hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    return hashHex;
  } catch (error) {
    console.error('Error hashing user ID:', error);
    throw error;
  }
};

