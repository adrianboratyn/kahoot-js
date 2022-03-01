import {
  CREATE_LEADERBOARD,
  ADD_PLAYER_RESULT,
  FETCH_LEADERBOARD,
  UPDATE_QUESTION_LEADERBOARD,
  UPDATE_CURRENT_LEADERBOARD,
} from "../constants/actionTypes"

const reducer = (state = { leaderboards: [], leaderboard: null }, action) => {
  switch (action.type) {
    case CREATE_LEADERBOARD:
      return {
        ...state,
        leaderboards: [...state.leaderboards, action.payload],
        leaderboard: action.payload,
      }
    case FETCH_LEADERBOARD:
      return { ...state, leaderboard: action.payload.leaderboard }
    case ADD_PLAYER_RESULT:
    case UPDATE_QUESTION_LEADERBOARD:
    case UPDATE_CURRENT_LEADERBOARD:
      return {
        ...state,
        leaderboards: state.leaderboards.map((leaderboard) =>
          leaderboard._id === action.payload._id ? action.payload : leaderboard
        ),
      }
    default:
      return state
  }
}

export default reducer