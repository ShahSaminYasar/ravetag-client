import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  // baseURL: "https://ravetag-server.vercel.app/api/v1",
  withCredentials: true,
});

export const useAxiosPublic = () => {
  return instance;
};
