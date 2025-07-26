const express = require("express");
const router = express.Router();
const Order = require("../models/orders");

// ✅ Crear nuevo pedido
router.post("/", async (req, res) => {
  try {
    const { productos, total, categoria, status, user, email } = req.body;

    const newOrder = new Order({
      productos,
      total,
      categoria,
      status,
      user,
      email,
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error al crear el pedido:", error);
    res.status(500).json({ message: "Error al crear el pedido" });
  }
});

// ✅ Obtener todos los pedidos con datos de usuario
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email role");
    res.json(orders);
  } catch (error) {
    console.error("Error al obtener pedidos:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// ✅ Actualizar un pedido
router.put("/:id", async (req, res) => {
  try {
    const { productos, total, categoria, status, user, email } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        productos,
        total,
        categoria,
        status,
        user,
        email,
      },
      { new: true }
    );

    res.json(updatedOrder);
  } catch (error) {
    console.error("Error al actualizar el pedido:", error);
    res.status(500).json({ message: "Error al actualizar el pedido" });
  }
});

// ✅ Eliminar un pedido
router.delete("/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Pedido eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el pedido:", error);
    res.status(500).json({ message: "Error al eliminar el pedido" });
  }
});

module.exports = router;
