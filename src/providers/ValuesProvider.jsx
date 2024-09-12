import { createContext, useEffect, useState } from "react";
import useCart from "../hooks/GET/usecart";

export const ValuesContext = createContext();

const ValuesProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(120);
  const [firstStageDone, setFirstStageDone] = useState(false);
  const [loading, setLoading] = useState(true);

  const getCart = useCart();

  useEffect(() => {
    setLoading(true);

    const ls_user = localStorage.getItem("user");

    if (!user && ls_user) {
      console.log("Found user in LS");
      let parsed_ls_user = JSON.parse(ls_user);

      if (parsed_ls_user?.phone) {
        setUser(JSON.parse(ls_user));
        console.log("Set user state from ls");
        setLoading(false);
      } else {
        setLoading(false);
      }
    } else if (user?.phone) {
      console.log("Found user in State");
      localStorage.setItem("user", JSON.stringify(user));
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (getCart?.isLoading) return;
    // console.log("Entered getCart...");

    if (getCart && JSON.stringify(getCart) !== JSON.stringify(cart)) {
      if (!firstStageDone) {
        // console.log("Setting cart to localstorage...");
        setCart(getCart);
      } else {
        // console.log("Setting localstorage to cart...");
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    }

    setFirstStageDone(true);
  }, [getCart, cart]);

  const values = {
    cartTotal,
    setCartTotal,
    cart,
    setCart,
    user,
    setUser,
    loading,
  };

  return (
    <ValuesContext.Provider value={values}>{children}</ValuesContext.Provider>
  );
};

export default ValuesProvider;
