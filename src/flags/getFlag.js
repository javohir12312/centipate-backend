const Flag = require("../models/flag");

module.exports = getFlags = async (req, res) => {
  try {
    const flags = await Flag.find();
    res.status(200).json(flags);
  } catch (error) {
    res.status(500).json({ message: "Error fetching flags", error });
  }
};
