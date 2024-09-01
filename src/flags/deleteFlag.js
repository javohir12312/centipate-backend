const Flag = require("../models/flag");

module.exports.deleteFlag = async (req, res) => {
  try {
    await Flag.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting flag", error });
  }
};
