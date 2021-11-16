import { FETCH_ALL, CREATE, UPDATE } from "../constants/actionTypes";

const reducer = (quizes = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...quizes, action.payload];
    // return users.map((user) =>
    //   user._id === action.payload._id ? action.payload : user
    // );
    case UPDATE:
      return quizes.map((quiz) =>
        quiz._id === action.payload._id ? action.payload : quiz
      );
    default:
      return quizes;
  }
};

export default reducer;
