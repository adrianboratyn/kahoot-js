import * as api from "../api"
import {
  CREATE_LEADERBOARD,
  ADD_PLAYER_RESULT,
  FETCH_LEADERBOARD,
  UPDATE_QUESTION_LEADERBOARD,
  UPDATE_CURRENT_LEADERBOARD,
} from "../constants/actionTypes"

export const createLeaderboard = (leaderboardData) => async (dispatch) => {
  try {
    const { data } = await api.createLeaderboard(leaderboardData)
    dispatch({ type: CREATE_LEADERBOARD, payload: data })
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getLeaderboard = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchLeaderboard(id)
    dispatch({ type: FETCH_LEADERBOARD, payload: { leaderboard: data } })
  } catch (error) {
    console.log(error)
  }
}

export const addPlayerResult = (playerResult, id) => async (dispatch) => {
  try {
    const { data } = await api.addPlayerResult(playerResult, id)
    dispatch({ type: ADD_PLAYER_RESULT, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const updateQuestionLeaderboard =
  (questionResult, id) => async (dispatch) => {
    try {
      const { data } = await api.updateQuestionLeaderboard(questionResult, id)
      dispatch({ type: UPDATE_QUESTION_LEADERBOARD, payload: data })
      return data
    } catch (error) {
      console.log(error)
    }
  }

export const updateCurrentLeaderboard = (result, id) => async (dispatch) => {
  try {
    const { data } = await api.updateCurrentLeaderboard(result, id)
    dispatch({ type: UPDATE_CURRENT_LEADERBOARD, payload: data })
    return data
  } catch (error) {
    console.log(error)
  }
}
