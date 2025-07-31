const express = require("express");
const router = express.Router();
const {
  crearNewsLetter,
  obtenerNewsLetters,
} = require("../controllers/newsletterController");

router.post("/", crearNewsLetter);
router.get("/", obtenerNewsLetters);

module.exports = router;
