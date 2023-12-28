import axios from "axios";
//import { API_URL } from "../config";
const API = import.meta.env.VITE_BACKEND_API

const instance = axios.create({
  baseURL: API,
  withCredentials: true,
});

export default instance;