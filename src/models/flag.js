const mongoose = require('mongoose');

const flagSchema = new mongoose.Schema({
  content: { type: String, required: true },
  desID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Description' },
});

const Flag = mongoose.model('Flag', flagSchema);

module.exports = Flag;
