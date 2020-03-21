import axios from "axios";

export const cities = data =>
  axios.get("http://api.teleport.org/api/cities/?search=" + data);
