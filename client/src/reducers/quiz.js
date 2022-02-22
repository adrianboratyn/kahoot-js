import {
  FETCH_ALL_QUIZES,
  FETCH_PUBLIC_QUIZES,
  FETCH_TEACHER_QUIZES,
  CREATE_QUIZ,
  DELETE_QUIZ,
  UPDATE_QUIZ,
  LIKE_QUIZ,
  FETCH_QUIZ,
  FETCH_QUIZES_BY_SEARCH,
  START_LOADING,
  END_LOADING,
  COMMENT_QUIZ,
} from "../constants/actionTypes"

const reducer = (state = { isLoading: true, quizes: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true }
    case END_LOADING:
      return { ...state, isLoading: false }
    case FETCH_PUBLIC_QUIZES:
      return {
        ...state,
        quizes: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      }
    case FETCH_ALL_QUIZES:
    case FETCH_TEACHER_QUIZES:
    case FETCH_QUIZES_BY_SEARCH:
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
    case COMMENT_QUIZ:
      return {
        ...state,
        quizes: state.quizes.map((quiz) => {
          if (quiz._id === action.payload._id) {
            return action.payload
          }
          return quiz
        }),
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
