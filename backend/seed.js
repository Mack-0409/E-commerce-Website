import mongoose from "mongoose";
import Watch from "./models/watchModel.js";

const watches = [
  {
    name: "JACOB & CO. EPIC X",
    description: "Automatic • Sport Strap",
    price: 619000,
    category: "men",
    brandName: "Jacob & Co",
    image: "/W1.png",
  },
  {
    name: "H. MOSER & CIE.",
    description: "Chronograph • Leather",
    price: 1069200,
    category: "men",
    brandName: "H. Moser & Cie",
    image: "/W2.png",
  },
  {
    name: "BVLGARI OCTO",
    description: "Limited Edition • Bold",
    price: 3100000,
    category: "men",
    brandName: "Bvlgari",
    image: "/W3.png",
  },
  {
    name: "IWC PORTUGIESER",
    description: "Skeleton • Titanium",
    price: 2450000,
    category: "men",
    brandName: "IWC",
    image: "/W4.png",
  },
  {
    name: "BELL & ROSS URBAN",
    description: "Minimal • Purple Dial",
    price: 3300000,
    category: "men",
    brandName: "Bell & Ross",
    image: "/W5.png",
  },
  {
    name: "D1 MILANO",
    description: "Classic • Dress",
    price: 3840000,
    category: "men",
    brandName: "D1 Milano",
    image: "/W6.png",
  },
  {
    name: "LONGINES ELEGANCE",
    description: "Quartz • Mesh Strap",
    price: 299000,
    category: "women",
    brandName: "Longines",
    image: "/W7.png",
  },
  {
    name: "RADO CENTRIX",
    description: "Slim • Steel",
    price: 149000,
    category: "women",
    brandName: "Rado",
    image: "/W8.png",
  },
  {
    name: "BVLGARI SERPENTI",
    description: "Slim • Steel",
    price: 149000,
    category: "women",
    brandName: "Bvlgari",
    image: "/W9.png",
  },
  {
    name: "ORIS AQUIS",
    description: "Slim • Steel",
    price: 149000,
    category: "women",
    brandName: "Oris",
    image: "/W10.png",
  },
  {
    name: "OMEGA",
    description: "Slim • Steel",
    price: 149000,
    category: "women",
    brandName: "Omega",
    image: "/W11.png",
  },
  {
    name: "MASERATI LIFESTYLE",
    description: "Slim • Steel",
    price: 149000,
    category: "women",
    brandName: "Maserati",
    image: "/W12.png",
  },
];

const comingSoon = [
  {
    name: "Norqain Independence",
    description: "Coming Soon",
    price: 619000,
    category: "men",
    brandName: "Norqain",
    image: "/CS1.png",
  },
  {
    name: "Zenith Chronomaster",
    description: "Coming Soon",
    price: 1069200,
    category: "men",
    brandName: "Zenith",
    image: "/CS2.png",
  },
  {
    name: "Jacob & Co. Epic X",
    description: "Coming Soon",
    price: 3100000,
    category: "men",
    brandName: "Jacob & Co",
    image: "/CS3.png",
  },
  {
    name: "Bvlgari Octo",
    description: "Coming Soon",
    price: 2450000,
    category: "men",
    brandName: "Bvlgari",
    image: "/CS4.png",
  },
  {
    name: "Louis Erard Excellence",
    description: "Coming Soon",
    price: 3300000,
    category: "men",
    brandName: "Louis Erard",
    image: "/CS5.png",
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect("mongodb+srv://user200:test300@urbantime.9ar7b88.mongodb.net/UrbanTime");
    console.log("Connected to MongoDB");

    await Watch.deleteMany({});
    console.log("Cleared existing watches");

    const allWatches = [...watches, ...comingSoon];
    await Watch.insertMany(allWatches);
    console.log(`Seeded ${allWatches.length} watches successfully`);

    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
};

seedDatabase();
