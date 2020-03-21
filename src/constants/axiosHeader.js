const axiosHeader = () => {
  return {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + localStorage.getItem("userToken")
    }
  };
};

export default axiosHeader;
