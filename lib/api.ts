import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5000,
  headers: { "Content-Type": " Application/Json" },
});

export default api;
