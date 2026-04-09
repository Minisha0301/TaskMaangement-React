import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const createTask = async (data) => {
  const res = await axios.post(`${API_URL}/tasks`, data);
  return res.data;
};