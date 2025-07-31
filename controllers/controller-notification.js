const Notification = require("../models/notification");

const obtenerNotificacionesPorUsuario = async (req, res) => {
  try {
    const notifications = await Notification.find({
      userId: req.params.userId,
    }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    console.error("Error obteniendo notificaciones:", err);
    res.status(500).json({ error: "Error al obtener notificaciones" });
  }
};

module.exports = {
  obtenerNotificacionesPorUsuario,
};
