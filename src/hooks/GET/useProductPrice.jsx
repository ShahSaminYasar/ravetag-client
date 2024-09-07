import { useQuery } from "@tanstack/react-query";
import { useAxiosPublic } from "../Axios/useAxiosPublic";

const useProductPrice = (id) => {
  const axiosPublic = useAxiosPublic();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getProductPrice", id],
    queryFn: () => axiosPublic.get(`/product-price?id=${id}`),
  });

  if (isLoading) return { isLoading: true };
  if (isError) {
    console.error(error);
    return { error };
  }

  return data?.data?.result;
};
export default useProductPrice;
