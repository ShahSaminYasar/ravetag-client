import { useAxiosPublic } from "../Axios/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useProducts = (id) => {
  const axiosPublic = useAxiosPublic();

  let link;
  if (id) {
    link = `/products?id=${id}`;
  } else {
    link = `/products`;
  }

  const { data, isLoading, error, isError, isRefetching } = useQuery({
    queryKey: ["getProducts"],
    queryFn: () => axiosPublic.get(link),
  });

  if (isLoading || isRefetching) return { isLoading: true };

  if (isError) return { error };

  return data?.data;
};
export default useProducts;
