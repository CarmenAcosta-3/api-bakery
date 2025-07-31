const express = require("express");
const router = express.Router();
const {
  enviarConfirmacion,
  obtenerConfirmaciones,
  reintentarEnvio,
  eliminarConfirmacion,
} = require("../controllers/emailController");

router.post("/enviar-confirmacion", enviarConfirmacion);
router.get("/confirmaciones", obtenerConfirmaciones);
router.post("/reintentar/:id", reintentarEnvio);
router.delete("/:id", eliminarConfirmacion);

module.exports = router;
