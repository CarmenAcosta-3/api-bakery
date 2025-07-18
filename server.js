const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const productosRoutes = require("./routers/router.Productos");
const usuariosRoutes = require("./routers/router.usuario");
const blogRoutes = require("./routers/router.blog");
const newslettersRoutes = require("./routers/router.newsletters");

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
app.use("/productos", productosRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("/blog", blogRoutes);
app.use("/newsletters", newslettersRoutes);

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

app.use("/usuarios", usuariosRoutes);
