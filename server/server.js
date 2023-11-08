require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const { authenticateToken, regenerateAccessToken } = require("./middleware/auth");

const userRouter = require("./routes/user");
const quizRouter = require("./routes/quiz");
const gameRouter = require("./routes/game");
const playerResultRouter = require("./routes/playerResult");
const leaderboardRouter = require("./routes/leaderboard");

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

app.use(express.json({ limit: "5mb" }));
app.use(cors());
// app.use(authenticateToken);
//app.use(regenerateAccessToken);

app.use("/api/users", authenticateToken, userRouter);
app.use("/api/quizes", authenticateToken, quizRouter);
app.use("/api/games", authenticateToken, gameRouter);
app.use("/api/playerResults", authenticateToken, playerResultRouter);
app.use("/api/leaderboard", authenticateToken, leaderboardRouter);

const authRouter = require("./routes/auth");
app.use("/api/auth", authRouter);

app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`));

// socketServer setting below
const io = require("socket.io")(3001, {
  cors: {
    //origin: ["http://localhost:3000", "https://admin.socket.io/#/sockets"],
  },
});

let game;
let leaderboard;
let players = [];

const addPlayer = (userName, socketId) => {
  !players.some((player) => player.socketId === socketId) && players.push({ userName, socketId });
};

const getPlayer = (socketId) => {
  return players.find((player) => player.socketId === socketId);
};

io.on("connection", (socket) => {
  socket.on("disconnect", (reason) => {
    console.log("Socket " + socket.id + " was disconnected");
    console.log(reason);
  });
  socket.on("init-game", (newGame, newLeaderboard) => {
    game = JSON.parse(JSON.stringify(newGame));
    leaderboard = JSON.parse(JSON.stringify(newLeaderboard));
    socket.join(game.pin);
    hostId = socket.id;
    console.log("Host with id " + socket.id + " started game and joined room: " + game.pin);
  });

  socket.on("add-player", (user, socketId, pin, callback) => {
    if (game.pin === pin) {
      addPlayer(user.userName, socketId);
      callback("correct", user._id, game._id);
      socket.join(game.pin);
      console.log("Student " + user.userName + " with id " + socket.id + " joined room " + game.pin);
      let player = getPlayer(socketId);
      io.emit("player-added", player);
    } else {
      callback("wrong", game._id);
    }
  });

  socket.on("start-game", (newQuiz) => {
    quiz = JSON.parse(JSON.stringify(newQuiz));
    console.log("Move players to game");
    console.log(game.pin);
    socket.to(game.pin).emit("move-to-game-page", game._id);
  });

  socket.on("question-preview", (callback) => {
    callback();
    socket.to(game.pin).emit("host-start-preview");
  });

  socket.on("start-question-timer", (time, question, callback) => {
    console.log("Send question " + question.questionIndex + " data to players");
    socket.to(game.pin).emit("host-start-question-timer", time, question);
    callback();
  });

  socket.on("send-answer-to-host", (data, score) => {
    let player = getPlayer(socket.id);
    socket.to(game.pin).emit("get-answer-from-player", data, leaderboard._id, score, player);
  });
});
