import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import Quiz from "./Quiz/Quiz"
import { useDispatch } from "react-redux"
import { getPublicQuizes } from "../../actions/quiz"
import styles from "./quizes.module.css"

function Quizes() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getPublicQuizes())
  }, [dispatch])
  const {quizes} = useSelector((state) => state.quiz)
  const state = useSelector((state) => state)
  console.log(state);
  return (
    <div className={styles["quizes-list"]}>
      {quizes.map((quiz) => (
          <Quiz key={quiz._id} quiz={quiz} />
      ))}
    </div>
  )
}

export default Quizes
