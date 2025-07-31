README_API_BAKERY

# 🛠️ Backend - Proyecto Full Stack (Express + MongoDB)

Este es el backend del proyecto, desarrollado con **Node.js**, **Express**, **MongoDB** y desplegado en **Railway**. Contiene la lógica de negocio y gestión de datos para ser consumido desde el frontend.

---

## 🚀 Tecnologías usadas

- **Node.js** y **Express** (framework del servidor)
- **MongoDB** con **Mongoose** (base de datos NoSQL)
- **Railway** para el despliegue del backend
- **Dotenv** para variables de entorno
- **Nodemailer** para envío de correos de confirmación
- **Separación por controllers y routers** 

---

## 📁 Estructura del proyecto

/models → Modelos de Mongoose
/controllers → Controladores con lógica de negocio
/routers → Definición de rutas Express
server.js → Configuración principal del servidor
.env → Variables de entorno (MONGO_URL, EMAIL_USER, etc.)
formulario.js → Formulario auxiliar para cargar productos fácilmente
tips.txt → Archivo con notas rápidas o recordatorios de desarrollo


---

## 🔗 Rutas principales

- `POST /productos` – Crear producto
- `GET /productos` – Listar productos
- `POST /orders` – Crear pedido
- `GET /orders` – Ver todos los pedidos
- `POST /blog` – Crear entrada de blog
- `POST /email/enviar-confirmacion` – Enviar email de pedido
- `POST /newsletters` – Suscribirse al boletín
- `GET /users` – Obtener todos los usuarios

✅ Todas las rutas están organizadas en routers y conectadas a controladores separados para mantener un código limpio y profesional.

---

## ⚙️ Variables de entorno

Creadas en un archivo `.env` (no se sube al repo por seguridad):

MONGO_URL=mongodb+srv://...
EMAIL_USER=micorreo@gmail.com
EMAIL_PASS=contraseña_app


---

## 🌐 Despliegue

- Servidor backend alojado en: `https://<tu-app>.railway.app`
- Conectado a base de datos MongoDB Atlas

---

## 🧪 Cómo ejecutar localmente

1. Clona el repo
2. Ejecuta:
   ```bash
   npm install
   npm run dev

📝 Notas finales
Este backend fue desarrollado como parte de un proyecto full stack para clase, siguiendo buenas prácticas de separación de lógica, uso de controladores y despliegue en la nube.


---

:

📌 TIPS PARA BACKEND CON EXPRESS (FUTUROS PROYECTOS)
✅ 1. Usar morgan para ver las peticiones en consola
Instalar con:
npm install morgan

Agregar al server:

js

const morgan = require("morgan");
app.use(morgan("dev"));
Útil para ver en tiempo real las rutas que se llaman:

bash

GET /productos 200 24ms
POST /orders 201 40ms
✅ 2. Agregar ruta base / para verificar que el backend responde
js

app.get("/", (req, res) => {
  res.send("🌐 API funcionando correctamente");
});
✅ 3. Separar app.js y server.js (estructura escalable)
Ventaja: Permite testear el servidor sin levantarlo, mejora la organización.

app.js contiene toda la configuración de Express

server.js solo se encarga de conectar a la DB y hacer listen

app.js

js

const express = require("express");
const app = express();
app.use(express.json());
// rutas aquí
module.exports = app;
server.js

js

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config();
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ Conectado a MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Servidor en http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("❌ Error al conectar:", err));
✅ 4. Agregar middleware global de errores
Crear archivo middlewares/errorHandler.js:

js

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Error interno del servidor"
  });
};

module.exports = errorHandler;
Y usarlo al final del app.js:

js

const errorHandler = require("./middlewares/errorHandler");
app.use(errorHandler);
✅ 5. Mostrar mensaje claro de conexión a MongoDB
js

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error al conectar:", err));
✅ 6. (Opcional) Agregar validaciones o autenticación
Usar express-validator para validar campos en req.body

Usar jsonwebtoken para proteger rutas con autenticación








