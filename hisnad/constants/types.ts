import { StaticImageData, StaticImport } from "next/dist/shared/lib/get-img-props";

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

  interface Images {
    id: string;
    image: [StaticImageData, ...StaticImageData[]];
  }

  interface Price {
    id: string;
    price:  string;
  }

  interface Payment {
    id: string;
    payment: string
  }

  export enum Status {
    Available = 'Available',
    Sold = 'Sold',
  }

  export type SegregatedProperties = {
    id: string;
    type: 'Hisnad' | 'Crestwood';
    image?: StaticImport;
    mainImage?: Images 
    alt: string;
    tier: string;
    status: Status;
    price: Price[];
    title: string;
    location: string;
    features?: string[];
    description?: string;
    category?: string;
    benefit?: string[];
    documents?: string[];
    payment?: Payment[];
  };