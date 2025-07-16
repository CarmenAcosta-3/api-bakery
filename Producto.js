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
});

// Exportar el modelo para usarlo en otras partes del proyecto
module.exports = mongoose.model("Producto", productoSchema);
