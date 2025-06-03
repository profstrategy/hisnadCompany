import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

 export interface NavItems {
    id: string,
    item: string
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
    id: string,
    content: string
  }

  export interface AboutHusnad {
    id: string,
    content: string
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
    price:  string;
  }

  interface Payment {
    id: string;
    payment: string
  }

  export type SegregatedProperties = {
    id: number;
    type: 'Hisnad' | 'Crestwood';
    mainImage?: string[] 
    // alt: string;
    tier: 'Residential' | 'Farmland';
    status: 'Available' | 'Sold';
    price: Price[];
    title: string;
    slug: string;
    location: string;
    features?: string[];
    description?: string;
    category?: string;
    benefit?: string[];
    documents?: string[];
    payment?: string[];
    created_at?: string;
    updated_at?: string;
  };

  export type ActivePropertyPreview = {
    mainImage?: string[]
    id: number,
    slug: string,
    title: string;
    location: string;
  };

  export type ActivePropertyPagePreview = {
    id: number,
    tier: 'Residential' | 'Farmland';
    status: 'Available' | 'Sold';
    title: string,
    type: 'Hisnad' | 'Featured';
    mainImage: string[],
    location: string,
    price: string[],
    slug: string
  }

  export type SingularPropertyPreview = {
    title?: string
    location: string;
    features?: string[];
    description: string | null;
    category?: string;
    benefit?: string[];
    mainImage: string[],
    status: 'Available' | 'Sold';
    price: string[],
    payment?: string[];
    created_at: Date;
    updated_at: Date;
  }

  export interface Testimonial {
    id: number;
    name: string;
    role: string;
    rating: number
    testimonial: string;
    image: StaticImport;
    property: string;
  }

  export interface TeamTypes {
    id: string;
    name: string;
    role: string;
    phone: string;
    pre_desc: string
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
  