import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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
  const formatNumber = str.split('').join('');
  return `${formatNumber.substring(0, 4)} ${formatNumber.substring(4, 7)} ${formatNumber.substring(7, 10)} ${formatNumber.substring(10)}`;
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
  return url.split('?')[0];
};