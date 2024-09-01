const User = require("../models/user");

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, name,number } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, { email, name,number }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};

module.exports = updateUser;
