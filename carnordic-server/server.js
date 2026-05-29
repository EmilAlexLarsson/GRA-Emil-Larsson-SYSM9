const express = require("express");
const dotenv = require("dotenv").config();
const productRoutes = require("./routes/productRoutes");

const app = express();

app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servern är igång!!`);
});
