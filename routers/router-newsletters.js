const express = require("express");
const router = express.Router();
const {
  crearNewsLetter,
  obtenerNewsLetters,
} = require("../controllers/controller-newsletters");

router.post("/", crearNewsLetter);
router.get("/", obtenerNewsLetters);

module.exports = router;
