const mongoose = require("mongoose")

const groupResultSchema = new mongoose.Schema({
  playerResultList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PlayerResult",
    },
  ],
  gameId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Game",
  },
});

module.exports = mongoose.model("GroupResult", groupResultSchema)