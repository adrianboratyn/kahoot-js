import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import WaitingRoom from "../WaitingRoom/WaitingRoom"
import { useDispatch, useSelector } from "react-redux"
import { getGame } from "../../../actions/game"
import { getQuiz } from "../../../actions/quiz"
import styles from "./hostScreen.module.css"
import Question from "../Question/Question"

function HostScreen() {
  const socket = useSelector((state) => state.socket.socket)
  const [isGameStarted, setIsGameStarted] = useState(false)
  // const [isQuestionDisplayed, setIsQuestionDisplayed] = useState(false)
  const [isCountdownStarted, setIsCountdownStarted] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [timer, setTimer] = useState(0)
  const [gameData, setGameData] = useState({
    isLive: "",
    playerResultList: [],
  })
  const [questionData, setQuestionData] = useState({
    questionType: "Quiz",
    pointType: "Standard",
    answerTime: 5,
    backgroundImage: "",
    question: "",
    answerList: [
      { name: "a", body: "", isCorrect: false },
      { name: "b", body: "", isCorrect: false },
      { name: "c", body: "", isCorrect: false },
      { name: "d", body: "", isCorrect: false },
    ],
    questionIndex: 1,
  })
  const dispatch = useDispatch()
  const { id } = useParams()
  const { game } = useSelector((state) => state.games)
  const { quiz } = useSelector((state) => state.quiz)

  useEffect(() => {
    dispatch(getGame(id))
  }, [id, dispatch])

  useEffect(() => {
    if (game) {
      dispatch(getQuiz(game.quizId))
    }
  }, [dispatch, game])

  useEffect(() => {
    setTimer(5)
  }, [])

  const startGame = () => {
    socket.emit("start-game", quiz)
    socket.emit("question-preview", () => {
      startPreviewCountdown(5, currentQuestionIndex)
    })
    setIsGameStarted((prevstate) => !prevstate)
    setIsCountdownStarted((prevstate) => !prevstate)
  }

  const startPreviewCountdown = (seconds, index) => {
    let time = seconds
    let interval = setInterval(() => {
      setTimer(time)
      if (time === 0) {
        clearInterval(interval)
        let question = quiz.questionList[index]
        socket.emit("send-question-to-socket", question)
        displayQuestion(index)
        setIsCountdownStarted((prevstate) => !prevstate)
        // socket.emit("start-question-timer", () => {
        //   startQuestionCountdown(
        //     quiz.questionList[index].answerTime
        //   )
        // })
      }
      time--
    }, 1000)
  }

  const startQuestionCountdown = (seconds, index) => {
    let time = seconds
    let interval = setInterval(() => {
      setTimer(time)
      if (time === 0) {
        clearInterval(interval)
        // let question = quiz.questionList[currentQuestionIndex]
        // socket.emit("send-question-to-socket", question)
        // displayQuestion(currentQuestionIndex)
        setIsCountdownStarted((prevstate) => !prevstate)
        socket.emit("question-preview", () => {
          startPreviewCountdown(5, index)
        })
      }
      time--
    }, 1000)
  }
  // const displayQuestionResult = () => {}

  // const displayCurrentLeaderBoard = () => {}

  const displayQuestion = (index) => {
    setQuestionData(quiz.questionList[index])
    setCurrentQuestionIndex((prevstate) => prevstate + 1)
    if (index === quiz.questionList.length) {
      socket.emit("show-leaderboard")
    } else {
      let time = quiz.questionList[index].answerTime
      socket.emit("start-question-timer", time, () => {
        startQuestionCountdown(time, index + 1)
      })
    }
  }

  return (
    <div className={styles.page}>
      {!isGameStarted && (
        <div className={styles.lobby}>
          <WaitingRoom pin={game?.pin} socket={socket} />
          <button onClick={startGame}>Start a game</button>
        </div>
      )}

      {isGameStarted && isCountdownStarted && (
        <div className={styles["question-preview"]}>
          <h1>{timer}</h1>
        </div>
      )}
      {isGameStarted && !isCountdownStarted && (
        <div className={styles["question-preview"]}>
          <Question
            key={questionData.questionIndex}
            question={questionData}
            timer={timer}
          />
        </div>
      )}
    </div>
  )
}

export default HostScreen
