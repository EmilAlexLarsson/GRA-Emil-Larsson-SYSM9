const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

const Product = require("./models/productModel");
const User = require("./models/userModel");
const Order = require("./models/orderModel");

dotenv.config();

const products = [
  {
    name: "Instruktionsbok",
    model: "Volvo S60 -01",
    category: "Instruktionsbok",
    price: 220,
    image: "/images/instruktionsbok-volvo-s60-01.jpg",
    description: "Instruktionsbok från en Volvo S60 årsmodell 2001.",
  },
  {
    name: "ABS styrenhet",
    model: "Volvo S80 -05",
    category: "ABS",
    price: 1680,
    image: "/images/abs-styrenhet-volvo-s80-05.jpg",
    description:
      "Abs styrenhet från en Volvo S80 2,4 140hk -05 (14105mil) Enheten fungerar utmärkt, demonterad från krockskadat fordon",
  },
  {
    name: "Mätarhus",
    model: "Volvo S70, V70",
    category: "Mätarhus",
    price: 980,
    image: "/images/kombiinstrument-matarhus-volvo-s70-v70.jpg",
    description: "Mätarhus från en S70 -00, Mätarställning endast 15040mil",
  },
  {
    name: "Instruktionsbok",
    model: "Volvo 760 -88",
    category: "Instruktionsbok",
    price: 220,
    image: "/images/instruktionsbok-volvo-760-88.jpg",
    description: "Instruktionsbok från en Volvo 760 årsmodell 1988.",
  },
  {
    name: "Fönsterhissmotor",
    model: "Volvo V50, S60",
    category: "Fönsterhiss",
    price: 340,
    image: "/images/fonsterhissmotor-hogerfram-volvo-v50-s60.jpg",
    description:
      "Fönsterhissmotor från en Volvo S40 -06 (8125mil), passar S40 V50 årsmodell 2004-2006",
  },
  {
    name: "Mätarhus R-design",
    model: "Volvo V50, S40, C30, C70",
    category: "Mätarhus",
    price: 1380,
    image: "/images/Matarhus-Rdesign-Volvo-v50-s40-c30-c70.jpg",
    description:
      "Mätarhus R design från en Volvo V50 D5 -09 (ca 29000mil), passar även andra modeller som S40 C30 och C70",
  },
  {
    name: "Fönsterhissmotor",
    model: "Volvo V50, S60",
    category: "Fönsterhiss",
    price: 340,
    image: "/images/fonsterhissmotor-vansterbak-volvo-v50-s60.jpg",
    description:
      "Fönsterhissmotor från en Volvo S40 -06 (8125mil), passar S40 V50 årsmodell 2004-2006",
  },
  {
    name: "Instruktionsbok",
    model: "Volvo S60 -06",
    category: "Instruktionsbok",
    price: 220,
    image: "/images/instruktionsbok-volvo-s60-06.jpg",
    description: "Instruktionsbok från en Volvo S60 årsmodell 2006.",
  },
  {
    name: "Fönsterhissmotor",
    model: "Volvo V70, XC70, V60, S60",
    category: "Fönsterhiss",
    price: 340,
    image: "/images/fonsterhissmotor-volvo-v70-xc70-v60-s60.jpg",
    description: "Fönsterhissmotor från Volvo V70, XC70, V60 och S60.",
  },
  {
    name: "ABS styrenhet",
    model: "Volvo V70 -02",
    category: "ABS",
    price: 1280,
    image: "/images/abs-styrenhet-volvo-v70-02.jpg",
    description:
      "Abs styrenhet från en Volvo V70 2,4 140hk -02 (14830mil), passar endast bil med stc antispinn (ej dstc)",
  },
  {
    name: "Mätarhus",
    model: "Volvo V50, S40",
    category: "Mätarhus",
    price: 890,
    image: "/images/kombiinstrument-matarhus-volvo-v50-s40.jpg",
    description: "Mätarhus för Volvo V50 och S40 årsmodell 2007 (ca 21000mil)",
  },
  {
    name: "Instruktionsbok",
    model: "Volvo V70 -08",
    category: "Instruktionsbok",
    price: 220,
    image: "/images/instruktionsbok-volvo-v70-08.jpg",
    description: "Instruktionsbok från en Volvo V70II årsmodell 2008.",
  },
];
//funktion som fyller db med data
async function seed() {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("Ansluten till MongoDB");
    //rensar befintliga produkter, användare och ordrar i db
    //db börjar om
    await Product.deleteMany();
    await User.deleteMany();
    await Order.deleteMany();

    console.log("Befintlig data rensad");
    //lägger in alla produkter i db
    await Product.insertMany(products);

    console.log(`${products.length} produkter inlagda`);
    //hashar lösen för standardanvändaren "user"
    const hashedPassword = await bcrypt.hash("password", 10);
    //skapar en standardanvändare med username "user"
    await User.create({
      username: "user",
      email: "user@carnordic.se",
      password: hashedPassword,
      favorites: [],
    });

    console.log("Standardanvändare skapad: user / password");
    console.log("Seeding klar!");
  } catch (error) {
    console.error("Något gick fel:", error.message);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
