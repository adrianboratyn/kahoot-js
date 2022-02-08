import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import styles from "./quiz.module.css"
import { getUsers } from "../../../actions/users"
import { likeQuiz } from "../../../actions/quiz"
import moment from "moment"
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt"

function Quiz({ quiz }) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])
  const [creatorName, setCreatorName] = useState()
  const creator = useSelector((state) =>
    state.users.find((user) => user._id === quiz.creatorId)
  )
  useEffect(() => {
    if (creator) setCreatorName(`${creator.firstName} ${creator.lastName}`)
  }, [creator])
  console.log(quiz._id)
  return (
    <div className={styles["quiz-card"]}>
      <div className={styles["image-container"]}>
        <h3 className={styles["quiz-creator"]}>{creatorName}</h3>
        <h3 className={styles["quiz-date"]}>{moment(quiz.dateCreated).fromNow()}</h3>
        <div
          className={styles["quiz-image"]}
          style={{ backgroundImage: "url('" + quiz.backgroundImage + "')" }}
        ></div>
        <h3 className={styles["quiz-question-number"]}>
          Pytania: {quiz.numberOfQuestions}
        </h3>
      </div>
      <div className={styles["card-body"]}>
        <h4 className={styles["quiz-tags"]}>
          {quiz.tags.map((tag) => `#${tag} `)}
        </h4>
        <h2 className={styles["quiz-title"]}>{quiz.name}</h2>
        <p className={styles["quiz-description"]}>{quiz.description}</p>
        <button
          className={styles["like-button"]}
          onClick={() => dispatch(likeQuiz(quiz._id))}
        >
          <ThumbUpAltIcon />
          &nbsp;LIKE&nbsp;
          {quiz.likesCount}
        </button>
      </div>
    </div>
  )
}

export default Quiz
