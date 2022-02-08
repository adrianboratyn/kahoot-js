import * as api from "../api";
import { FETCH_ALL_QUIZES, CREATE_QUIZ, UPDATE_QUIZ, LIKE_QUIZ } from "../constants/actionTypes";

export const getQuizes = () => async (dispatch) => {
  try {
    const { data } = await api.fetchQuizes();
    dispatch({ type: FETCH_ALL_QUIZES, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getQuestions = () => async (dispatch) => {
  try {
    const { data } = await api.fetchQuestions();
    dispatch({ type: FETCH_ALL_QUIZES, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createQuiz = (quiz) => async (dispatch) => {
  try {
    const { data } = await api.createQuiz(quiz);
    dispatch({ type: CREATE_QUIZ, payload: data });
  } catch (error) {
    console.log(error);
  }
};

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
    const { data } = await api.updateQuiz(id, quiz);
    dispatch({ type: UPDATE_QUIZ, payload: data });
  } catch (error) {
    console.log(error);
  }
};

// export const updateQuestion = (quizId, questionId, user) => async (dispatch) => {
//   try {
//     const { data } = await api.updateUser(quizId, questionId, user);
//     dispatch({ type: UPDATE_QUIZ, payload: data });
//   } catch (error) {
//     console.log(error);
//   }
// };

export const likeQuiz =
  (quizId) => async (dispatch) => {
    try {
      const { data } = await api.likeQuiz(quizId)
      dispatch({ type: LIKE_QUIZ, payload: data })
    } catch (error) {
      console.log(error)
    }
  }
