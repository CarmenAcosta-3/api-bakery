const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  fecha: {
    type: Date,
    required: true,
    default: Date.now,
  },
  contenido: {
    type: String,
    required: true,
  },
  imagen: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Blog", blogSchema);
