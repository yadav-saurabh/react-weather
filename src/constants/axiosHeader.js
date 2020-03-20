const userToken = localStorage.getItem("userToken") || "";

const axiosHeader = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: "Bearer " + userToken
  }
};

export default axiosHeader;
