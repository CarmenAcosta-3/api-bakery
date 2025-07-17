const mongoose = require("mongoose");

// Definición del esquema del producto
const productoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
  ingredientes: {
    type: String,
    required: true,
  },
  alergenos: {
    type: String,
    required: true,
  },
  especialSemanal: {
    type: String,
  },
  temporal1: {
    type: String,
  },
  temporal2: {
    type: String,
  },
  temporal3: {
    type: String,
  },
  temporal4: {
    type: String,
  },
});

// Exportar el modelo para usarlo en otras partes del proyecto
module.exports = mongoose.model("Producto", productoSchema);
