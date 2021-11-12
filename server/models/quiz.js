const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  backgroundImage: { type: String },
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  pointsPerQuestion: {
    type: Number,
    min: 1,
  },
  numberOfQuestions: {
    type: Number,
    default: 0,
  },
  questionList: [
    {
      questionType: {
        type: String,
        enum: ["True/False", "Quiz"],
        //timeline, grupowanie, kolejność
        required: true,
      },
      pointType: {
        type: String,
        enum: ["Standard", "Double", "BasedOnTime"],
        required: true,
      },
      answerTime: {
        type: Number,
        min: 5,
        max: 15,
      },
      backgroundImage: { type: String },
      question: {
        type: String,
        required: true,
      },
      answerList: [
        {
          name: { type: String },
          body: { type: String },
        },
      ],
      correctAnswersList: [
        {
          name: { type: String },
          body: { type: String },
        },
      ],
      // answerList: [
      //   {
      //     name: { type: String },
      //     content: { type: String },
      //   },
      // ],
      // correctAnswer: [
      //   {
      //     name: { type: String },
      //     content: { type: String },
      //   },
      // ],
    },
  ],
});

module.exports = mongoose.model("Quiz", quizSchema);
