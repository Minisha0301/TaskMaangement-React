import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getSummary = async () => {
  const res = await axios.get(`${API_URL}/summary`);
  return res.data.data;
};