const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  number: { type: String, required: true },
  resetToken: { type: String },
  resetTokenExpiration: { type: Date },
  solvedFlags: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  solvedFlagsDetails: [{ 
    desID: { type: mongoose.Schema.Types.ObjectId, ref: 'Description' },
    flags: [{ type: String }],
    submissionTime: { type: Date } // Change to an array if you want to store multiple times
  }]
});


module.exports = mongoose.model("User", userSchema);
