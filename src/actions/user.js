// import { SET_USER_LOGIN } from "../constants/actionTypes";
import { login } from "../services/auth";

export const requestLogin = ({ email, password }) => async dispatch => {
  try {
    const { data } = await login({ email, password }).catch(error => {
      if (error.response === undefined) {
        throw new Error({ msg: "Please check your internet connection" });
      }
      throw error.response.data;
    });

    const loginData = {
      id: data.user.id,
      accessToken: data.access_token,
      email: email
    };

    localStorage.setItem("userToken", loginData.accessToken);

    return { data };
  } catch (error) {
    console.log(error);
    return error;
  }
};
