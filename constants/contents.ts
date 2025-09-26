import {
  adeniji,
  muftau,
  testimonial_1,
  testimonial_2,
  testimonial_3,
  testimonial_4,
} from "@/public";
import {
  AboutHusnad,
  Faqs,
  NavItems,
  OfficeAddress,
  TeamTypes,
  Testimonial,
} from "./types";
import { CLIENT_ROUTES } from "@/_lib/routes";
import { CreditCard, Home, TableProperties, UserPen } from "lucide-react";

export const address: OfficeAddress[] = [
  {
    id: "address",
    content:
      "KM 42, Lagos-Ibadan Express way, Opposite AP filling station,  Mowe, Ogun State.",
  },
];

export const navItems: NavItems[] = [
  { id: "/", item: "Home" },
  { id: "/properties", item: "Our-Properties" },
  { id: "/contact", item: "Contact" },
  { id: "/about", item: "About" },
];

export const abouthisnad: AboutHusnad[] = [
  {
    id: "content-1",
    content:
      "Hisnad is a real estate company duly registered in Ogun-Nigeria, and by the Corporate Affairs Commission, Nigeria [--]. It is licensed by the Lagos State Real Estate Regulatory Authority (LASERA) and duly registered with the Real Estate Developer Association of Nigeria (REDAN) and the Economic and Financial Crimes Commission via its Special Control Unit Money Laundering (SCUML) in accordance with the provisions of section(17)(a) of the money laundering (Prevention and prohibition) Act, 2022 and any other law or regulation. Founded over 10+ years ago , Al-Hisnad Home and Property specializes in secure real estate investments with 100% freehold titles. Our farmland partnerships deliver 25% average annual returns.",
  },
];

export const abouthisnad_1: AboutHusnad[] = [
  {
    id: "content2",
    content:
      " We transform land into legacy assets through documentation excellence and agri-investment innovation.",
  },
];

export const faqs: Faqs[] = [
  {
    question: "What is the process of buying a property from Hisnad?",
    answer:
      "The process of buying a property from Hisnad involves selecting a property, making a payment, and completing the necessary documentation. Our team will guide you through each step to ensure a smooth transaction.",
  },
  {
    question: "What types of properties do you offer?",
    answer:
      "We offer a variety of properties, including residential, commercial, and agricultural lands. Our portfolio is designed to meet the diverse needs of our clients.",
  },
  {
    question: "How long does C of O processing take?",
    answer: "60-90 days for Ogun State titles. ",
  },
  {
    question: "Can I visit properties before payment?",
    answer: "Yes - there is room for inspection",
  },
  {
    question: "Can I know briefly about your refund policy?",
    answer:
      "Yes - 100% refund if title documentation fails (verified cases) and 14-day cooling period for land purchases  ",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Adebayo Okafor",
    role: "Residential Investor",
    testimonial:
      "Buying a plot at Al-Hisnad Estate. The location is perfect—close to Lagos-Ibadan Expressway yet serene. The documentation process was seamless, and I got my C of O faster than expected. Highly recommended!",
    image: testimonial_1,
    property: "Al-Hisnad Estate, Shimawa",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Chioma Eze",
    role: "Farmland Investor",
    testimonial:
      "Crestwood Green Acres has been a game-changer for me. I opted for the full-service farming option, and the returns have been impressive. The 25% annual ROI is real! The team handles everything, so I just sit back and earn.",
    image: testimonial_2,
    property: "Crestwood Green Acres",
    rating: 4.5,
  },
  {
    id: 3,
    name: "Emeka Ibrahim",
    role: "Agri-Investor",
    testimonial:
      "Flourish Farm Estate gave me a secure farmland investment with zero stress. The free cassava stems and hybrid maize seeds were a bonus. The deed of assignment was processed smoothly, and I’m already seeing appreciation in land value.",
    image: testimonial_3,
    property: "Flourish Farm Estate",
    rating: 4,
  },
  {
    id: 4,
    name: "Folake Adeleke",
    role: "First-Time Buyer",
    testimonial:
      "As a first-time investor, I was nervous, but Al-Hisnad made it easy. The 10% discount for bulk purchase helped, and their payment plan was flexible. The estate is developing fast, and I’m confident in my investment’s future value.",
    image: testimonial_4,
    property: "Al-Hisnad Estate, Shimawa",
    rating: 5,
  },
];

export const teamContents: TeamTypes[] = [
  {
    id: "principal_technical_head",
    name: "Arc. BABATUNDE ADEBOWALE W. ADENIJI ( MPM,CIPM,MNIA,FAAPM,AIA,MNES)",
    role: "Principal technical head",
    phone: "07062305224",
    mail: "adeniji.architecture@gmail.com",
    image: adeniji,
    pre_desc:
      "Babatunde Adeniji has a Bachelor’s degree in Architecture from The Prestigious Obafemi Awolowo University, ile ife Osun state...",

    description:
      "Babatunde Adeniji has a Bachelor’s degree in Architecture from The Prestigious Obafemi Awolowo University, ile ife Osun state . He also holds a Masters of Science in Architecture from Obafemi Awolowo University, ile-ife Osun state both in Nigeria. He has been fit and recognized as a licensed and registered member Of Architect Registration Council of Nigeria and the Nigeria Institute of Architect(ARCON and NIA),the highest Architectural regulatory body in Nigeria, also recognized by AIA (AMERICAN INSTITUTE OF ARCHITECT) and the Nigeria Environmental Society in Nigeria to support the architecture profession and improve its public image, Likewise as a Certified International project Manager, Masters Project Manager and a fellow of the American Academy of Project Management, with and hand-on experience in Project management and Business Analysis both in UK and Nigeria standard,with an affiliated program on executive diploma in international human resource and international law. A Chartered and Licensed Architect, currently undergoing his M.Phil/Phd Program in Landscape Architecture.",
  },

  {
    id: "farm_manager",
    name: " Salman Olabode Miftau",
    role: "Farm Manager",
    phone: "08023462549",
    mail: "adeniji.architecture@gmail.com",
    image: muftau,
    pre_desc:
      "Salman Olabode Miftau is a graduate of OAU Ile Ife with B.Sc in nuclear science. A member of Poultry association of Nigeria, Ogun state chapter...",
    description:
      "Salman Olabode Miftau is a graduate of OAU Ile Ife with B.Sc in nuclear science. A member of Poultry association of Nigeria, Ogun state chapter. A retired teacher who has been practicing rearing and cropping all along teaching with passion.He is now fully into agriculture as a farmer and farm manager for Hisnad home and property agricultural section based on experience.",
  },
];

type ClientNavbarItems = {
  title: string;
  icon: any;
  url: string;
  isActive: boolean;
};

export const clientNavbarItems: ClientNavbarItems[] = [
  {
    title: "Overview",
    url: CLIENT_ROUTES.PrivatePages.clientDashboard.overview,
    isActive: true,
    icon: Home,
  },
  {
    title: 'Payments',
    url: CLIENT_ROUTES.PrivatePages.clientDashboard.payments,
    isActive:true,
    icon: CreditCard
  },
  {
    title: 'Properties',
    url: CLIENT_ROUTES.PrivatePages.clientDashboard.properties,
    isActive:true,
    icon: TableProperties
  },
  {
    title: 'Profile',
    url: CLIENT_ROUTES.PrivatePages.clientDashboard.profile,
    isActive:true,
    icon: UserPen
  }
];
