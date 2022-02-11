import { CHANGE_LANGUAGE } from "../constants/actionTypes"

const languageReducer = (state = { isEnglish: false }, action) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return { ...state, isEnglish: action.payload }
    default:
      return state
  }
}

export default languageReducer
