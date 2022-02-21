import React from "react"
import styles from "./questionListItem.module.css"
import defaultQuestionImage from "../../../assets/defaultQuestionImage.svg"

function QuestionListItem({ number, type, name, time, image, onClick }) {
  return (
    <div className={styles["question-list-item"]} onClick={onClick}>
      <h3 className={styles["question-list-item-title"]}>
        <span className={styles["question-list-number"]}>{number}&nbsp;</span>
        {type}
      </h3>
      <div className={styles["question-preview"]}>
        <h4 className={styles["question-preview-title"]}>
          {name}
        </h4>
        <div className={styles["question-preview-time"]}>{time}</div>
        <div className={styles["question-preview-background-image"]}>
          {image.length === 0 ? (
            <img src={defaultQuestionImage} alt="" />
          ) : (
            <img src={image} alt="" />
          )}
        </div>
        <div className={styles["question-preview-answers"]}>
          <div className={styles["answer-image"]}></div>
          <div className={styles["answer-image"]}></div>
          <div className={styles["answer-image"]}></div>
          <div className={styles["answer-image"]}></div>
        </div>
      </div>
    </div>
  )
}

export default QuestionListItem
