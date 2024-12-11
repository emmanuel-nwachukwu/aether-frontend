// ./src/api/axiosinstance.config.js
import config from "../../config";
import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: "http://localhost:8000/api",
  baseURL: config.baseUrl,
});
