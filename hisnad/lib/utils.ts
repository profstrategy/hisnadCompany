import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const splitPhoneNumber = (str: string) => {
  const formatNumber = str.split('').join('');
  return `${formatNumber.substring(0, 4)} ${formatNumber.substring(4, 7)} ${formatNumber.substring(7, 10)} ${formatNumber.substring(10)}`;
};