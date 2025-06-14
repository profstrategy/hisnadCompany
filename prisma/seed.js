const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

// async function main() {
//   const hashedPassword = await bcrypt.hash('Password123!', 10);

//   await prisma.user.create({
//     data: {
//       firstName: 'John',
//       lastName: 'Doe',
//       address: '123 Main Street, Lagos',
//       phoneNumber: '+2348012345678',
//       nextOfKinName: 'Jane Doe',
//       nextOfKinPhoneNumber: '+2348098765432',
//       nextOfKinAddress: '456 Elm Street, Abuja',
//       email: 'john.doe@example.com',
//       password: hashedPassword,
//       accountType: 'ADMIN',
//       isActive: true,
//       emailVerified: new Date(),
//     },
//   });

//   console.log('Dummy user created.');
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

const properties = [
  {
    id: '7422006b-1112-4aa3-a8e4-b623eedddbf8',
    type: "Hisnad_Estate",
    mainImage: {
      id: 1,
      urls: [
        "https://res.cloudinary.com/dcuie3jbl/image/upload/v1748250806/hisnad-estate_sux2ij.jpg",
      ],
    },
    tier: "Residential",
    status: "Available",
    hisnad_estate_amount_plot: 3500000,
    title: "Al-Hisnad Estate, Shimawa. Ogun State",
    slug: "al-Hisnad-estate",
    location: "Shimawa. Ogun State",
    description:
      "Al-Hisnad Estate, Shimawa, Ogun State, a 2-mins drive to Cape Town, Shimawa, Ogun State. This phase is designed to offer comfort, recreation, business opportunities, and wholesome family life in a serene environment cater to the needs of modern families. From recreational spaces to business opportunities, this phase has something for everyone. Don't miss out on the chance to be part of this thriving community. There are many reasons to choose Al-Hisnad Estate for your next home or investment property. The location Ogun State offers a peaceful retreat from the chaos of the city, while still providing easy access to essential amenities. The design and construction of the property are of the highest quality, ensuring that residents enjoy a comfortable and luxurious lifestyle.",
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
    benefit: [],
    documents: [],
    payment: [
      { id: "Initial Payment Plan", payment: "Initial Deposit" },
      { id: "Outright/ 3 Months Payment", payment: "Balance" },
    ],
  },
  {
    id: '4139b7bd-2fc1-4f5e-83d4-d2fa1d6d18e8',
    type: "Featured_Farmland",
    mainImage: {
      id: 2,
      urls: [
        "https://res.cloudinary.com/dcuie3jbl/image/upload/v1748250835/featured-1_llvfoi.jpg",
      ],
    },
    tier: "Farmland",
    status: "Available",
    featured_farmland_amount_plot: 500000,
    featured_farmland_amount_acre: 2100000,
    title: "Featured Green Acres (Featured Farmland)",
    slug: "featured-green-acres",
    location: "Orile Oko Community, Ogun State",
    description:
      "featured Green Acres, managed by Al-Hisnad Home and Property, offers investors a turnkey farmland investment opportunity in Orile-Oko community, Remo North, Ogun State. The model allows investors to purchase freehold farmland while our team handles end-to-end agribusiness management.",
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
    documents: [],
    payment: [
      { id: "Initial Payment Plan", payment: "Initial Deposit" },
      { id: "Outright/ 3 Months Payment", payment: "Balance" },
    ],
  },
  {
    type: "Featured_Farmland",
    id: '3cf28db2-45c9-4f9e-8de1-652d86ea0958',
    mainImage: {
      id: 3,
      urls: [
        "https://res.cloudinary.com/dcuie3jbl/image/upload/v1748250851/featured-2_rnmtah.jpg",
        "https://res.cloudinary.com/dcuie3jbl/image/upload/v1748250835/featured-1_llvfoi.jpg",
      ],
    },
    tier: "Farmland",
    status: "Available",
    featured_farmland_amount_plot: 500000,
    featured_farmland_amount_acre: 2100000,
    title: "Flourish farm Estate (Featured Farmland)",
    slug: "flourish-farm-estate",
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
    documents: [],
    payment: [
      { id: "Initial Payment Plan", payment: "Initial Deposit" },
      { id: "Outright/ 3 Months Payment", payment: "Balance" },
    ],
  },
];

async function main() {
  console.log(`Start seeding...`);

  for (const property of properties) {
    // Transform the data to match Prisma schema
    const prismaData = {
      id: property.id,
      type: property.type,
      mainImage: property.mainImage?.urls || [],
      tier: property.tier,
      status: property.status,
      hisnad_estate_amount_plot: property.hisnad_estate_amount_plot || null,
      featured_farmland_amount_plot:
        property.featured_farmland_amount_plot || null,
      featured_farmland_amount_acre:
        property.featured_farmland_amount_acre || null,
      title: property.title,
      category: property.category,
      slug: property.slug,
      location: property.location,
      features: property.features || [],
      description: property.description || null,
      benefit: property.benefit || [],
      documents: property.documents || [],
      payment: property.payment?.map((p) => p.payment) || [],
    };

    const createdProperty = await prisma.segregatedProperties.upsert({
      where: { id: property.id },
      create: prismaData,
      update: prismaData,
    });
    console.log(`Processed property with id: ${createdProperty.id}`);
  }

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

  // ₦