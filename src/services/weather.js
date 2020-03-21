import axios from "axios";
import CONFIG from "./../config";
import axiosHeader from "../constants/axiosHeader.js";

export const getWeather = data =>
  axios.get(
    `https://api.openweathermap.org/data/2.5/weather/?${data}&units=metric&APPID=${CONFIG.WEATHER_API}`
  );

export const getForecast = data =>
  axios.get(
    `https://api.openweathermap.org/data/2.5/forecast/?${data}&units=metric&APPID=${CONFIG.WEATHER_API}`
  );

export const saveWeather = data =>
  axios.post(CONFIG.API_URL + "/weather", data, axiosHeader());

export const getWeatherHistory = data =>
  axios.get(CONFIG.API_URL + "/weather?skip=" + data, axiosHeader());
