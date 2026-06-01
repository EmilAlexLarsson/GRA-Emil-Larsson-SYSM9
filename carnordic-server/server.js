const express = require("express");
const dotenv = require("dotenv").config();
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const { connect } = require("mongoose");
const connectDB = require("./config/dbConnection");

connectDB();

const app = express();

app.use(express.json()); //middleware

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/favorites", favoriteRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servern är igång!! Port: ${PORT}`);
});
