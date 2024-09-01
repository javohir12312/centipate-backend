const Hint = require("../models/hint");

module.exports.createHint = async (req, res) => {
  try {
    const newHint = new Hint({ content: req.body.content , desID:req.body.desID});
    await newHint.save();
    res.status(201).json(newHint);
  } catch (error) {
    res.status(500).json({ message: "Error creating hint", error });
  }
};
