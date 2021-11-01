import { FETCH_ALL, CREATE, UPDATE, DELETE } from "../constants/actionTypes";

const reducer = (users = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case UPDATE:
      return users.map((user) =>
        user._id === action.payload._id ? action.payload : user
      );
    case CREATE:
      return [...users, action.payload];
    case DELETE:
      return users.filter(user => user._id !== action.payload)
    default:
      return users;
  }
};

export default reducer;
