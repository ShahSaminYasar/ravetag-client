import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  // baseURL: "https://ravetag-server.vercel.app/api/v1",
  withCredentials: true,
});

export const useAxiosPrivate = () => {
  instance.interceptors.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response.status === 401 || error.response.status === 403) {
        return "Unauthorized/Forbidden";
      }
    }
  );
  return instance;
};
