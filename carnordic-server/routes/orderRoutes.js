const express = require("express");

const { createOrder, getOrder } = require("../controllers/orderController");

const router = express.Router();

router.route("/").post(createOrder);
router.route("/:id").get(getOrder);

module.exports = router;
