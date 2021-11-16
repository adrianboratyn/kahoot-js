import * as api from "../api";
import { FETCH_ALL, CREATE, UPDATE } from "../constants/actionTypes";

export const getQuizes = () => async (dispatch) => {
  try {
    const { data } = await api.fetchQuizes();
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getQuestions = () => async (dispatch) => {
  try {
    const { data } = await api.fetchQuestions();
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createQuiz = (quiz) => async (dispatch) => {
  try {
    const { data } = await api.createQuiz(quiz);
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createQuestion = (quizId, question) => async (dispatch) => {
  try {
    const { data } = await api.createQuiz(quizId, question);
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateQuiz = (id, quiz) => async (dispatch) => {
  try {
    const { data } = await api.updateQuiz(id, quiz);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateQuestion = (quizId, questionId, user) => async (dispatch) => {
  try {
    const { data } = await api.updateUser(quizId, questionId, user);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
