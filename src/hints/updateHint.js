const Hint = require("../models/hint");

module.exports.updateHint = async (req, res) => {
  try {
    const updatedHint = await Hint.findByIdAndUpdate(
      req.params.id,
      { content: req.body.content, desID:req.body.desID},
      { new: true }
    );
    res.status(200).json(updatedHint);
  } catch (error) {
    res.status(500).json({ message: "Error updating hint", error });
  }
};
