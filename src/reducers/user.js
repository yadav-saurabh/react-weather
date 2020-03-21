import { RESET_USER_DATA, SET_USER_DATA } from "./../constants/actionTypes";

const initialState = {
  id: "",
  email: "",
  name: "",
  avatar: ""
};

const user = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...payload
      };
    case RESET_USER_DATA:
      return initialState;
    default:
      return state;
  }
};

export default user;
