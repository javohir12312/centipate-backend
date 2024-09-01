const Description = require('../models/desc')

const createDescription = async (req, res) => {
  try {
    if (!req.body.content) {
      return res.status(400).json({ message: "Content is required" });
    }

    const newDescription = new Description({ content: req.body.content });
    await newDescription.save();
    res.status(201).json(newDescription);
  } catch (error) {
    console.error("Error creating description:", error); 
    res.status(500).json({ message: "Error creating description", error });
  }
};

module.exports = { createDescription };
