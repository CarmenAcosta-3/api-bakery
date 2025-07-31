const express = require("express");
const router = express.Router();
const {
  crearPedido,
  obtenerPedidos,
  obtenerPedidosPorUsuario,
  actualizarPedido,
  actualizarEstadoPedido,
  eliminarPedido,
} = require("../controllers/orderController");

router.post("/", crearPedido);
router.get("/", obtenerPedidos);
router.get("/user/:id", obtenerPedidosPorUsuario);
router.put("/:id", actualizarPedido);
router.patch("/:id", actualizarEstadoPedido);
router.delete("/:id", eliminarPedido);

module.exports = router;
