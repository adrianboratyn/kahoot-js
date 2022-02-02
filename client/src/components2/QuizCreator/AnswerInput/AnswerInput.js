import React from "react"
import styles from "./answerInput.module.css"
import answerCheck from "../../../assets/answerCheck.svg"


function AnswerInput({ value, onChange, onClick, isAnswerCorrect, svg }) {

  return (
    <>
      <img src={svg} alt="" />
      <input type="text" value={value} onChange={onChange} name="a" />
      <div onClick={onClick} className={styles["answer-check"]}>
        <img
          style={{ visibility: isAnswerCorrect ? "visible" : "hidden" }}
          src={answerCheck}
          alt=""
        />
      </div>
    </>
  )
}

export default AnswerInput
