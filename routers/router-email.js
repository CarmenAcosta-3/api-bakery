// routes/email.js

const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Order = require("../models/orders");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/enviar-confirmacion", async (req, res) => {
  const { orderId, email } = req.body;

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: "Pedido no encontrado" });
    }

    if (!order.email) {
      order.email = email;
      await order.save();
    }

    const productosHtml = order.productos
      .map(
        (prod) => `
        <tr>
          <td style="border: 1px solid #ddd; padding: 10px;">
            <img src="${prod.url || ""}" alt="${
          prod.nombre
        }" width="80" style="object-fit: cover;" />
          </td>
          <td style="border: 1px solid #ddd; padding: 10px;">${prod.nombre}</td>
          <td style="border: 1px solid #ddd; padding: 10px;">${
            prod.size || "N/A"
          }</td>
          <td style="border: 1px solid #ddd; padding: 10px;">${
            prod.quantity
          }</td>
          <td style="border: 1px solid #ddd; padding: 10px;">${
            prod.precio
          }€</td>
        </tr>
      `
      )
      .join("");

    const mailOptions = {
      from: `"Tu Tienda" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Confirmación de tu pedido`,
      html: `
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
            ${productosHtml}
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
    `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Correo enviado correctamente" });
  } catch (error) {
    console.error("Error enviando el correo:", error);
    res.status(500).json({ error: "No se pudo enviar el correo" });
  }
});

module.exports = router;
