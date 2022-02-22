import {
  CREATE_GAME, FETCH_GAME
} from "../constants/actionTypes"

const reducer = (state = { games: [] }, action) => {
  switch (action.type) {
    case CREATE_GAME:
      return { ...state, games: [...state.games, action.payload] }
    case FETCH_GAME:
      return { ...state, game: action.payload.game }
    default:
      return state
  }
}

export default reducer
