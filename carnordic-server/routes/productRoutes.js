const express = require("express");
const { getProducts, getProduct } = require("../controllers/productController");

const router = express.Router();

router.route("/").get(getProducts);
router.route("/:id").get(getProduct);
module.exports = router;
