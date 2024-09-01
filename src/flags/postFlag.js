const Flag = require("../models/flag");
const User = require("../models/user");

module.exports.createFlag = async (req, res) => {
  try {
    const { content, desID } = req.body; 
    const newFlag = new Flag({ content, desID });

    await newFlag.save();


    res.status(201).json(newFlag);
  } catch (error) {
    res.status(500).json({ message: "Error creating flag", error });
  }
};
