import nodemailer from "nodemailer";

// Reemplaza estos datos por los reales
const EMAIL_USER = "dummiebakery@gmail.com";
const EMAIL_PASS = "Menchu2025";

const transporter = nodemailer.createTransport({
  service: "hotmail", // Cambia a "gmail" si usas Gmail
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

transporter.sendMail(
  {
    from: EMAIL_USER,
    to: EMAIL_USER, // Puedes probar enviándotelo a ti mismo
    subject: "Prueba desde script",
    text: "Este es un correo de prueba usando nodemailer desde un script local",
  },
  (error, info) => {
    if (error) {
      return console.error("Error al enviar:", error);
    }
    console.log("Correo enviado:", info.response);
  }
);
