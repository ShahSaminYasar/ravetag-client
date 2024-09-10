import { useQuery } from "@tanstack/react-query";
import { useAxiosPublic } from "../Axios/useAxiosPublic";

const useCategoriesList = () => {
  const axios = useAxiosPublic();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getCategoriesList"],
    queryFn: () => axios.get("/categories"),
  });

  if (isLoading) return { isLoading: true };
  if (isError) return { error };

  return data?.data?.result;
};
export default useCategoriesList;
