import axios from "axios";
import { store } from "../store";

export const api = axios.create({ baseURL:"https://dummyjson.com" });

api.interceptors.request.use((cfg)=>{
  const token = store.getState().session.token;
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});
