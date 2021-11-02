require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const {
  authenticateToken,
  regenerateAccessToken,
} = require("./middleware/auth");

const userRouter = require("./routes/user");
const quizRouter = require("./routes/quiz");
const gameRouter = require("./routes/game");
const playerResultRouter = require("./routes/playerResult");

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

app.use(express.json());
app.use(cors());
app.use(authenticateToken);
app.use(regenerateAccessToken);


app.use("/users", userRouter);
app.use("/quizes", quizRouter);
app.use("/games", gameRouter);
app.use("/playerResults", playerResultRouter);

app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);
