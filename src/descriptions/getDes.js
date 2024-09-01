const Description = require("../models/desc");

const getDescriptions = async (req, res) => {
  try {
    const descriptions = await Description.find();
    res.status(200).json(descriptions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching descriptions", error });
  }
};

module.exports = { getDescriptions };
