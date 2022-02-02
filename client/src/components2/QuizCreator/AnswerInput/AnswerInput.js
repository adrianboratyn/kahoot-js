import React, { useState } from "react"
import styles from "./answerInput.module.css"
import img6 from "../../../assets/img6.svg"


function AnswerInput({ value, onChange, onClick, isAnswerCorrect, svg }) {
  // const [isAnswerCorrect, setIsAnswerCorrect] = useState(false)

  // const setCorrectAnswer = () => {
  //   setIsAnswerCorrect((prevIsAnswerCorrect) => !prevIsAnswerCorrect)
  //   answer = isAnswerCorrect
  // }
  return (
    <>
      <img src={svg} alt="" />
      <input type="text" value={value} onChange={onChange} name="a" />
      {/* <!-- checkbox która odpowiedź poprawna --> */}
      <div onClick={onClick} className={styles["answer-check"]}>
        <img
          style={{ visibility: isAnswerCorrect ? "visible" : "hidden" }}
          src={img6}
          alt=""
        />
        {/* <input name="a" type="checkbox" /> */}
      </div>
    </>
  )
}

export default AnswerInput
