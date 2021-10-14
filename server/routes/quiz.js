const express = require("express");
const router = express.Router();

const {
  createQuiz,
  getQuizes,
  getQuiz,
  updateQuiz,
  deleteQuiz,
  addQuestion,
  getQuestions,
  getQuestion,
  updateQuestion,
  deleteQuestion,
} = require("../controllers/quiz");

router
    .route("/")
    .get(getQuizes)
    .post(createQuiz);

router
    .route("/:id")
    .get(getQuiz)
    .patch(updateQuiz)
    .delete(deleteQuiz);

router
    .route('/:quizId/questions')
    .post(addQuestion)
    .get(getQuestions);

router
    .route('/:quizId/questions/:questionId')
    .get(getQuestion)
    .patch(updateQuestion)
    .delete(deleteQuestion)

module.exports = router;
