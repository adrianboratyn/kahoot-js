const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: {type: String},
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  pointType: {
    type: String,
    enum: ["Standard", "Double", "BasedOnTime"],
    required: true,
  },
  pointsPerQuestion: { 
    type: Number,
    min: 1,
  },
  answerTime: { 
    type: Number,
    min: 5,
    max: 15,
  },
  numberOfQuestions: { 
    type: Number,
    default: 0, 
  },
  questionList: [
    {
      questionType: {
        type: String,
        enum: ["True/False", "Multiple-choice", "Open"],
        required: true,
      },
      question: {
        type: String,
        required: true,
      },
      answerList: [String],
      correctAnswer: { type: Number },
    },
  ],
});

module.exports = mongoose.model("Quiz", quizSchema);
