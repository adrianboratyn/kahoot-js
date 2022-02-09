import React from "react"
import { useDispatch } from "react-redux"
import styles from "./myQuiz.module.css"
import { deleteQuiz } from "../../../actions/quiz"
import moment from "moment"
import DeleteIcon from "@material-ui/icons/Delete"
import MoreHorizIcon from "@material-ui/icons/MoreHoriz"
import { useHistory } from "react-router-dom"

function MyQuiz({ quiz }) {
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem("profile"))
  const history = useHistory()

  const openQuizPage = (e) => {
    history.push(`/quizes/${quiz._id}`)
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
          Pytania: {quiz.numberOfQuestions}
        </h3>
      </div>
      <div className={styles["card-body"]}>
        <div>
          <h4 className={styles["quiz-tags"]}>
            {quiz.tags.map((tag) => `#${tag} `)}
          </h4>
          <div className={styles["card-buttons"]}>
            <button onClick={openQuizPage}>
              <MoreHorizIcon fontSize="default" />
            </button>
            <button onClick={() => dispatch(deleteQuiz(quiz._id))}>
              <DeleteIcon fontSize="small" />
              Usuń
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
