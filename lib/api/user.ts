import axios from "axios";
import { userData } from "../../store";
axios.defaults.baseURL = "http://localhost:9000";
export const getUser = () => {
  return axios.get("/user").then((res) => res.data);
};

export const getUserOne = (id: number) => {
  return axios.get(`/user/${id}`).then((res) => res.data);
};

export const postUser = (user: userData) => {
  return axios.post("/user", user);
};
