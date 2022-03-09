import React from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addAnswer, getPlayerResult } from "../../../actions/playerResult"
import { useEffect } from "react"
import styles from "./playerScreen.module.css"
import Answer from "../Answer/Answer"
import diamond from "../../../assets/diamond.svg"
import triangle from "../../../assets/triangle.svg"
import circle from "../../../assets/circle.svg"
import square from "../../../assets/square.svg"
import { CircularProgress } from "@material-ui/core"

function PlayerScreen() {
  const socket = useSelector((state) => state.socket.socket)
  const isLanguageEnglish = useSelector((state) => state.language.isEnglish)
  const dispatch = useDispatch()
  const { playerResult } = useSelector((state) => state.playerResults)
  const [result, setResult] = useState(playerResult?.answers[0])

  const [isQuestionAnswered, setIsQuestionAnswered] = useState(false)
  const [isPreviewScreen, setIsPreviewScreen] = useState(false)
  const [isQuestionScreen, setIsQuestionScreen] = useState(false)
  const [isResultScreen, setIsResultScreen] = useState(false)
  const [timer, setTimer] = useState(0)
  const [answerTime, setAnswerTime] = useState(0)
  const [questionData, setQuestionData] = useState()
  const [correctAnswerCount, setCorrectAnswerCount] = useState(1)

  const [answer, setAnswer] = useState({
    questionIndex: 0,
    answers: [],
    time: 0,
  })

  useEffect(() => {
    setTimer(5)
  }, [])

  useEffect(() => {
    socket.on("host-start-preview", () => {
      setIsPreviewScreen(true)
      setIsResultScreen(false)
      startPreviewCountdown(5)
    })
    socket.on("host-start-question-timer", (time, question) => {
      setQuestionData(question.answerList)
      startQuestionCountdown(time)
      setAnswer((prevstate) => ({
        ...prevstate,
        questionIndex: question.questionIndex,
        answers: [],
        time: 0,
      }))
      setCorrectAnswerCount(question.correctAnswersCount)
    })
  }, [socket])

  const startPreviewCountdown = (seconds) => {
    let time = seconds
    let interval = setInterval(() => {
      setTimer(time)
      if (time === 0) {
        clearInterval(interval)
        setIsPreviewScreen(false)
        setIsQuestionScreen(true)
      }
      time--
    }, 1000)
  }

  const startQuestionCountdown = (seconds) => {
    let time = seconds
    let answerSeconds = 0
    let interval = setInterval(() => {
      setTimer(time)
      setAnswerTime(answerSeconds)
      if (time === 0) {
        clearInterval(interval)
        setIsQuestionScreen(false)
        setIsQuestionAnswered(false)
        setIsResultScreen(true)
      }
      time--
      answerSeconds++
    }, 1000)
  }

  const sendAnswer = async () => {
    const updatedPlayerResult = await dispatch(
      addAnswer(answer, playerResult._id)
    )
    console.log(
      updatedPlayerResult.answers[updatedPlayerResult.answers.length - 1]
    )
    setResult(
      updatedPlayerResult.answers[updatedPlayerResult.answers.length - 1]
    )
    let data = {
      questionIndex: answer.questionIndex,
      playerId: updatedPlayerResult.playerId,
      playerPoints:
        updatedPlayerResult.answers[answer.questionIndex - 1].points,
    }
    let score = updatedPlayerResult.score
    socket.emit("send-answer-to-host", data, score)
    dispatch(getPlayerResult(playerResult._id))
  }

  const checkAnswer = (name) => {
    let answerIndex = answer.answers.findIndex((obj) => obj === name)
    if (answer.answers.includes(name)) {
      //remove answer
      setAnswer((prevstate) => ({
        ...prevstate,
        answers: [
          ...prevstate.answers.slice(0, answerIndex),
          ...prevstate.answers.slice(answerIndex + 1, prevstate.answers.length),
        ],
      }))
    } else {
      //add answer
      setAnswer((prevstate) => ({
        ...prevstate,
        answers: [...prevstate.answers, name],
      }))
    }
    setAnswer((prevstate) => ({
      ...prevstate,
      time: answerTime,
    }))
  }

  useEffect(() => {
    if (
      answer?.answers.length > 0 &&
      answer?.answers.length === correctAnswerCount
    ) {
      setIsQuestionScreen(false)
      setIsQuestionAnswered(true)
      sendAnswer()
    } else {
      setIsQuestionAnswered(false)
    }
  }, [answer?.answers.length, correctAnswerCount, answer, socket])

  return (
    <div className={styles.page}>
      {isPreviewScreen && (
        <div className={styles["question-preview"]}>
          <h1>{timer}</h1>
        </div>
      )}
      {isQuestionScreen && (
        <div className={styles["question-preview"]}>
          <div className={styles["answers-container"]}>
            <Answer
              icon={triangle}
              showText={false}
              isAnswerClicked={answer.answers.includes("a")}
              onClick={() => checkAnswer("a")}
            />
            <Answer
              icon={diamond}
              showText={false}
              isAnswerClicked={answer.answers.includes("b")}
              onClick={() => checkAnswer("b")}
            />
            {questionData?.length > 2 && (
              <>
                <Answer
                  icon={circle}
                  showText={false}
                  isAnswerClicked={answer.answers.includes("c")}
                  onClick={() => checkAnswer("c")}
                />
                <Answer
                  icon={square}
                  showText={false}
                  isAnswerClicked={answer.answers.includes("d")}
                  onClick={() => checkAnswer("d")}
                />
              </>
            )}
          </div>
        </div>
      )}
      {isQuestionAnswered && (
        <div className={styles["question-preview"]}>
          <h1>{isLanguageEnglish ? "Wait for a result" : "Czekaj na wynik"}</h1>
          <CircularProgress />
        </div>
      )}
      {isResultScreen && (
        <div
          className={styles["question-preview"]}
          style={{ backgroundColor: result.points > 0 ? "green" : "red" }}
        >
          <h1>{isLanguageEnglish ? "Result" : "Wynik"}</h1>
          <h3>
            {result.points > 0
              ? isLanguageEnglish
                ? "Correct"
                : "Dobrze"
              : isLanguageEnglish
              ? "Wrong"
              : "Źle"}
          </h3>
          <h3>
            {isLanguageEnglish ? "Points: " : "Punkty: "} {result.points}
          </h3>
        </div>
      )}
    </div>
  )
}

export default PlayerScreen
