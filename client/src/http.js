import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 4000,
  withCredentials: true
});

export default instance;
