const nodemailer = require("nodemailer");
const Order = require("../models/orders");
const EmailConfirmacion = require("../models/emailConfirmacion");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const generarHtmlProductos = (productos) =>
  productos
    .map(
      (prod) => `
      <tr>
        <td style="border: 1px solid #ddd; padding: 10px;">
          <img src="${prod.url || ""}" alt="${prod.nombre}" width="80" />
        </td>
        <td style="border: 1px solid #ddd; padding: 10px;">${prod.nombre}</td>
        <td style="border: 1px solid #ddd; padding: 10px;">${
          prod.size || "N/A"
        }</td>
        <td style="border: 1px solid #ddd; padding: 10px;">${prod.quantity}</td>
        <td style="border: 1px solid #ddd; padding: 10px;">${prod.precio}€</td>
      </tr>
    `
    )
    .join("");

const generarHtmlCorreo = (order) => `
  <div style="font-family: Arial, sans-serif; padding: 20px;">
    <h2>¡Gracias por tu compra!</h2>
    <p>Estos son los detalles de tu pedido:</p>
    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr style="background-color: #f0f0f0;">
          <th style="padding: 10px; border: 1px solid #ddd;">Imagen</th>
          <th style="padding: 10px; border: 1px solid #ddd;">Producto</th>
          <th style="padding: 10px; border: 1px solid #ddd;">Talla</th>
          <th style="padding: 10px; border: 1px solid #ddd;">Cantidad</th>
          <th style="padding: 10px; border: 1px solid #ddd;">Precio</th>
        </tr>
      </thead>
      <tbody>
        ${generarHtmlProductos(order.productos)}
      </tbody>
    </table>
    <p style="margin-top: 20px;"><strong>Total:</strong> ${order.total}€</p>
    <p><strong>Fecha del pedido:</strong> ${new Date(
      order.fechaCreacion
    ).toLocaleString()}</p>
    <p><strong>Correo de contacto:</strong> ${order.email}</p>
    <hr style="margin: 30px 0;" />
    <p style="color: #888;">Este correo es automático, no respondas. Si necesitas ayuda, contáctanos desde la web.</p>
  </div>
`;

const generarHtmlActualizacion = (order) => `
  <div style="font-family: Arial, sans-serif; padding: 20px;">
    <h2>Actualización de tu pedido</h2>
    <p>El estado de tu pedido ha cambiado a: 
      <strong style="color: #ffa726;">${order.status}</strong>
    </p>
    <p>Estos son los detalles actuales del pedido:</p>
    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr style="background-color: #f0f0f0;">
          <th style="padding: 10px; border: 1px solid #ddd;">Imagen</th>
          <th style="padding: 10px; border: 1px solid #ddd;">Producto</th>
          <th style="padding: 10px; border: 1px solid #ddd;">Talla</th>
          <th style="padding: 10px; border: 1px solid #ddd;">Cantidad</th>
          <th style="padding: 10px; border: 1px solid #ddd;">Precio</th>
        </tr>
      </thead>
      <tbody>
        ${generarHtmlProductos(order.productos)}
      </tbody>
    </table>
    <p style="margin-top: 20px;"><strong>Total:</strong> ${order.total}€</p>
    <p><strong>Correo de contacto:</strong> ${order.email}</p>
    <p><strong>ID del pedido:</strong> ${order._id}</p>
    <hr style="margin: 30px 0;" />
    <p style="color: #888;">Este correo es automático, no respondas. Si necesitas ayuda, contáctanos desde la web.</p>
  </div>
`;

const enviarConfirmacion = async (req, res) => {
  const { orderId, email } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ error: "Pedido no encontrado" });

    if (!order.email) {
      order.email = email;
      await order.save();
    }

    const mailOptions = {
      from: `"Tu Tienda" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Confirmación de tu pedido`,
      html: generarHtmlCorreo(order),
    };

    await transporter.sendMail(mailOptions);
    await EmailConfirmacion.create({ orderId, email, enviado: true });

    res
      .status(200)
      .json({ message: "Correo enviado y registrado correctamente" });
  } catch (error) {
    console.error("Error enviando el correo:", error);

    await EmailConfirmacion.create({
      orderId,
      email,
      enviado: false,
      error: error.message,
    });

    res.status(500).json({ error: "No se pudo enviar el correo" });
  }
};

const obtenerConfirmaciones = async (req, res) => {
  try {
    const confirmaciones = await EmailConfirmacion.find()
      .populate("orderId", "total productos categoria")
      .sort({ fechaEnvio: -1 });

    res.status(200).json(confirmaciones);
  } catch (error) {
    console.error("Error obteniendo confirmaciones:", error);
    res.status(500).json({ error: "Error al obtener los correos enviados" });
  }
};

const reintentarEnvio = async (req, res) => {
  const confirmacionId = req.params.id;

  try {
    const confirmacion = await EmailConfirmacion.findById(confirmacionId);
    if (!confirmacion)
      return res.status(404).json({ error: "Registro no encontrado" });

    const order = await Order.findById(confirmacion.orderId);
    if (!order) return res.status(404).json({ error: "Pedido no encontrado" });

    const mailOptions = {
      from: `"Tu Tienda" <${process.env.EMAIL_USER}>`,
      to: confirmacion.email,
      subject: "Reenvío de confirmación de pedido",
      html: generarHtmlCorreo(order),
    };

    await transporter.sendMail(mailOptions);

    confirmacion.enviado = true;
    confirmacion.fechaEnvio = new Date();
    confirmacion.error = null;
    await confirmacion.save();

    res.status(200).json({ message: "Correo reenviado con éxito" });
  } catch (error) {
    console.error("Error reenviando email:", error);
    res.status(500).json({ error: "No se pudo reenviar el correo" });
  }
};

const eliminarConfirmacion = async (req, res) => {
  try {
    const deleted = await EmailConfirmacion.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ error: "Confirmación no encontrada" });

    res.json({ message: "Confirmación eliminada correctamente" });
  } catch (error) {
    console.error("Error eliminando confirmación:", error);
    res.status(500).json({ error: "Error al eliminar la confirmación" });
  }
};

const enviarActualizacionEstado = async (orderId) => {
  const order = await Order.findById(orderId);
  if (!order || !order.email) throw new Error("Pedido sin email");

  const html = generarHtmlActualizacion(order);

  const mailOptions = {
    from: `"Tu Tienda" <${process.env.EMAIL_USER}>`,
    to: order.email,
    subject: `Actualización: tu pedido está ahora "${order.status}"`,
    html,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  enviarConfirmacion,
  obtenerConfirmaciones,
  reintentarEnvio,
  eliminarConfirmacion,
  enviarActualizacionEstado,
};
