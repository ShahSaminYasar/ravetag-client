const useCart = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  return cart;
};
export default useCart;
