const mongoose = require("mongoose");

const gameStatisticsSchema = new mongoose.Schema({
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
  averageTimePerQuestion: {
    type: Number,
  },
  averagePointsPerQuestion: {
    type: Number,
  },
  percentageScoreValue: {
    type: Number,
  },
  groupAverageScore: {
    type: Number,
  },
  groupAveragePercentageScore: {
    type: Number,
  },
  hardestQuestionPoints: {
    type: Number,
  },
  easiestQuestionPoints: {
    type: Number,
  },
  hardestQuestionTime: {
    type: Number,
  },
  easiestQuestionTime: {
    type: Number,
  },
});

module.exports = mongoose.model("GameStatistics", gameStatisticsSchema);
