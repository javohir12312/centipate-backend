const Description = require("../models/desc");

module.exports.updateDescription = async (req, res) => {
  try {
    const updatedDescription = await Description.findByIdAndUpdate(
      req.params.id,
      { content: req.body.content },
      { new: true }
    );
    res.status(200).json(updatedDescription);
  } catch (error) {
    res.status(500).json({ message: "Error updating description", error });
  }
};
