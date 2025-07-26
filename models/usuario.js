const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    repeatPassword: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "cliente", // o lo que uses por defecto
    },
  },
  {
    timestamps: true, // añade createdAt y updatedAt automáticamente
  }
);

module.exports = mongoose.model("User", userSchema);
