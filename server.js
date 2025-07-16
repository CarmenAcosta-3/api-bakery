const express = require("express");
const mongoose = require("mongoose");
const Producto = require("./Producto");
const cors = require("cors");
require("dotenv").config(); // Cargar variables desde .env

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Variables de entorno
const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL;

// Conexión a MongoDB Atlas
mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Conectado a MongoDB con Mongoose"))
  .catch((err) => console.error("❌ Error al conectar con MongoDB:", err));

// Rutas
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
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
