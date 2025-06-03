import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import bcrypt from 'bcryptjs'
import getServerSession from 'next-auth'
import { ACCOUNT_TYPE } from "@/constants/generic";
import { authOptions } from "./auth";
import { CLIENT_ROUTES } from "./routes";
import { redirect } from 'next/navigation';
import { getSession, useSession } from "next-auth/react";

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

export const hashedData = (data: string): string => {
  return bcrypt.hashSync(data, 12)
}


export const checkAuth = ({ pageType }: { pageType: ( typeof ACCOUNT_TYPE )[keyof typeof ACCOUNT_TYPE] }) => {
const session = useSession()

  if (!session) {
    redirect(CLIENT_ROUTES.PublicPages.auth.login);
  }

  if (
    pageType === 'ADMIN' &&
    session.data?.accountType !== ACCOUNT_TYPE.ADMIN
  ) {
    redirect(CLIENT_ROUTES.PublicPages.auth.login);
  }
}