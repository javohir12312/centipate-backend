const Description = require("../models/desc");

module.exports.deleteDescription = async (req, res) => {
  try {
    await Description.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting description", error });
  }
};
