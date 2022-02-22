import React from "react"
import QuestionListItem from "../../QuizCreator/QuestionListItem/QuestionListItem"
import styles from "./question.module.css"

function Question({ question }) {
  console.log(question)
  return (
    <div className={styles["quiz-card"]}>
      <div>
        <QuestionListItem
          key={question.questionIndex}
          number={question.questionIndex}
          type={question.questionType}
          time={question.answerTime}
          image={question.backgroundImage}
        />
      </div>
      <div className={styles["card-body"]}>
        <p className={styles["quiz-description"]}>{question.question}</p>
      </div>
    </div>
  )
}

export default Question
