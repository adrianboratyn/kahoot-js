import { FETCH_ALL_QUIZES, CREATE_QUIZ, UPDATE_QUIZ } from "../constants/actionTypes";

const reducer = (quizes = [], action) => {
  switch (action.type) {
    case FETCH_ALL_QUIZES:
      return action.payload;
    case CREATE_QUIZ:
      return [...quizes, action.payload];
    case UPDATE_QUIZ:
      return quizes.map((quiz) =>
        quiz._id === action.payload._id ? action.payload : quiz
      );
    default:
      return quizes;
  }
};

export default reducer;
