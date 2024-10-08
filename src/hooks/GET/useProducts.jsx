import { useAxiosPublic } from "../Axios/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useProducts = (filter) => {
  const axiosPublic = useAxiosPublic();
  console.log("Logging products");

  let link;
  if (filter?.id) {
    link = `/products?id=${filter?.id}`;
  } else if (filter?.category && filter?.top_sales) {
    link = `/products?category=${filter?.category}&top_sales=true`;
  } else if (filter?.category) {
    link = `/products?category=${filter?.category}`;
  } else if (filter?.top_sales) {
    link = `/products?top_sales=true`;
  } else {
    link = `/products`;
  }

  const { data, isLoading, error, isError, isRefetching } = useQuery({
    queryKey: ["getProducts", filter],
    queryFn: () => axiosPublic.get(link),
  });

  if (isLoading || isRefetching) return { isLoading: true };

  if (isError) return { error };

  return data?.data;
};
export default useProducts;
