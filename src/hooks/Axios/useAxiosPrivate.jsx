import axios from "axios";
import { Navigate } from "react-router-dom";

const instance = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  // baseURL: "https://ravetag-server.vercel.app/api/v1",
  withCredentials: true,
});

export const useAxiosPrivate = () => {
  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response.status === 401 || error.response.status === 403) {
        return <Navigate to="/" />;
      }
    }
  );
  return instance;
};
