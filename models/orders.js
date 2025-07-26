const mongoose = require("mongoose");

const productShoppingCartSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
  size: {
    type: String,
  },
});

const ordersSchema = new mongoose.Schema({
  productos: {
    type: [productShoppingCartSchema],
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pendiente",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  email: {
    type: String,
    required: true,
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", ordersSchema);
