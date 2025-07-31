const express = require("express");
const router = express.Router();
const {
  obtenerNotificacionesPorUsuario,
} = require("../controllers/controller-notification");

// GET /api/notifications/:userId
router.get("/:userId", obtenerNotificacionesPorUsuario);

module.exports = router;
