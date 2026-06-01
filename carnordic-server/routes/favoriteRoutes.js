const express = require("express");

const {
  getFavorites,
  addFavorite,
  removeFavorite,
} = require("../controllers/favoriteController");

const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.get("/", validateToken, getFavorites);
router.post("/", validateToken, addFavorite);
router.delete("/:productId", validateToken, removeFavorite);

module.exports = router;
