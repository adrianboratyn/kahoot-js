const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  name: { type: String, required: true },
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  questionType: {
    type: String,
    enum: ["True/False", "Multiple-choice", "Open"],
    required: true,
  },
  pointType: {
    type: String,
    enum: ["Standard", "Double", "BasedOnTime"],
    required: true,
  },
  points: { type: Number },
  answerTime: { type: Number },
  numberOfQuestions: { type: Number },
  questionList: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
  },
});

module.exports = mongoose.model("Quiz", quizSchema);
