const mongoose = require("mongoose");

const descSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Description", descSchema);
