import axios from "axios";
import axiosHeader from "../constants/axiosHeader.js";
import CONFIG from "./../config";

export const login = data => axios.post(CONFIG.API_URL + "/users/login", data);

export const logout = data =>
  axios.post(CONFIG.API_URL + "/users/me/logout", data, axiosHeader());

export const getUserData = () =>
  axios.get(CONFIG.API_URL + "/users/me", axiosHeader());
