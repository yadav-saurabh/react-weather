import { LOGOUT } from "./../constants/actionTypes";

const initialState = {
  email: "saurabhyadav4321@gmail.com",
  name: "saurabh",
  imgSrc: null
};

const user = (state = initialState, { type, payload }) => {
  switch (type) {
    // case SET_USER_LOGIN:
    //   return {
    //     ...state,
    //     isLogged: payload
    //   };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default user;
