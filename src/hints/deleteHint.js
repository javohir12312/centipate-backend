const Hint = require("../models/hint");

module.exports.deleteHint = async (req, res) => {
  try {
    await Hint.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting hint", error });
  }
};
