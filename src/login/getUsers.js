const User = require("../models/user");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    const userData = users.map(({ _id, name, email,solvedFlagsDetails}) => ({
      id: _id,
      name,
      email,
      solvedFlagsDetails,
    }));

    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users", error });
  }
};

module.exports = getUsers;
