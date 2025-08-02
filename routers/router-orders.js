const express = require("express");
const router = express.Router();
const {
  crearPedido,
  obtenerPedidos,
  obtenerPedidosPorUsuario,
  actualizarPedido,
  actualizarEstadoPedido,
  eliminarPedido,
} = require("../controllers/controller-orders");

router.post("/", crearPedido);
router.get("/", obtenerPedidos);
router.get("/user", obtenerPedidosPorUsuario);
router.put("/:id", actualizarPedido);
router.patch("/:id", actualizarEstadoPedido);
router.delete("/:id", eliminarPedido);

module.exports = router;
