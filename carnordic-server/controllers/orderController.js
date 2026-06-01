const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Order = require("../models/orderModel");

// @desc Create new order
// @route POST /api/orders
// @access public
const createOrder = asyncHandler(async (req, res) => {
  //hämtar orderinfo från req body
  const { customer, paymentMethod, items, subtotal, shipping, totalPrice } =
    req.body;
  //kontrollerar att all nödvändig info finns och är giltig
  if (!customer || !customer.name || !customer.email) {
    res.status(400);
    throw new Error("Namn och e-post krävs");
  }
  //kontrollerar betalningsmetod
  if (!paymentMethod || !["card", "swish"].includes(paymentMethod)) {
    res.status(400);
    throw new Error("Ogiltig betalningsmetod");
  }
  //kontrollerar att ordern innehåller minst en produkt
  if (!items || items.length === 0) {
    res.status(400);
    throw new Error("Ordern måste innehålla minst en produkt");
  }
  //skapar en ny order i db med den info som skickats in
  //om de inte finns någon shipping blir den 0
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
  //kontrollerar att id:t är ett giltigt mongoose object id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Ogiltigt order-id");
  }
  //söker efter ordern i db med id:t
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
