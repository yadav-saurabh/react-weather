import axios from "axios";
import axiosHeader from "../constants/axiosHeader.js";
import CONFIG from "./../config";

export const login = data =>
  axios.post(CONFIG.API_URL + "/auth/login", data, axiosHeader);
