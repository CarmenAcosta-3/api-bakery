const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const productosRoutes = require("./routers/router.Productos");
const usuariosRoutes = require("./routers/router.usuario");
const blogRoutes = require("./routers/router.blog");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: [/^http:\/\/localhost:\d+$/],
    credentials: true,
  })
);
app.use(express.json());

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error al conectar:", err));

// Rutas
app.use("/productos");
app.use("/usuarios");
app.use("/blog");
app.use("/newsletters");

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

app.use("/usuarios", usuariosRoutes);
