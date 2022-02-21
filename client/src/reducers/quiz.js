import {
  FETCH_ALL_QUIZES,
  FETCH_PUBLIC_QUIZES,
  FETCH_TEACHER_QUIZES,
  CREATE_QUIZ,
  DELETE_QUIZ,
  UPDATE_QUIZ,
  LIKE_QUIZ,
  FETCH_QUIZ,
  FETCH__QUIZES_BY_SEARCH,
} from "../constants/actionTypes"

const reducer = (state = { quizes: [] }, action) => {
  switch (action.type) {
    case FETCH_PUBLIC_QUIZES:
      return {
        ...state,
        quizes: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      }
    case FETCH_ALL_QUIZES:
    case FETCH_TEACHER_QUIZES:
    case FETCH__QUIZES_BY_SEARCH:
      return { ...state, quizes: action.payload }
    case CREATE_QUIZ:
      return { ...state, quizes: [...state.quizes, action.payload] }
    case UPDATE_QUIZ:
    case LIKE_QUIZ:
      return {
        ...state,
        quizes: state.quizes.map((quiz) =>
          quiz._id === action.payload._id ? action.payload : quiz
        ),
      }
    case DELETE_QUIZ:
      return {
        ...state,
        quizes: state.quizes.filter((quiz) => quiz._id !== action.payload),
      }
    case FETCH_QUIZ:
      return { ...state, quiz: action.payload.quiz }
    default:
      return state
  }
}

export default reducer
