const express = requiere("express");
const router = express.Router();
const NewsLetters = require("../models/newsletters");

router.post("/newsletters", async (req, res) => {
  const { nombre, email } = req.body;
  const newNewsLetter = new NewsLetters({ nombre, email });
  await newNewsLetter.save();
  res.status(201).json(newNewsLetter);
});

router.get("newsletters", async (req, res) => {
  try {
    const newsLetters = await NewsLetters.find();
    res.json(newsLetters);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener las newsletters", detalle: error });
  }
});

module.exports = router;
