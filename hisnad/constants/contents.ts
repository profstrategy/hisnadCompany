import { image1, image2, image3 } from "@/public";
import {
  AboutHusnad,
  Faqs,
  NavItems,
  OfficeAddress,
  SegregatedProperties,
  Status,
} from "./types";

export const address: OfficeAddress[] = [
  {
    id: "address",
    content:
      "KM 42, Lagos-Ibadan Express way, Opposite AP filling station,  Mowe, Ogun State.",
  },
];

export const navItems: NavItems[] = [
  { id: "home", item: "Home" },
  { id: "properties", item: "Our-Properties" },
  { id: "about", item: "About" },
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

export const segregatedproperties: SegregatedProperties[] = [
  {
    id: "al-Hisnad-estate",
    type: "Hisnad",
    image: image1,
    alt: "estate-1",
    tier: "RESIDENTIAL",
    status: Status.Available,
    price: [{ id: "plot", price: "₦3.5 Million" }],
    title: "Al-Hisnad Estate, Shimawa. Ogun State",
    location: "Shimawa. Ogun State",
    description:
      "Al-Hisnad Estate, Shimawa, Ogun State, a 2-mins drive to Cape Town, Shimawa, Ogun State. This phase is designed to offer comfort, recreation, business opportunities, and wholesome family life in a serene environment cater to the needs of modern families. From recreational spaces to business opportunities, this phase has something for everyone. Don’t miss out on the chance to be part of this thriving community. There are many reasons to choose Al-Hisnad Estate for your next home or investment property. The location Ogun State offers a peaceful retreat from the chaos of the city, while still providing easy access to essential amenities. The design and construction of the property are of the highest quality, ensuring that residents enjoy a comfortable and luxurious lifestyle.",
    category: "Landed property, Residential",
    features: [
      "10% discount for bulk purchases",
      "Easy access to Lagos-Ibadan Expressway",
      "2-mins drive to Adron's Cape Town, Shimawa, Ogun State",
      "Instant allocation",
      "C of O processing",
      "Deed of assignment",
      "Registered survey",
    ],

    mainImage: {
      id: "al-Hisnad-estate-images",
      image: [image1],
    },

    payment: [
      { id: "Initial Payment Plan", payment: ` Initial Deposit`},
      { id: "Outright/ 3 Months Payment", payment: "Balance" },
    ]
  },
  {
    id: "crestwood-green-acres",
    type: "Crestwood",
    image: image2,
    alt: "farmland-1",
    tier: "FARMLAND",
    status: Status.Available,
    price: [
      { id: "plot", price: "₦500,000" },
      { id: "acre", price: "₦2.1Million" },
    ],
    title: "Crestwood Green Acres (Featured Farmland)",
    location: "Orile Oko Community, Ogun State",
    description:
      "Crestwood Green Acres, managed by Al-Hisnad Home and Property, offers investors a turnkey farmland investment opportunity in Orile-Oko community, Remo North, Ogun State. The model allows investors to purchase freehold farmland while our team handles end-to-end agribusiness management.",
    category: "Agricultural Investment/Farmland",
    features: [
      "10% discount for bulk purchases",
      "Two management options: Full-service (60/40 profit share) or self-managed",
      "Earn lifetime returns without active farming involvement",
      "Short-Term Crops: Focus on high-demand crops (maize, cassava) with quick ROI",
      "Risk Mitigation: Professional management reduces operational risks.",
      "Land Appreciation: Freehold title guarantees long-term asset value growth",
      "18-25% average annual ROI (with risk-adjusted projections)",
      "Professional agronomy team with guaranteed off-taker networks",
      "Flexible exit/management change options",
    ],
    benefit: [
      "Free 10kg premium hybrid maize seeds per acre and Free 20 bundles of cassava stems per acre",
    ],

    mainImage: {
      id: "crestwood-green-acres-images",
      image: [image1, image2],
    },

    payment: [
      { id: "Initial Payment Plan", payment: ` Initial Deposit`},
      { id: "Outright/ 3 Months Payment", payment: "Balance" },
    ]
  },

  {
    id: "flourish-farm-estate",
    type: "Crestwood",
    image: image3,
    alt: "farmland-2",
    tier: "FARMLAND",
    status: Status.Available,
    price: [
      { id: "plot", price: "₦500,000" },
      { id: "acre", price: "₦2.1Million" },
    ],
    title: "Flourish farm Estate (Featured Farmland)",
    location: "Ikanna Balogun, Obafemi Owode local government, Ogun State.",
    description:
      "Freehold farmland along Lagos-Ibadan Expressway, Ikanna Balogun, Obafemi Owode local government, Ogun State with turnkey agribusiness management. Ideal for investors seeking 18-25% annual ROI through long-term and short-term cultivation.",
    category: "Agricultural Investment/Farmland",
    features: [
      "10% discount for bulk purchases",
      "Deed of Assignment",
      "Registered Survey Plan",
      "Certificate of occupancy (in view)",
    ],
    benefit: [
      "Free 10kg premium hybrid maize seeds per acre and Free 20 bundles of cassava stems per acre",
    ],
    mainImage: {
      id: "flourish-farm-estate-images",
      image: [image1, image2, image3],
    },

    payment: [
      { id: "Initial Payment Plan", payment: ` Initial Deposit`},
      { id: "Outright/ 3 Months Payment", payment: "Balance" },
    ]
  },
];
