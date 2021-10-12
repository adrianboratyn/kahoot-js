const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  hostId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
  },
  playerList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  //raczej niepotrzebne
  //currentQuestion: { type: Integer },
  groupResult: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "GroupResult",
  },
});

module.exports = mongoose.model("Game", gameSchema);
