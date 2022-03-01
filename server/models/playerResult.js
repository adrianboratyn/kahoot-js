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
      answers: [ String
        // {
        //   name: { type: String },
        //   body: { type: String },
        // },
      ],
      // correctAnswers: [
      //   {
      //     name: { type: String },
      //     body: { type: String },
      //   },
      // ],
      time: { type: Number },
      points: {
        type: Number,
        default: 0,
      },
    },
  ],
});

module.exports = mongoose.model("PlayerResult", playerResultSchema);
