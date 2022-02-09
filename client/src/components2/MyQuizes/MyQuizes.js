import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import MyQuiz from "./MyQuiz/MyQuiz"
import { useDispatch } from "react-redux"
import { getTeacherQuizes } from "../../actions/quiz"
import styles from "./myQuizes.module.css"

function MyQuizes() {
  const user = JSON.parse(localStorage.getItem("profile"))
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTeacherQuizes(user.result._id))
  }, [dispatch])

  const quizes = useSelector((state) => state.quiz)
  return (
    <div className={styles["quizes-list"]}>
      {quizes.map((quiz) => (
        <MyQuiz key={quiz._id} quiz={quiz} />
      ))}
    </div>
  )
}

export default MyQuizes
