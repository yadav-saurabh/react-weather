import axios from "axios";
import CONFIG from "./../config";

export const getWeather = data =>
  axios.get(
    `https://api.openweathermap.org/data/2.5/weather/?${data}&units=metric&APPID=${CONFIG.WEATHER_API}`
  );

export const getForecast = data =>
  axios.get(
    `https://api.openweathermap.org/data/2.5/forecast/?${data}&units=metric&APPID=${CONFIG.WEATHER_API}`
  );
