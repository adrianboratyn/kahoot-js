import React from "react"
import styles from "./question.module.css"
import diamond from "../../../assets/diamond.svg"

function Question({ question, timer }) {
  return (
    <div className={styles["question"]}>
      <h2 className={styles["question-name"]}>{question.question}</h2>
      <div className={styles["container"]}>
        <div className={styles["question-time"]}>{timer}</div>
        {question.backgroundImage && (
          <img src={question.backgroundImage} alt="" />
        )}
        <div></div>
      </div>
      <div className={styles["answers-container"]}>
        {question.answerList.map((answer) => (
          <div className={styles["answer-field"]}>
            <img className={styles["answer-icon"]} src={diamond} alt="" />
            <h2>{answer.body}</h2>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Question
