
import { testimonial_1, testimonial_2, testimonial_3, testimonial_4 } from "@/public";
import {
  AboutHusnad,
  Faqs,
  NavItems,
  OfficeAddress,
  Testimonial,
} from "./types";

export const address: OfficeAddress[] = [
  {
    id: "address",
    content:
      "KM 42, Lagos-Ibadan Express way, Opposite AP filling station,  Mowe, Ogun State.",
  },
];

export const navItems: NavItems[] = [
  { id: "/", item: "Home" },
  { id: "properties", item: "Our-Properties" },
  { id: "about", item: "About" },
  // { id: "contact", item: "Contact" },
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

export const testimonials:Testimonial[] = [
  {
    id: 1,
    name: "Adebayo Okafor",
    role: "Residential Investor",
    testimonial: "Buying a plot at Al-Hisnad Estate. The location is perfect—close to Lagos-Ibadan Expressway yet serene. The documentation process was seamless, and I got my C of O faster than expected. Highly recommended!",
    image: testimonial_1,
    property: "Al-Hisnad Estate, Shimawa",
    rating: 4.8
  },
  {
    id: 2,
    name: "Chioma Eze",
    role: "Farmland Investor",
    testimonial: "Crestwood Green Acres has been a game-changer for me. I opted for the full-service farming option, and the returns have been impressive. The 25% annual ROI is real! The team handles everything, so I just sit back and earn.",
    image: testimonial_2,
    property: "Crestwood Green Acres",
    rating: 4.5
  },
  {
    id: 3,
    name: "Emeka Ibrahim",
    role: "Agri-Investor",
    testimonial: "Flourish Farm Estate gave me a secure farmland investment with zero stress. The free cassava stems and hybrid maize seeds were a bonus. The deed of assignment was processed smoothly, and I’m already seeing appreciation in land value.",
    image: testimonial_3,
    property: "Flourish Farm Estate",
    rating: 4
  },
  {
    id: 4,
    name: "Folake Adeleke",
    role: "First-Time Buyer",
    testimonial: "As a first-time investor, I was nervous, but Al-Hisnad made it easy. The 10% discount for bulk purchase helped, and their payment plan was flexible. The estate is developing fast, and I’m confident in my investment’s future value.",
    image: testimonial_4,
    property: "Al-Hisnad Estate, Shimawa",
    rating: 5
  }
];
