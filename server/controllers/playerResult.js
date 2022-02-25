const mongoose = require("mongoose")
const PlayerResult = require("../models/playerResult")
const Quiz = require("../models/quiz")

const createPlayerResult = async (req, res) => {
  const { playerId, gameId, score, answers } = req.body
  const playerResult = new PlayerResult({
    playerId,
    gameId,
    score,
    answers
  })

  try {
    const newPlayerResult = await playerResult.save()
    res.status(201).json(newPlayerResult)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const getPlayerResults = async (req, res) => {
  try {
    const playerResults = await PlayerResult.find()
    res.status(200).send(playerResults)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getPlayerResult = async (req, res) => {
  let playerResult
  try {
    playerResult = await PlayerResult.findById(req.params.id)
    if (playerResult == null) {
      return res.status(404).json({ message: "Player Result not found" })
    }
    res.json(playerResult)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deletePlayerResult = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No PlayerResult with id: ${id}`)
  }

  try {
    await PlayerResult.findByIdAndRemove(id)
    res.json({ message: "Player Result deleted succesfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updatePlayerResult = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No PlayerResult with id: ${id}`)
  }

  const { playerId, gameId, score } = req.body
  const playerResult = new PlayerResult({
    _id: id,
    playerId,
    gameId,
    score,
  })

  try {
    const updatedPlayerResult = await PlayerResult.findByIdAndUpdate(
      id,
      playerResult,
      { new: true }
    )
    res.json(updatedPlayerResult)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const addAnswer = async (req, res) => {
  const { playerResultId } = req.params
  const { questionIndex, answered, answers, time } = req.body

  let playerResult
  let quiz
  let correctAnswers
  let pointType
  let answerTime
  let points = 0
  try {
    playerResult = await PlayerResult.findById(playerResultId)
    quiz = await Quiz.findById(playerResult.quizId)
    correctAnswers = quiz.questionList[questionIndex].correctAnswersList
    pointType = quiz.questionList[questionIndex].pointType
    answerTime = quiz.questionList[questionIndex].answerTime
    //posortować answers zeby indeksy szły w tej samej kolejności
    if (answered === true) {
      let a = 0
      for (let i = 0; i < correctAnswers.length; i++) {
        if (
          correctAnswers[i].name === answers[i].name &&
          correctAnswers[i].body === answers[i].body
        ) {
          a++
        }
      }
      if (a === correctAnswers.length) {
        points = calculatePoints(quiz, time, pointType, answerTime)
      }
      // if (answered && answerIndex === correctAnswerIndex) {
      //   points = calculatePoints(quiz, time);
      // }
    }

    playerResult.score += points
    playerResult.answers.push({
      questionIndex,
      answered,
      answers,
      time,
      correctAnswers,
      points,
    })
    const updatedPlayerResult = await playerResult.save()
    res.send(updatedPlayerResult)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const getAnswers = async (req, res) => {
  const { playerResultId } = req.params
  try {
    const playerResult = await PlayerResult.findById(playerResultId)
    if (playerResult == null) {
      return res.status(404).json({ message: "Player Result not found" })
    }
    res.status(200).send(playerResult.answers)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getAnswer = async (req, res) => {
  const { playerResultId, answerId } = req.params
  try {
    const playerResult = await PlayerResult.findById(playerResultId)
    if (playerResult == null) {
      return res.status(404).json({ message: "Player Result not found" })
    }
    const answer = playerResult.answers.id(answerId)
    res.json(answer)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteAnswer = async (req, res) => {
  const { playerResultId, answerId } = req.params
  if (!mongoose.Types.ObjectId.isValid(playerResultId)) {
    return res.status(404).send(`No Player Result with id: ${playerResultId}`)
  }
  if (!mongoose.Types.ObjectId.isValid(answerId)) {
    return res.status(404).send(`No answer with id: ${answerId}`)
  }
  const playerResult = await PlayerResult.findById(playerResultId)

  try {
    let answerIndex = playerResult.answers.findIndex(
      (obj) => obj._id == answerId
    )
    playerResult.answers.splice(answerIndex, 1)
    playerResult.score -= playerResult.answers[answerIndex].points
    await PlayerResult.findByIdAndUpdate(playerResultId, playerResult, {
      new: true,
    })
    res.json({ message: "Answer deleted succesfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateAnswer = async (req, res) => {
  const { playerResultId, answerId } = req.params
  if (!mongoose.Types.ObjectId.isValid(playerResultId)) {
    return res.status(404).send(`No quiz with id: ${playerResultId}`)
  }
  if (!mongoose.Types.ObjectId.isValid(answerId)) {
    return res.status(404).send(`No question with id: ${answerId}`)
  }

  const { questionIndex, answered, answerIndex, time } = req.body
  let playerResult
  let quiz
  let correctAnswerIndex
  let points = 0

  try {
    playerResult = await PlayerResult.findById(playerResultId)
    if (playerResult == null) {
      return res.status(404).json({ message: "Player Result not found" })
    }
    let answerPosition = playerResult.answers.findIndex(
      (obj) => obj._id == answerId
    )
    playerResult.score -= playerResult.answers[answerPosition].points
    quiz = await Quiz.findById(playerResult.quizId)
    correctAnswerIndex = quiz.questionList[questionIndex].correctAnswer
    if (answered && answerIndex === correctAnswerIndex) {
      points = calculatePoints(quiz, time)
    }
    playerResult.score += points
    playerResult.answers[answerPosition] = {
      _id: answerId,
      questionIndex,
      answered,
      answerIndex,
      time,
    }
    const updatedPlayerResult = await PlayerResult.findByIdAndUpdate(
      playerResultId,
      playerResult,
      {
        new: true,
      }
    )
    res.send(updatedPlayerResult)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const calculatePoints = (quiz, time, pointType, answerTime) => {
  //let pointType = quiz.pointType;
  let pointsPerQuestion = quiz.pointsPerQuestion
  //let answerTime = quiz.answerTime;
  if (pointType === "Double") {
    return pointsPerQuestion * 2
  } else if (pointType === "BasedOnTime") {
    return (pointsPerQuestion / answerTime) * (answerTime - time)
  } else {
    return pointsPerQuestion
  }
}

module.exports = {
  createPlayerResult,
  getPlayerResults,
  getPlayerResult,
  deletePlayerResult,
  updatePlayerResult,
  addAnswer,
  getAnswers,
  getAnswer,
  deleteAnswer,
  updateAnswer,
}
