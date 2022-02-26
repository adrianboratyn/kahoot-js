import React from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addAnswer } from "../../../actions/playerResult"
import { useEffect } from "react"
import styles from "./playerScreen.module.css"

function PlayerScreen() {
  const socket = useSelector((state) => state.socket.socket)
  // getPlayerResult i zapisać go w zmiennej
  // później przy kazdym wysyłaniu odpowiedzi robić addAnswer
  const { playerResult } = useSelector((state) => state.playerResults)
  // const [gameStarted, setGameStarted] = useState(false)
  const [isGameStarted, setIsGameStarted] = useState(true)
  const [isQuestionDisplayed, setIsQuestionDisplayed] = useState(false)
  const [isCountdownStarted, setIsCountdownStarted] = useState(true)
  const [timer, setTimer] = useState(0)
  const [playerResultData, setPlayerResultData] = useState({
    playerId: "",
    gameId: "",
    quizId: "",
    score: 0,
    answers: [
      {
        questionIndex: 0,
        answered: false,
        answers: [],
        correctAnswers: [],
        time: 0,
        points: 0,
      },
    ],
  })
  const [answer, setAnswer] = useState({
    questionIndex: 0,
    answered: false,
    answers: [],
    time: 0,
    points: 0,
  })

  useEffect(() => {
    setTimer(5)
  }, [])

  useEffect(() => {
    socket.on("host-start-preview", () => {
      startPreviewCountdown(5)
    })
    socket.on("host-start-question-timer", (time) => {
      startQuestionCountdown(time)
    })
  }, [])

  const startPreviewCountdown = (seconds) => {
    let time = seconds
    let interval = setInterval(() => {
      setTimer(time)
      if (time === 0) {
        clearInterval(interval)
        // let question = quiz.questionList[currentQuestionIndex]
        // socket.emit("send-question-to-socket", question)
        setIsCountdownStarted((prevstate) => !prevstate)
        // displayQuestion(currentQuestionIndex)
        // socket.emit("start-question-timer", () => {
        //   startQuestionCountdown(quiz.questionList[currentQuestionIndex].answerTime)
        // })
      }
      time--
    }, 1000)
  }

  const startQuestionCountdown = (seconds) => {
    let time = seconds
    let interval = setInterval(() => {
      setTimer(time)
      if (time === 0) {
        clearInterval(interval)
        // let question = quiz.questionList[currentQuestionIndex]
        // socket.emit("send-question-to-socket", question)
        // displayQuestion(currentQuestionIndex)
        setIsCountdownStarted((prevstate) => !prevstate)
        // socket.emit("question-preview", () => {
        //   startPreviewCountdown(5, index)
        // })
      }
      time--
    }, 1000)
  }
  //moze jeszcze answerCount zeby czas zatrzymac dopiero jak sie odpowie na wszystkie mozliwe
  //i jeszcze info ze kilka poprawnych odpowiedzi

  // po kliknięciu w odp disptach(addAnswer)
  // po odliczeniu czasu tez dispatch ale z answer = false
  // wtedy aktualizować state answer i wysłać go w sockecie
  // zaktualizować tez playerResultData

  return (
    <div className={styles.page}>
      {isGameStarted && isCountdownStarted && (
        <div className={styles["question-preview"]}>
          <h1>{timer}</h1>
        </div>
      )}
      {isGameStarted && !isCountdownStarted && (
        <div className={styles["question-preview"]}>
          <h3>Tu będzie pytanie</h3>
          <h1>{timer}</h1>
        </div>
      )}
    </div>
  )
}

export default PlayerScreen
