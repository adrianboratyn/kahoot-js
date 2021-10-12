const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
  },
  answerList: [String],
  correctAnswer: {type: Number},
});

module.exports = mongoose.model("Question", questionSchema)
