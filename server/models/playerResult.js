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
  score: { type: Number },
  answers: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
      answerIndex: { type: Number },
      correctAnswerIndex: { type: Number },
      time: { type: Number },
    },
  ],
  //   answerTimeDict: [
  //     {
  //       questionId: {
  //         type: mongoose.Schema.Types.ObjectId,
  //         ref: "Question",
  //       },
  //       time: { type: Number },
  //     },
  //   ],
});

module.exports = mongoose.model("PlayerResult", playerResultSchema);
