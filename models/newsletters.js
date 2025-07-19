const mongoose = require("mongoose");

const newsLettersSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("NewsLetters", newsLettersSchema);
