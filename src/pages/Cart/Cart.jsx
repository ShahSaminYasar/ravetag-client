import { useEffect, useState } from "react";
import { useAxiosPublic } from "../../hooks/Axios/useAxiosPublic";
import { useValues } from "../../hooks/Contexts/useValues";
import LoaderDiv from "../../components/Loaders/LoaderDiv";
import { Link } from "react-router-dom";
import Container from "../../layouts/Container/Container";
import { IoCloseSharp } from "react-icons/io5";

const Cart = () => {
  const axiosPublic = useAxiosPublic();
  const { cart } = useValues();

  const [loading, setLoading] = useState(true);
  const [subtotal, setSubtotal] = useState(0);
  const [cartItems, setCartItems] = useState();

  useEffect(() => {
    if (!Array.isArray(cart)) return;

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

  const removeItem = async (i) => {
    let newCart = [...cartItems];
    newCart.splice(i, 1);
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCartItems(newCart);
  };

  if (cart?.isLoading) return <LoaderDiv />;
  if (cart?.error) {
    console.error(cart?.error);
    return "An error occured. Please refresh the page and try again.";
  }

  return (
    <Container className="py-10 px-2">
      <h2 className="text-3xl block text-center text-slate-900">Your Cart</h2>
      {/* Number of items */}
      <span className="block text-slate-500 mt-2 mb-5">
        {cartItems?.length} items
      </span>

      {/* Products In Cart */}
      <section className="grid grid-cols-3 gap-8">
        {loading ? (
          <div className="col-span-2">
            <LoaderDiv />
          </div>
        ) : cartItems?.length > 0 ? (
          <table className="col-span-2 w-full text-slate-800 text-left">
            <thead className="bg-slate-100">
              <th className="text-sm font-medium p-2">Product</th>
              <th className="text-sm font-medium p-2">Price</th>
              <th className="text-sm font-medium p-2">Quantity</th>
              <th className="text-sm font-medium p-2">Total</th>
            </thead>
            {!Array.isArray(cartItems) || loading ? (
              <LoaderDiv />
            ) : (
              cartItems?.map((item, i) => {
                return (
                  // Cart Item
                  <tr
                    key={`${item?.id}${item?.color}${item?.size}`}
                    className="my-5 text-sm text-slate-800 border-[1px] border-slate-300"
                  >
                    {/* Image */}
                    <td className="flex flex-row gap-3 pl-5 py-5">
                      <img
                        src={item?.image}
                        alt="Product Image"
                        className="w-[100px] aspect-square object-contain"
                      />
                      <div className="flex flex-col items-start gap-1 text-sm text-slate-800">
                        {/* Name */}
                        <span>{item?.name}</span>
                        {/* Color and Size */}
                        <span className="text-slate-500">
                          {item?.color} / {item?.size}
                        </span>
                      </div>
                    </td>

                    <td className="py-5">
                      {/* Price */}
                      <span className="font-bold">Tk {item?.price}</span>
                    </td>

                    <td className="py-5">
                      {/* Quantity */}
                      <div className="max-w-[100px] grid grid-cols-3 gap-0 border-2 rounded-md border-slate-700 text-slate-800 text-md text-center">
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
                        <span className="p-2 font-semibold">
                          {item?.quantity}
                        </span>
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
                    </td>

                    <td className="relative py-5 pr-3">
                      <span className="font-bold">
                        Tk {item?.price * item?.quantity}{" "}
                      </span>
                      <button
                        className="absolute right-3 top-[50%] -translate-y-[50%] text-xl text-slate-800"
                        onClick={() => removeItem(i)}
                      >
                        {" "}
                        <IoCloseSharp />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </table>
        ) : (
          <span className="col-span-2 block text-slate-800 text-md font-medium text-center">
            Your cart is empty.
          </span>
        )}

        <div className="col-span-1 w-full text-slate-800">
          <span className="text-sm block w-full pb-2 border-b-[2px] border-b-slate-800">
            Order summary
          </span>
          {/* Subtotal */}
          <div className="text-md text-slate-800 flex flex-row gap-5 flex-wrap justify-between text-sm items-center border-b-[1px] pb-2 mt-3 border-b-slate-200">
            <span className="font-medium">Subtotal</span>
            <span className="font-semibold text-md">
              {loading ? "Loading..." : `Tk ${subtotal}`}
            </span>
          </div>
          <div className="text-md text-slate-800 flex flex-row gap-5 flex-wrap justify-between text-sm items-center border-b-[1px] pb-2 mt-3 border-b-slate-200">
            <span className="font-medium">Shipping fee</span>
            <span className="font-semibold text-md">
              {loading
                ? "Loading..."
                : cartItems?.length == 0
                ? "Tk 0"
                : "Tk 130"}
            </span>
          </div>
          <div className="text-md text-slate-800 flex flex-row gap-5 flex-wrap justify-between text-sm items-center pb-2 mt-3">
            <span className="font-medium">Total</span>
            <span className="font-bold text-lg">
              {loading
                ? "Loading..."
                : cartItems?.length == 0
                ? "Tk 0"
                : `Tk ${subtotal + 130}`}
            </span>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-2 my-2">
            {cartItems?.length > 0 && (
              <Link
                to="/checkout"
                className="uppercase px-3 py-2 bg-red-600 border-2 border-red-600 text-white rounded-sm text-md w-full text-center"
                disabled={loading}
              >
                Proceed to Checkout
              </Link>
            )}
            <Link
              to="/shop"
              className="uppercase px-3 py-2 bg-white border-2 border-red-600 text-red-600 rounded-sm text-md w-full text-center font-semibold"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default Cart;
