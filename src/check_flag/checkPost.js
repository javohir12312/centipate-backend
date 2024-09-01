const Flag = require("../models/flag");
const User = require("../models/user");

module.exports.checkPost = async (req, res) => {
  const { flag, desID, userID } = req.body;

  try {
    const [user, flagEntry] = await Promise.all([
      User.findById(userID),
      Flag.findOne({ content: flag, desID })
    ]);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const solvedEntry = user.solvedFlagsDetails.find(entry => entry.desID.toString() === desID);
    
    if (solvedEntry && solvedEntry.flags.includes(flag)) {
      return res.status(200).json({ valid: false, message: "Flag already submitted" });
    }

    if (flagEntry) {
      const submissionTime = new Date();

      const updateOperations = solvedEntry
        ? {
            $addToSet: { 
              'solvedFlagsDetails.$[entry].flags': flag,
            },
            $set: {
              'solvedFlagsDetails.$[entry].submissionTime': submissionTime
            }
          }
        : {
            $push: { 
              solvedFlagsDetails: { 
                desID: desID, 
                flags: [flag],
                submissionTime: submissionTime
              } 
            }
          };

      await User.findByIdAndUpdate(userID, updateOperations, {
        arrayFilters: solvedEntry ? [{ 'entry.desID': desID }] : undefined
      });

      await User.findByIdAndUpdate(userID, { 
        $inc: { 
          solvedFlags: 1,
          rating: 10  
        }
      });

      return res.status(200).json({ valid: true });
    } else {
      return res.status(200).json({ valid: false, message: "Flag not valid" });
    }
  } catch (error) {
    console.error("Error validating flag:", error);
    return res.status(500).json({ message: "Error validating flag", error: error.message });
  }
};
