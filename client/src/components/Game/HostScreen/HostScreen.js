import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import WaitingRoom from "../WaitingRoom/WaitingRoom"
import { useDispatch, useSelector } from "react-redux"
import { getGame } from "../../../actions/game"
import { getQuiz } from "../../../actions/quiz"
import styles from "./hostScreen.module.css"

function HostScreen() {
  const socket = useSelector((state) => state.socket.socket)
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [isQuestionDisplayed, setIsQuestionDisplayed] = useState(false)
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
    socket.on("question-countdown", () => {
      console.log("hh")
      // startCountdown()
    })

    socket.on("send-question-to-host", (question, time) => {
      setQuestionData(question)
      setIsQuestionDisplayed((prevstate) => !prevstate)
      setCurrentQuestionIndex((prevstate) => prevstate + 1)
      setTimer(time)
      // startCountdown()
    })
  }, [])

  // useEffect(() => {
  //   socket.on("host-start-game", () => {
  //     socket.emit("question-preview", () => {
  //       //startCountdown()
  //     })
  //   })
  // }, [socket])

  useEffect(() => {
    setTimer(5)
  }, [])

  const startGame = () => {
    socket.emit("start-game", quiz)
    socket.emit("question-preview", () => {
      startPreviewCountdown(5)
    })
    setIsGameStarted(prevstate => !prevstate)
    setIsCountdownStarted(prevstate => !prevstate)
  }

  // const showTimer = () => {
  //   console.log("ss")
  //   socket.emit("show-timer")
  //   startCountdown()
  //   // setIsCountdownStarted((prevstate) => !prevstate)
  // }

  const startPreviewCountdown = (seconds) => {
    let time = seconds
    let interval = setInterval(() => {
      setTimer(time)
      if (time === 0) {
        clearInterval(interval)
        let question = quiz.questionList[currentQuestionIndex]
        socket.emit("send-question-to-socket", question)
        setIsCountdownStarted(prevstate => !prevstate)
        displayQuestion(currentQuestionIndex)
        // socket.emit("start-question-timer", () => {
        //   startQuestionCountdown(quiz.questionList[currentQuestionIndex].answerTime)
        // })
      }
      time--
    }, 1000)
  }

  const displayQuestion = (index) => {
    setQuestionData( quiz.questionList[index]
      // questionType: quiz.questionList[index].questionType,
      // pointType: quiz.questionList[index].pointType,
      // answerTime: quiz.questionList[index].answerTime,
      // backgroundImage: quiz.questionList[index].backgroundImage,
      // question: quiz.questionList[index].question,
      // answerList: [
      //   {
      //     name: "a",
      //     body: quiz.questionList[index].answerList[0].body,
      //     isCorrect: quiz.questionList[index].answerList[0].isCorrect,
      //   },
      //   {
      //     body: quiz.questionList[index].answerList[1].body,
      //     isCorrect: quiz.questionList[index].answerList[1].isCorrect,
      //   }
      // ],
      // questionIndex: currentQuestionIndex + 1,
    )
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
            <h3>{questionData.question}</h3>
        </div>
      )}
    
    </div>
  )
}

export default HostScreen
