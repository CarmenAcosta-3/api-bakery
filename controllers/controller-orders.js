const Order = require("../models/orders");
const Producto = require("../models/Producto");

const crearPedido = async (req, res) => {
  try {
    const { productos, total, categoria, status, user, email } = req.body;

    const productosConImagen = await Promise.all(
      productos.map(async (prod) => {
        const productoBD = await Producto.findOne({ nombre: prod.nombre });
        return {
          ...prod,
          url: productoBD?.url || "",
        };
      })
    );

    const newOrder = new Order({
      productos: productosConImagen,
      total,
      categoria,
      status,
      user,
      email,
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error al crear el pedido:", error);
    res.status(500).json({ message: "Error al crear el pedido" });
  }
};

const obtenerPedidos = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email role");
    res.json(orders);
  } catch (error) {
    console.error("Error al obtener pedidos:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

const obtenerPedidosPorUsuario = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.id }).populate(
      "user",
      "name email role"
    );
    res.json(orders);
  } catch (error) {
    console.error("Error al obtener pedidos:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

const actualizarPedido = async (req, res) => {
  try {
    const { productos, total, categoria, status, user, email } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        productos,
        total,
        categoria,
        status,
        user,
        email,
      },
      { new: true }
    );

    res.json(updatedOrder);
  } catch (error) {
    console.error("Error al actualizar el pedido:", error);
    res.status(500).json({ message: "Error al actualizar el pedido" });
  }
};

const actualizarEstadoPedido = async (req, res) => {
  try {
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }

    res.json(updatedOrder);
  } catch (error) {
    console.error("Error al actualizar estado del pedido:", error);
    res.status(500).json({ message: "Error al actualizar estado del pedido" });
  }
};

const eliminarPedido = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Pedido eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el pedido:", error);
    res.status(500).json({ message: "Error al eliminar el pedido" });
  }
};

module.exports = {
  crearPedido,
  obtenerPedidos,
  obtenerPedidosPorUsuario,
  actualizarPedido,
  actualizarEstadoPedido,
  eliminarPedido,
};
