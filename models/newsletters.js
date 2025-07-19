const mongoose = require("mongoose");
const newslettersRoutes = require("./routers/router.newsletters");

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
