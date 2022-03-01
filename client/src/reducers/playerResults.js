import {
  CREATE_PLAYER_RESULT,
  FETCH_PLAYER_RESULT,
  ADD_ANSWER,
} from "../constants/actionTypes"

const reducer = (state = { playerResults: [], playerResult: null }, action) => {
  switch (action.type) {
    case CREATE_PLAYER_RESULT:
      return {
        ...state,
        playerResults: [...state.playerResults, action.payload],
        playerResult: action.payload
      }
    case FETCH_PLAYER_RESULT:
      return { ...state, playerResult: action.payload.playerResult }
    case ADD_ANSWER:
      return {
        ...state,
        playerResults: state.playerResults.map((playerResult) =>
          playerResult._id === action.payload._id
            ? action.payload
            : playerResult
        ),
      }
    default:
      return state
  }
}

export default reducer
