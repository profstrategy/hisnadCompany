import { StaticImport } from "next/dist/shared/lib/get-img-props";

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