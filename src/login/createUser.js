const User = require("../models/user");

const createUser = async (req, res) => {
  const { email, password, name,number } = req.body;

  try {
    const newUser = new User({ email, password, name,number });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

module.exports = createUser;
