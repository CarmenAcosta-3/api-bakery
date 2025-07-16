// server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const Producto = require("./Producto");

// Cargar variables de entorno desde .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Para parsear JSON
app.use(cors()); // Para permitir solicitudes desde el frontend

// Conexión con MongoDB Atlas usando la URL del .env

mongoose
  .connect(process.env.MONGO_URL)

  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error al conectar con MongoDB:", err));

// Ruta para crear productos
app.post("/productos", async (req, res) => {
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
app.get("/productos", async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener productos", detalle: error });
  }
});

app.put("/productos/:id", async (req, res) => {
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

app.delete("/productos/:id", async (req, res) => {
  try {
    const eliminado = await Producto.findByIdAndDelete(req.params.id);
    if (!eliminado)
      return res.status(404).json({ error: "Producto no encontrado" });
    res.json({ mensaje: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ error: "Error eliminando producto" });
  }
});

app.patch("/productos/:id", async (req, res) => {
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

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
