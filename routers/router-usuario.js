const express = require("express");
const router = express.Router();
const User = require("../models/usuario.js");

// Obtener todos los usuarios
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Obtener un usuario por ID
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
  res.json(user);
});

// Crear usuario nuevo
router.post("/", async (req, res) => {
  try {
    const { name, avatar, email, password, repeatPassword, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email ya registrado" });

    const newUser = new User({
      name,
      avatar,
      email,
      password,
      repeatPassword,
      role,
    });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error al crear usuario", error });
  }
});

// Editar usuario
router.put("/:id", async (req, res) => {
  console.log("BODY RECIBIDO", req.body);

  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updatedUser);
});

// Eliminar usuario
router.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "Usuario eliminado correctamente" });
});

module.exports = router;
