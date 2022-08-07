import axios from "axios";
import { userData } from "../../store";
axios.defaults.baseURL = "http://localhost:9000";
export interface IUser {
  productId: number;
  name: string;
  detail: string;
}
export const getUser = async () => {
  const res = await axios.get("/user");
  return res.data;
};

export const getUserOne = async (id: number) => {
  const res = await axios.get(`/user/${id}`);
  return res.data;
};

export const postUser = (user: userData) => {
  return axios.post("/user", user);
};
