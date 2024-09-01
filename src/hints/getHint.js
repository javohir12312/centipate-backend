const Hint = require("../models/hint");

module.exports.getHints = async (req, res) => {
  try {
    const hints = await Hint.find();
    res.status(200).json(hints);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hints", error });
  }
};
