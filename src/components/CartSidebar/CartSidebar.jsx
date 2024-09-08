import { useEffect, useState } from "react";
import LoaderDiv from "../Loaders/LoaderDiv";
import { useAxiosPublic } from "../../hooks/Axios/useAxiosPublic";
import { useValues } from "../../hooks/Contexts/useValues";
import { Link } from "react-router-dom";

const CartSidebar = () => {
  const axiosPublic = useAxiosPublic();
  const { cart } = useValues();

  const [loading, setLoading] = useState(true);
  const [subtotal, setSubtotal] = useState(0);
  const [cartItems, setCartItems] = useState();

  useEffect(() => {
    if (!Array.isArray(cart)) return;

    console.log("Re-rendering cart sidebar...");

    const calculateSubtotal = async () => {
      setLoading(true);
      let total = 0;
      const newCart = [...cart];

      for (let item of newCart) {
        let price = await axiosPublic.get(`/product-price?id=${item?.id}`);
        price = price?.data?.result;
        item.price = price;
        total += price * item?.quantity;
      }

      setCartItems(newCart);
      setSubtotal(total);
      setLoading(false);
    };

    calculateSubtotal();
  }, [cart]);

  if (cart?.isLoading) return <LoaderDiv />;
  if (cart?.error) {
    console.error(cart?.error);
    return "An error occured. Please refresh the page and try again.";
  }

  return (
    <div>
      {/* Number of items */}
      <span>{cartItems?.length} items</span>

      {/* Products In Cart */}
      <div style={{ height: "260px", overflowY: "scroll" }}>
        {!Array.isArray(cartItems) || loading ? (
          <LoaderDiv />
        ) : (
          cartItems?.map((item, i) => {
            return (
              // Cart Item
              <div
                key={`${item?.id}${item?.color}${item?.size}`}
                className="flex flex-row gap-2 py-2 px-0 border-b-2 border-b-slate-100"
              >
                {/* Image */}
                <img
                  src={item?.image}
                  alt="Product Image"
                  className="w-[100px] aspect-square object-contain"
                />
                {/* Details */}
                <div className="flex flex-col items-start gap-1 text-sm text-slate-800">
                  {/* Name */}
                  <span>{item?.name}</span>
                  {/* Color and Size */}
                  <span className="text-slate-500">
                    {item?.color} / {item?.size}
                  </span>
                  {/* Price */}
                  <span className="font-bold">Tk {item?.price}</span>
                  {/* Quantity */}
                  <div className="grid grid-cols-3 gap-0 border-2 rounded-md border-slate-700 text-slate-800 text-md text-center">
                    <button
                      className="p-2 w-[35px]"
                      onClick={() => {
                        if (item?.quantity > 1) {
                          const updatedCart = [...cartItems];
                          updatedCart[i].quantity--;
                          setCartItems(updatedCart);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify(updatedCart)
                          );
                          setSubtotal((subtotal) => subtotal - item?.price);
                          console.log("-", updatedCart);
                        }
                      }}
                    >
                      -
                    </button>
                    <span className="p-2 font-semibold">{item?.quantity}</span>
                    <button
                      className="p-2 w-[35px]"
                      onClick={() => {
                        const updatedCart = [...cartItems];
                        updatedCart[i].quantity++;
                        setCartItems(updatedCart);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify(updatedCart)
                        );
                        setSubtotal((subtotal) => subtotal + item?.price);
                        console.log("+", updatedCart);
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="absolute bottom-3 left-3 right-4">
        {/* Subtotal */}
        <div className="text-md text-slate-800 flex flex-row gap-5 flex-wrap justify-between py-3 px-2 pr-4">
          <span className="font-semibold">Subtotal</span>
          <span className="font-bold text-lg">Tk {subtotal}</span>
        </div>

        {/* Buttons */}
        <div className="flex flex-row gap-2 pr-3">
          <Link
            to="/cart"
            className="px-3 py-2 bg-white border-2 border-red-600 text-red-600 rounded-sm text-lg w-full text-center font-semibold"
          >
            Visit Cart
          </Link>
          {cartItems?.length > 0 && (
            <Link
              to="/checkout"
              className="px-3 py-2 bg-red-600 border-2 border-red-600 text-white rounded-sm text-lg w-full text-center"
            >
              Checkout
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
export default CartSidebar;
