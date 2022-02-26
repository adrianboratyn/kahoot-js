import * as api from "../api"
import {
  FETCH_ALL_QUIZES,
  FETCH_PUBLIC_QUIZES,
  FETCH_TEACHER_QUIZES,
  CREATE_QUIZ,
  UPDATE_QUIZ,
  LIKE_QUIZ,
  DELETE_QUIZ,
  FETCH_QUIZ,
  FETCH_QUIZES_BY_SEARCH,
  START_LOADING,
  END_LOADING,
  COMMENT_QUIZ
} from "../constants/actionTypes"

export const getQuizes = () => async (dispatch) => {
  try {
    const { data } = await api.fetchQuizes()
    dispatch({ type: FETCH_ALL_QUIZES, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const getPublicQuizes = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const {
      data: { data, currentPage, numberOfPages },
    } = await api.fetchPublicQuizes(page)
    dispatch({
      type: FETCH_PUBLIC_QUIZES,
      payload: { data, currentPage, numberOfPages },
    })
    dispatch({ type: END_LOADING })
  } catch (error) {
    console.log(error)
  }
}

export const getQuizesBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const { data } = await api.fetchQuizesBySearch(searchQuery)
    dispatch({ type: FETCH_QUIZES_BY_SEARCH, payload: data })
    dispatch({ type: END_LOADING })
  } catch (error) {
    console.log(error)
  }
}

export const getTeacherQuizes = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const { data } = await api.fetchTeacherQuizes(id)
    dispatch({ type: FETCH_TEACHER_QUIZES, payload: data })
    dispatch({ type: END_LOADING })
  } catch (error) {
    console.log(error)
  }
}

export const getQuestions = () => async (dispatch) => {
  try {
    const { data } = await api.fetchQuestions()
    dispatch({ type: FETCH_ALL_QUIZES, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const createQuiz = (quiz, history) => async (dispatch) => {
  try {
    const { data } = await api.createQuiz(quiz)
    dispatch({ type: CREATE_QUIZ, payload: data })
    history.push(`/myquizes/${data._id}`)
  } catch (error) {
    console.log(error)
  }
}

export const deleteQuiz = (id) => async (dispatch) => {
  try {
    await api.deleteQuiz(id)
    dispatch({ type: DELETE_QUIZ, payload: id })
  } catch (error) {
    console.log(error)
  }
}

//do poprawy
// export const createQuestion = (quizId, question) => async (dispatch) => {
//   try {
//     const { data } = await api.createQuiz(quizId, question);
//     dispatch({ type: CREATE_QUIZ, payload: data });
//   } catch (error) {
//     console.log(error);
//   }
// };

export const updateQuiz = (id, quiz) => async (dispatch) => {
  try {
    const { data } = await api.updateQuiz(id, quiz)
    dispatch({ type: UPDATE_QUIZ, payload: data })
  } catch (error) {
    console.log(error)
  }
}

// export const updateQuestion = (quizId, questionId, user) => async (dispatch) => {
//   try {
//     const { data } = await api.updateUser(quizId, questionId, user);
//     dispatch({ type: UPDATE_QUIZ, payload: data });
//   } catch (error) {
//     console.log(error);
//   }
// };

export const likeQuiz = (quizId) => async (dispatch) => {
  try {
    const { data } = await api.likeQuiz(quizId)
    dispatch({ type: LIKE_QUIZ, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const getQuiz = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchQuiz(id)
    dispatch({ type: FETCH_QUIZ, payload: { quiz: data } })
  } catch (error) {
    console.log(error)
  }
}

export const commentQuiz = (comment, quizId) => async (dispatch) => {
  try {
    const { data } = await api.commentQuiz(comment, quizId)
    dispatch({ type: COMMENT_QUIZ, payload: data })
    return data.comments
  } catch (error) {
    console.log(error)
  }
}
