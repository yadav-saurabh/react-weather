import {
  RESET_USER_DATA,
  SET_LOGIN_STATUS,
  SET_USER_DATA
} from "../constants/actionTypes";
import { login, getUserData, logout } from "../services/auth";

export const requestLogin = ({ email, password }) => async dispatch => {
  try {
    const { data } = await login({ email, password }).catch(error => {
      if (error.response === undefined) {
        throw new Error({ msg: "Please check your internet connection" });
      }
      throw error.response.data;
    });

    const loginData = {
      id: data.user._id,
      email: email,
      name: data.user.name,
      avatar: data.user.avatar
    };
    localStorage.setItem("userToken", data.token);
    dispatch({
      type: SET_USER_DATA,
      payload: loginData
    });

    return { data };
  } catch (error) {
    return { error };
  }
};

export const loadUserData = () => async dispatch => {
  try {
    const { data } = await getUserData().catch(error => {
      if (error.response === undefined) {
        throw new Error({ msg: "Please check your internet connection" });
      }
      throw error.response.data;
    });
    const usrData = {
      id: data._id,
      email: data.email,
      name: data.name,
      avatar: data.avatar
    };
    dispatch({
      type: SET_USER_DATA,
      payload: usrData
    });

    return { data };
  } catch (error) {
    return { error };
  }
};

export const logoutUser = () => async dispatch => {
  try {
    await logout().catch(error => {
      if (error.response === undefined) {
        throw new Error({ msg: "Please check your internet connection" });
      }
      throw error.response.data;
    });
    localStorage.clear();
    dispatch({
      type: SET_LOGIN_STATUS,
      payload: false
    });
    dispatch({
      type: RESET_USER_DATA,
      payload: {}
    });
  } catch (error) {
    console.log(error);
  }
};
