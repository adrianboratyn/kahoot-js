import React from 'react'
import styles from "./answer.module.css"
import answerCheck from "../../../assets/answerCheck.svg"

function Answer({icon, body, showText, isAnswerClicked, onClick}) {
  return (
    <div className={styles["answer-field"]}>
      <img className={styles["answer-icon"]} src={icon} alt="" />
      {showText ? (
        <h2>{body}</h2>
      ) : (
        <div onClick={onClick} className={styles["answer-check"]}>
          <img
            style={{ visibility: isAnswerClicked ? "visible" : "hidden" }}
            src={answerCheck}
            alt=""
          />
        </div>
      )}
    </div>
  )
}

export default Answer