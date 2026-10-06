import axios from "axios";

const api = axios.create({
  baseURL: "https://class-58.onrender.com",
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

export default api;
