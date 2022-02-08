import React from "react"
import { useDispatch } from "react-redux"
import styles from "./quiz.module.css"
import { likeQuiz } from "../../../actions/quiz"
import moment from "moment"
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt"
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined"

function Quiz({ quiz }) {
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem("profile"))
  const Likes = () => {
    if (quiz.likesCount.length > 0) {
      return quiz.likesCount.find((like) => like === user?.result?._id) 
      ? (
        <><ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {quiz.likesCount.length > 2
            ? `You and ${quiz.likesCount.length - 1} others`
            : `${quiz.likesCount.length} like${
                quiz.likesCount.length > 1 ? "s" : ""
              }`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{quiz.likesCount.length}{" "}
          {quiz.likesCount.length === 1 ? "Like" : "Likes"}
        </>
      )
    }
    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    )
  }

  console.log(quiz.likesCount);
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
        <h4 className={styles["quiz-tags"]}>
          {quiz.tags.map((tag) => `#${tag} `)}
        </h4>
        <h2 className={styles["quiz-title"]}>{quiz.name}</h2>
        <p className={styles["quiz-description"]}>{quiz.description}</p>
        <button
          className={styles["like-button"]}
          onClick={() => dispatch(likeQuiz(quiz._id))}
        >
          <Likes />
        </button>
      </div>
    </div>
  )
}

export default Quiz
