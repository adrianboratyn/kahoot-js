import {
  FETCH_ALL_QUIZES,
  FETCH_PUBLIC_QUIZES,
  FETCH_TEACHER_QUIZES,
  CREATE_QUIZ,
  DELETE_QUIZ,
  UPDATE_QUIZ,
  LIKE_QUIZ,
} from "../constants/actionTypes"

const reducer = (quizes = [], action) => {
  switch (action.type) {
    case FETCH_ALL_QUIZES:
    case FETCH_PUBLIC_QUIZES:
    case FETCH_TEACHER_QUIZES:
      return action.payload
    case CREATE_QUIZ:
      return [...quizes, action.payload]
    case UPDATE_QUIZ:
    case LIKE_QUIZ:
      return quizes.map((quiz) =>
        quiz._id === action.payload._id ? action.payload : quiz
      )
    case DELETE_QUIZ:
      return quizes.filter((quiz) => quiz._id !== action.payload)
    default:
      return quizes
  }
}

export default reducer
