const mongoose = require("mongoose");

const emailConfirmacionSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  email: { type: String, required: true },
  enviado: { type: Boolean, default: false },
  fechaEnvio: { type: Date },
  error: { type: String, default: null },
});

module.exports = mongoose.model("EmailConfirmacion", emailConfirmacionSchema);
