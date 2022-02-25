import { CREATE_SOCKET } from "../constants/actionTypes"

const reducer = (state = { socket: null }, action) => {
  switch (action.type) {
    case CREATE_SOCKET:
      return { ...state, socket: action.payload }
    default:
      return state
  }
}

export default reducer
