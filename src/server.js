const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { getDescriptions } = require("./descriptions/getDes");
const { createDescription } = require("./descriptions/postDes");
const { updateDescription } = require("./descriptions/UpdateDes");
const { deleteDescription } = require("./descriptions/DelDes");
const getFlag = require("./flags/getFlag");
const { createFlag } = require("./flags/postFlag");
const { updateFlag } = require("./flags/updateFlag");
const { deleteFlag } = require("./flags/deleteFlag");
const { getHints } = require("./hints/getHint");
const { createHint } = require("./hints/postHint");
const { updateHint } = require("./hints/updateHint");
const { deleteHint } = require("./hints/deleteHint");
const { checkPost } = require("./check_flag/checkPost");
const createUser = require("./login/createUser");
const deleteUser = require("./login/deleteUser");
const getUsers = require("./login/getUsers");
const updateUser = require("./login/updateUser");
const login = require("./login/login");
const user = require("./models/user");
const { getUserById } = require("./login/getUserById");

const app = express();
const PORT = 5000;


const corsOptions = {
  origin: 'http://192.168.0.59:3000', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  credentials: true,  
  optionsSuccessStatus: 200 
};
app.use(cors({ origin: '*' })); 


app.use(express.json());

mongoose.connect("mongodb+srv://abduxalilovjavohir393:1984god123@cluster0.2m3dx2b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Routes
app.get("/api/descriptions", getDescriptions);
app.post("/api/descriptions", createDescription);
app.put("/api/descriptions/:id", updateDescription);
app.delete("/api/descriptions/:id", deleteDescription);

app.get("/api/flags/", getFlag)
app.post("/api/flags/", createFlag)
app.put("/api/flags/:id", updateFlag)
app.delete("/api/flags/:id", deleteFlag)

app.get("/api/hints/", getHints)
app.post("/api/hints/", createHint)
app.put("/api/hints/:id", updateHint)
app.delete("/api/hints/:id", deleteHint)

app.post("/api/check/", checkPost)

app.post("/api/register", createUser);
app.delete("/api/users/:id", deleteUser);
app.get("/api/users", getUsers);
app.put("/api/users/:id", updateUser);
app.post("/api/login", login); 
app.get("/api/users/:id", getUserById);

app.get("/api/user/stats", async (req, res) => {
  try {
    const users = await user.find(); 

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found." });
    }

    const rankedUsers = users
      .map((user) => {
        const submissionTimes = user.solvedFlagsDetails.map(entry => entry.submissionTime);
        const latestSubmissionTime = submissionTimes.length > 0
          ? Math.max(...submissionTimes.map(time => new Date(time))) 
          : new Date(0);

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          solvedFlags: user.solvedFlagsDetails.length,
          latestSubmissionTime, 
          lastSubmissionTime: submissionTimes.length > 0 ? new Date(latestSubmissionTime).toISOString() : null, 
          rating: user.rating || 0 
        };
      })
      .sort((a, b) => {
        if (b.solvedFlags === a.solvedFlags) {
          return a.latestSubmissionTime - b.latestSubmissionTime; 
        }
        return b.solvedFlags - a.solvedFlags; 
      })
      .map((user, index) => ({
        rank: index + 1, 
        name: user.name,
        email: user.email,
        solvedFlags: user.solvedFlags,
        lastSubmissionTime: user.lastSubmissionTime, 
        rating: user.rating 
      }));

    res.status(200).json(rankedUsers); 
  } catch (error) {
    console.error("Error fetching user stats:", error);
    res.status(500).json({ message: "Error fetching user stats", error: error.message });
  }
});


app.options('*', (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://192.168.0.59:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.sendStatus(200);
});



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
