import { CREATE_GAME, FETCH_GAME, ADD_PLAYER } from "../constants/actionTypes"

const reducer = (state = { games: [] }, action) => {
  switch (action.type) {
    case CREATE_GAME:
      return { ...state, games: [...state.games, action.payload] }
    case FETCH_GAME:
      return { ...state, game: action.payload.game }
    case ADD_PLAYER:
      return {
        ...state,
        games: state.games.map((game) =>
          game._id === action.payload._id ? action.payload : game
        ),
      }
    default:
      return state
  }
}

export default reducer
