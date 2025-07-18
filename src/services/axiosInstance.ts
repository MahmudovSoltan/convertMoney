import axios from "axios";

const baseURL = "https://localhost:7083/api";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});


export default axiosInstance;