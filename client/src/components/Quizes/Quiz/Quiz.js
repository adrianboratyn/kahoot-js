import React from "react"
import { useDispatch, useSelector } from "react-redux"
import styles from "./quiz.module.css"
import { likeQuiz } from "../../../actions/quiz"
import { useHistory } from "react-router-dom"
import moment from "moment"
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt"
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined"

function Quiz({ quiz }) {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = JSON.parse(localStorage.getItem("profile"))
  const isLanguageEnglish = useSelector((state) => state.language.isEnglish)
  const openQuizDetailsPage = (e) => {
    history.push(`/quizes/${quiz._id}`)
  }
  const Likes = () => {
    if (quiz.likesCount.length > 0) {
      return quiz.likesCount.find((like) => like === user?.result?._id) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {quiz.likesCount.length > 2
            ? isLanguageEnglish
              ? `You and ${quiz.likesCount.length - 1} others`
              : `Ty i ${quiz.likesCount.length - 1} innych`
            : isLanguageEnglish
            ? `${quiz.likesCount.length} like${
                quiz.likesCount.length > 1 ? "s" : ""
              }`
            : `${quiz.likesCount.length} osób polubiło`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{quiz.likesCount.length}{" "}
          {quiz.likesCount.length === 1
            ? isLanguageEnglish
              ? "Like"
              : "Polubienie"
            : isLanguageEnglish
            ? "Likes"
            : "Polubienia"}
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

  return (
    <div className={styles["quiz-card"]}>
      <div className={styles["image-container"]}>
        <h3 className={styles["quiz-creator"]}>{quiz.creatorName}</h3>
        <h3 className={styles["quiz-date"]}>
          {moment(quiz.dateCreated).fromNow()}
        </h3>
        <div
          onClick={openQuizDetailsPage}
          className={styles["quiz-image"]}
          style={{ backgroundImage: "url('" + quiz.backgroundImage + "')" }}
        ></div>
        <h3 className={styles["quiz-question-number"]}>
          {isLanguageEnglish ? "Questions:" : "Pytania:"}{" "}
          {quiz.numberOfQuestions}
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
