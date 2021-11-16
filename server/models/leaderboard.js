const mongoose = require("mongoose");

const leaderBoardSchema = new mongoose.Schema({
  gameId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Game",
  },
  playerResultList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PlayerResult",
    },
  ],
  questionLeaderBoard: [
    {
      questionIndex: { type: Number },
      questionResultList: [
        {
          playerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          playerPoints: [{ type: Number }],
        },
      ],
    },
  ],
  currentLeaderboard: [
    {
      playerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      playerCurrentScore: [{ type: Number }],
    },
  ],
});

module.exports = mongoose.model("Leaderboard", leaderBoardSchema);
