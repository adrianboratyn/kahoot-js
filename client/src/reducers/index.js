import { combineReducers } from "redux";
import users from "./users";
import auth from "./auth";

export default combineReducers({
  users,
  auth,
});
