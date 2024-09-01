const User = require("../models/user");

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id); 

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json("User exists"); 
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user", error }); 
  }
};

module.exports = { getUserById };
