const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Order = require("../models/orderModel");

// @desc Create new order
// @route POST /api/orders
// @access public
const createOrder = asyncHandler(async (req, res) => {
  const { customer, paymentMethod, items, subtotal, shipping, totalPrice } =
    req.body;

  if (!customer || !customer.name || !customer.email) {
    res.status(400);
    throw new Error("Namn och e-post krävs");
  }

  if (!paymentMethod || !["card", "swish"].includes(paymentMethod)) {
    res.status(400);
    throw new Error("Ogiltig betalningsmetod");
  }

  if (!items || items.length === 0) {
    res.status(400);
    throw new Error("Ordern måste innehålla minst en produkt");
  }

  const order = await Order.create({
    customer,
    paymentMethod,
    items,
    subtotal,
    shipping: shipping || 0,
    totalPrice,
  });

  res.status(201).json(order);
});

// @desc Get single order
// @route GET /api/orders/:id
// @access public
const getOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Ogiltigt order-id");
  }

  const order = await Order.findById(id);

  if (!order) {
    res.status(404);
    throw new Error("Order hittades inte");
  }

  res.status(200).json(order);
});

module.exports = {
  createOrder,
  getOrder,
};
