import { CREATE_SOCKET } from "../constants/actionTypes"

export const createSocket = (data) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_SOCKET, payload: data })
  } catch (error) {
    console.log(error)
  }
}
