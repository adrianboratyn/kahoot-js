import React from "react"
import { useDispatch, useSelector } from "react-redux"
import styles from "./myQuiz.module.css"
import { deleteQuiz } from "../../../actions/quiz"
import { createGame } from "../../../actions/game"
import moment from "moment"
import DeleteIcon from "@material-ui/icons/Delete"
import MoreHorizIcon from "@material-ui/icons/MoreHoriz"
import { useHistory } from "react-router-dom"

function MyQuiz({ quiz }) {
  const dispatch = useDispatch()
  const history = useHistory()
  const isLanguageEnglish = useSelector((state) => state.language.isEnglish)
  const socket = useSelector((state) => state.socket.socket)
  const openQuizPage = (e) => {
    history.push(`/myquizes/${quiz._id}`)
  }

  const addGame = async () => {
    let gameData = {
      quizId: quiz._id,
      isLive: true,
      pin: String(Math.floor(Math.random() * 9000) + 1000),
    }
    const newGame = await dispatch(createGame(gameData, history))
    socket.emit("init-game", newGame) 
  }

  return (
    <div className={styles["quiz-card"]}>
      <div className={styles["image-container"]}>
        <h3 className={styles["quiz-creator"]}>{quiz.creatorName}</h3>
        <h3 className={styles["quiz-date"]}>
          {moment(quiz.dateCreated).fromNow()}
        </h3>
        <div
          className={styles["quiz-image"]}
          style={{ backgroundImage: "url('" + quiz.backgroundImage + "')" }}
        ></div>
        <h3 className={styles["quiz-question-number"]}>
          {isLanguageEnglish ? "Questions:" : "Pytania:"}{" "}
          {quiz.numberOfQuestions}
        </h3>
      </div>
      <div className={styles["card-body"]}>
        <div>
          <h4 className={styles["quiz-tags"]}>
            {quiz.tags.map((tag) => `#${tag} `)}
          </h4>
          <div className={styles["card-buttons"]}>
            <button onClick={addGame}>Start a game</button>
            <button onClick={openQuizPage}>
              <MoreHorizIcon fontSize="medium" />
            </button>
            <button onClick={() => dispatch(deleteQuiz(quiz._id))}>
              <DeleteIcon fontSize="small" />
              {isLanguageEnglish ? "Delete" : "Usuń"}
            </button>
          </div>
        </div>
        <h2 className={styles["quiz-title"]}>{quiz.name}</h2>
        <p className={styles["quiz-description"]}>{quiz.description}</p>
      </div>
    </div>
  )
}

export default MyQuiz
