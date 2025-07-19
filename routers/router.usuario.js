const express = require("express");
const router = express.Router();
const Usuario = require("../models/usuario");

// Registro de usuario
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existe = await Usuario.findOne({ username });
    if (existe) return res.status(400).json({ error: "El usuario ya existe" });

    const nuevoUsuario = new Usuario({
      username,
      password, // ⚠️ sin encriptar
      role: "user",
    });

    await nuevoUsuario.save();
    res.status(201).json({ mensaje: "Usuario registrado con éxito" });
  } catch (error) {
    res.status(500).json({ error: "Error al registrar", detalle: error });
  }
});

// Login de usuario
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ username });
    if (!usuario)
      return res.status(404).json({ error: "Usuario no encontrado" });

    if (usuario.password !== password)
      return res.status(401).json({ error: "Contraseña incorrecta" });

    res.json({
      mensaje: "Login exitoso",
      usuario: {
        id: usuario._id,
        username: usuario.username,
        role: usuario.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Error al iniciar sesión", detalle: error });
  }
});

module.exports = router;
