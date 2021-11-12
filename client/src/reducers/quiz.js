import { FETCH_ALL, CREATE} from "../constants/actionTypes";

const reducer = (quizes = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...quizes, action.payload];
      // return users.map((user) =>
      //   user._id === action.payload._id ? action.payload : user
      // );
    default:
      return quizes;
  }
};

export default reducer;
