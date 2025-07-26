const express = require("express");
const router = express.Router();
const Order = require("../models/orders");
const productsShoppingCar = require("../models/Producto.js");

router.post("/", async (req, res) => {
  const { nombre, precio, quantity, date, categoria, status, user, email } =
    req.body;
  const newOrder = new Order({
    nombre,
    precio,
    quantity,
    date,
    categoria,
    status,
    user,
    email,
  });
  await newOrder.save();
  res.status(201).json(newOrder);
});

router.get("/", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, precio, quantity, date, categoria, status, user, email } =
    req.body;
  const updatedOrder = await Order.findByIdAndUpdate(
    id,
    { nombre, precio, quantity, date, categoria, status, user, email },
    { new: true }
  );
  res.json(updatedOrder);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Order.findByIdAndDelete(id);
  res.json({ message: "Order deleted successfully" });
});

module.exports = router;
