import * as api from "../api";
import { FETCH_ALL_USERS, CREATE_USER, UPDATE_USER, DELETE_USER } from "../constants/actionTypes";

export const getUsers = () => async (dispatch) => {
  try {
    const { data } = await api.fetchUsers();
    dispatch({ type: FETCH_ALL_USERS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createUser = (user) => async (dispatch) => {
  try {
    const { data } = await api.createUser(user);
    dispatch({ type: CREATE_USER, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = (id, user) => async (dispatch) => {
  try {
    const { data } = await api.updateUser(id, user);
    dispatch({ type: UPDATE_USER, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    await api.deleteUser(id);
    dispatch({ type: DELETE_USER, payload: id });
  } catch (error) {
    console.log(error);
  }
};
