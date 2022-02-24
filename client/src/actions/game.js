import * as api from "../api"
import {
  CREATE_GAME,
  FETCH_GAME,
} from "../constants/actionTypes"

export const createGame = (gameData, history) => async (dispatch) => {
  try {
    const { data } = await api.createGame(gameData)
    dispatch({ type: CREATE_GAME, payload: data })
    history.push(`/games/host/${data._id}`)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getGame = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchGame(id)
    dispatch({ type: FETCH_GAME, payload: { game: data } })
  } catch (error) {
    console.log(error)
  }
}
