import { CHANGE_LANGUAGE } from "../constants/actionTypes"

export const changeLanguage = (data) => async (dispatch) => {
  try {
    dispatch({ type: CHANGE_LANGUAGE, payload: data })
  } catch (error) {
    console.log(error)
  }
}
