const NewsLetters = require("../models/newsletters");

const crearNewsLetter = async (req, res) => {
  const { nombre, email } = req.body;

  try {
    const nueva = new NewsLetters({ nombre, email });
    await nueva.save();
    res.status(201).json(nueva);
  } catch (error) {
    res.status(500).json({
      error: "Error al registrar el newsletter",
      detalle: error.message,
    });
  }
};

const obtenerNewsLetters = async (req, res) => {
  try {
    const newsletters = await NewsLetters.find();
    res.json(newsletters);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener las newsletters",
      detalle: error.message,
    });
  }
};

module.exports = {
  crearNewsLetter,
  obtenerNewsLetters,
};
