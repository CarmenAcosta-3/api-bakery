const express = require("express");
const router = express.Router();
const Producto = require("../models/Producto");

// Ruta para crear productos
router.post("/", async (req, res) => {
  try {
    const nuevoProducto = new Producto(req.body);
    const productoGuardado = await nuevoProducto.save();
    res.status(201).json({
      mensaje: "Producto guardado con éxito",
      producto: productoGuardado,
    });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error al guardar producto", detalle: error });
  }
});

// Ruta para obtener productos
router.get("/", async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener productos", detalle: error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const actualizado = await Producto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ error: "Error actualizando producto" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const eliminado = await Producto.findByIdAndDelete(req.params.id);
    if (!eliminado)
      return res.status(404).json({ error: "Producto no encontrado" });
    res.json({ mensaje: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ error: "Error eliminando producto" });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const actualizado = await Producto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ error: "Error actualizando producto" });
  }
});

module.exports = router;
