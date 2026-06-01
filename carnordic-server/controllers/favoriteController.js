const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Product = require("../models/productModel");

// @desc Hämta den inloggade användarens favoriter
// @route GET /api/favorites
// @access Private
const getFavorites = asyncHandler(async (req, res) => {
  //hämtar användaren från db med id
  //populate("favorites") fyller i favoritprodukterna istället för bara id:n
  const user = await User.findById(req.user.id).populate("favorites"); // fyller

  if (!user) {
    res.status(404);
    throw new Error("Användaren hittades inte");
  }
  // skickar tillbaka favoritprodukterna som json
  res.status(200).json(user.favorites);
});

// @desc Lägg till en produkt i favoriter
// @route POST /api/favorites
// @access Private
const addFavorite = asyncHandler(async (req, res) => {
  //hämtar productId från req body
  const { productId } = req.body;

  if (!productId) {
    res.status(400);
    throw new Error("productId krävs");
  }
  // kollar att produkten finns i db
  const product = await Product.findById(productId);

  if (!product) {
    res.status(404);
    throw new Error("Produkten hittades inte");
  }

  //lägger till produkten i favoriter array
  //addtoset lägger bara till om den inte redan finns där
  // new:true gör att den uppdaterade användaren returneras
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $addToSet: { favorites: productId } },
    { new: true },
  ).populate("favorites");

  if (!user) {
    res.status(404);
    throw new Error("Användaren hittades inte");
  }
  // skickar tillbaka den uppdaterade favoritlistan som json
  res.status(200).json(user.favorites);
});

// @desc Ta bort en produkt från favoriter
// @route DELETE /api/favorites/:productId
// @access Private
const removeFavorite = asyncHandler(async (req, res) => {
  //tar bort produkten med id från favoritlistan
  //pull tar bort matchande värde från arrayen

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $pull: { favorites: req.params.productId } },
    { new: true },
  ).populate("favorites");

  if (!user) {
    res.status(404);
    throw new Error("Användaren hittades inte");
  }

  res.status(200).json(user.favorites);
});

module.exports = {
  getFavorites,
  addFavorite,
  removeFavorite,
};
