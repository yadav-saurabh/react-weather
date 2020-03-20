import { SET_LOGIN_STATUS, SET_SIDEBAR_STATUS } from "../constants/actionTypes";

const initialState = {
  sidebar: false,
  isLogged: false
};

const status = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LOGIN_STATUS:
      return {
        ...state,
        isLogged: payload
      };
    case SET_SIDEBAR_STATUS:
      return {
        ...state,
        sidebar: payload
      };
    default:
      return state;
  }
};

export default status;
