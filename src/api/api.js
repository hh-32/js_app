import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE || "http://localhost:3000/api",
  timeout: 5000,
});

export default api;
