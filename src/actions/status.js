import { SET_SIDEBAR_STATUS, SET_LOGIN_STATUS } from "../constants/actionTypes";

export const setSidebarStatus = value => dispatch => {
  try {
    dispatch({
      type: SET_SIDEBAR_STATUS,
      payload: value
    });
  } catch (error) {
    console.log(error);
  }
};

export const setLoginStatus = value => dispatch => {
  try {
    dispatch({
      type: SET_LOGIN_STATUS,
      payload: value
    });
  } catch (error) {
    console.log(error);
  }
};
