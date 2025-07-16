const mongoose = require("mongoose");

// Definición del esquema del producto
const productoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  url: {
    type: String,
    required: false,
  },
  categoria: {
    type: String,
    required: false,
  },
});

// Exportar el modelo para usarlo en otras partes del proyecto
module.exports = mongoose.model("Producto", productoSchema);
