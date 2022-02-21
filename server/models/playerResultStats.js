const mongoose = require("mongoose")

const playerResultStatsSchema = new mongoose.Schema({
  gameId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Game",
  },
  playerResult: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PlayerResult",
  },
  playerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  averageTimePerQuestion: {
    type: Number,
  },
  averagePointsPerQuestion: {
    type: Number,
  },
  percentageScoreValue: {
    type: Number,
  },
})

module.exports = mongoose.model("PlayerResultStats", playerResultStatsSchema)
