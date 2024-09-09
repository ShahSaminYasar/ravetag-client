import { createContext, useEffect, useState } from "react";
import useCart from "../hooks/GET/usecart";

export const ValuesContext = createContext();

const ValuesProvider = ({ children }) => {
  const [cart, setCart] = useState();
  const [cartTotal, setCartTotal] = useState(120);
  const [firstStageDone, setFirstStageDone] = useState(false);

  const getCart = useCart();

  useEffect(() => {
    if (getCart?.isLoading) return;
    console.log("Entered getCart...");

    if (getCart && JSON.stringify(getCart) !== JSON.stringify(cart)) {
      if (!firstStageDone) {
        console.log("Setting cart to localstorage...");
        setCart(getCart);
      } else {
        console.log("Setting localstorage to cart...");
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    }

    setFirstStageDone(true);
  }, [getCart, cart]);

  const values = { cartTotal, setCartTotal, cart, setCart };

  return (
    <ValuesContext.Provider value={values}>{children}</ValuesContext.Provider>
  );
};

export default ValuesProvider;
