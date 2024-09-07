import { createContext, useEffect, useState } from "react";
import useCart from "../hooks/GET/usecart";

export const ValuesContext = createContext();

const ValuesProvider = ({ children }) => {
  const [cart, setCart] = useState();
  const [cartTotal, setCartTotal] = useState(120);

  const getCart = useCart();

  useEffect(() => {
    console.log("Entered getCart...");
    if (getCart?.isLoading) return;

    if (getCart && JSON.stringify(getCart) !== JSON.stringify(cart)) {
      console.log("Setting cart...");
      console.log(getCart);
      setCart(getCart);
    }
  }, [getCart]);

  const values = { cartTotal, setCartTotal, cart, setCart };

  return (
    <ValuesContext.Provider value={values}>{children}</ValuesContext.Provider>
  );
};

export default ValuesProvider;
