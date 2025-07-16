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
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
