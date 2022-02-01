import React, { useState } from "react"
import styles from "./answerInput.module.css"

function AnswerInput({ value, onChange, onClick, img, isAnswerCorrect }) {
  // const [isAnswerCorrect, setIsAnswerCorrect] = useState(false)

  // const setCorrectAnswer = () => {
  //   setIsAnswerCorrect((prevIsAnswerCorrect) => !prevIsAnswerCorrect)
  //   answer = isAnswerCorrect
  // }
  return (
    <>
      <input type="text" value={value} onChange={onChange} name="a" />
      {/* <!-- checkbox która odpowiedź poprawna --> */}
      <div onClick={onClick} className={styles["answer-check"]}>
        <img
          style={{ visibility: isAnswerCorrect ? "visible" : "hidden" }}
          src={img}
          alt=""
        />
        {/* <input name="a" type="checkbox" /> */}
      </div>
    </>
  )
}

export default AnswerInput
