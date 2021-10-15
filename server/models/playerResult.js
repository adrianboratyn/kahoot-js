const mongoose = require("mongoose");

const playerResultSchema = new mongoose.Schema({
  playerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  gameId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Game",
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
  },
  score: {
    type: Number,
    default: 0,
  },
  answers: [
    {
      questionIndex: { type: Number },
      answered: {
        type: Boolean,
        default: false,
      },
      answerIndex: { type: Number },
      correctAnswerIndex: { type: Number },
      time: { type: Number },
      points: {
        type: Number,
        default: 0,
      },
    },
  ],
});

module.exports = mongoose.model("PlayerResult", playerResultSchema);
