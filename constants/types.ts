import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import { ACCOUNT_TYPE, STATUS } from "./generic";
import { Size, Type } from "@prisma/client";

export interface NavItems {
  id: string;
  item: string;
}

export interface DesktopNavLinksProps {
  navItems: NavItems[];
  activeItem: string;
  setActiveItem: (id: string) => void;
}

export interface MobileNavMenuProps {
  isOpen: boolean;
  navItems: NavItems[];
  activeItem: string;
  setActiveItem: (id: string) => void;
  setIsOpen: (isOpen: boolean) => void;
}

export interface OfficeAddress {
  id: string;
  content: string;
}

export interface AboutHusnad {
  id: string;
  content: string;
}

export interface features {
  id: string;
  content?: string;
  image: StaticImport;
}

export interface Properties {
  id: number;
  image: StaticImport;
  alt: string;
  title: string;
  location: string;
}

export interface Faqs {
  question?: string;
  answer?: string;
  [key: `answer_${number}`]: string | undefined;
}

interface Price {
  id: string;
  price: string;
}

export type SegregatedProperties = {
  id?: string;
  type: "Hisnad_Estate" | "Featured_Farmland";
  mainImage?: string[];
  // alt: string;
  tier?: "Residential" | "Farmland";
  status?: "Available" | "Sold";
  featured_farmland_amount_plot: number | null;
  featured_farmland_amount_acre: number | null;
  hisnad_estate_amount_plot: number | null;
  hisnad_estate_amount_acre: number | null;
  title?: string;
  slug?: string;
  size: string;
  location?: string;
  features?: string[];
  description?: string | null;
  category?: string;
  benefit?: string[];
  documents?: string[];
  payment?: string[];
  created_at?: Date;
  updated_at?: Date;
};

export interface GetPropertyById {
  id: string;
  property_id: string | null;
  slug: string;
  title: string;
  location: string;
  status: "Available" | "Sold";
  type: Type;
  size: Size
  category: string;
  payment: string[];
  featured_farmland_amount_plot: number | null;
  featured_farmland_amount_acre: number | null;
  hisnad_estate_amount_plot: number | null;
  hisnad_estate_amount_acre: number | null;
}

export interface GetActiveProperties {
  id: string;
  slug: string;
  mainImage: string[];
  title: string;
  location: string;
  type: string;
}
export interface Testimonial {
  id: number;
  name: string;
  role: string;
  rating: number;
  testimonial: string;
  image: StaticImport;
  property: string;
}

export interface TeamTypes {
  id: string;
  name: string;
  role: string;
  phone: string;
  pre_desc: string;
  description: string;
  mail: string;
  image: StaticImport;
}

export interface CustomUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  accountType?: string;
  status?: string;
  accessToken: string;
  refreshToken: string;
  sessionId: string;
}

export interface OnboardUser {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  status: string | null;
  selected_product_id: string | null;
}

export interface CustomToken extends JWT {
  userId: string;
  accessToken: string;
  refreshToken: string;
  sessionId: string;
  firstName?: string;
  lastName?: string;
  accountType?: string;
  status?: string;
  tokenExpires: number;
}

export interface CustomSession extends Session {
  userId: string;
  accessToken: string;
  sessionId: string;
  accountType?: string;
  status?: string;
}

export interface RegisterEmailApiResponse {
  success?: boolean;
  message?: string;
  email?: string;
  userId?: string;
  status?: string;
 resendEmailModal?: boolean
 isReturningPendingUser?: boolean
  statusCode?: number;
}

export interface PersistData {
  email?: string;
  id?: string;
}

export interface CompleteOnboardingApiResponse {
   showSendLinkToEmailModal?: boolean
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

export interface ConfirmedUserApiResponse {
  success?: boolean;
  message?: string;
  userId: string
}

export interface UserDataType {
  password?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  phoneNumber?: string;
  nextOfKinName?: string;
  nextOfKinPhoneNumber?: string;
  nextOfKinAddress?: string;
  accountType?: "USER" | "ADMIN";
  status?: "onboarded" | "pending";
}

export interface Subscriptions {
  id: string;
  property_type: "Hisnad_Estate" | "Featured_Farmland" | null;
  property_select?: string;
  payment_plan?: "full_payment" | "installment" | null;
  user_id?: string;
  fullName?: string;
  email?: string;
  product_id: string;
  size: string;
  status?: "idle" | "initialized" | "incomplete" | "completed" | "active";
  payment_intent_id?: string | null;
  amount?: number;
  initialized_payment_id: string;
}

export interface PaymentInitializationResponse {
  success: boolean;
  amount?: string | null;
  property_type: string;
  property_select?: string;
  redirectToPaymentPage: boolean;
  message: string;
  isCompletePaymentModal: boolean;
  isForcePropertyPurchase: boolean;
  isExeedLimit: boolean;
  redirectToRegister: boolean;
  isReturning: boolean;
  isActivateAccount: boolean;
  property_id: string;
  initialized_payment_id: string;
  description: string;
  size: string;
  plan: string;
  userId: string;
  status: number;
  paymentStatus: string;
}

export interface ForgotPasswordResponse {
  message: string;
  error?: string;
  status?: number;
  userId: string;
  success?: boolean;
}

export interface ResetPasswordResponse {
  message: string;
  description: string;
  redirectToLogin: string;
  success?: boolean;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface PropertyData {
  id: string;
  type: string;
  slug: string;
  size?: number;
  userId?: string;
}

export interface UserData {
  id: string;
  firstName?: string;
  lastName?: string;
  status?: string;
}

export interface ApiResponseUserProperty {
  success: boolean;
  message?: string;
  error?: string;
  data?: {
    fullname: string;
    property_id: string;
    property_type: string;
    property_name: string;
    status: string;
    size: string;
    amount_paid: string | number;
    payment_plan: string;
    amount_remaining: string | number;
  };
}
export type VerifyEmailConfirmResponseType = {
  message: string,
  success: boolean,
  userId: string
}

export enum PaymentEnum {
  amount = 'amount',
  initialized_payment_id = 'initialized_payment_id',
  size = 'size'
}