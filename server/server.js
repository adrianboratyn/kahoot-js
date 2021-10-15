require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

app.use(express.json());

const userRouter = require("./routes/user")
app.use('/users', userRouter)

const quizRouter = require("./routes/quiz");
app.use("/quizes", quizRouter);

const gameRouter = require("./routes/game");
app.use("/games", gameRouter);

const playerResultRouter = require('./routes/playerResult')
app.use('/playerResults', playerResultRouter)

app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);
