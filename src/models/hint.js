const mongoose = require("mongoose");

const hintSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  desID:{
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Hint", hintSchema);
