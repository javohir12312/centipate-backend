const Flag = require("../models/flag");

module.exports.updateFlag = async (req, res) => {
  try {
    const updatedFlag = await Flag.findByIdAndUpdate(
      req.params.id,
      { content: req.body.content , desID: req.body.desID},
      { new: true }
    );
    res.status(200).json(updatedFlag);
  } catch (error) {
    res.status(500).json({ message: "Error updating flag", error });
  }
};
