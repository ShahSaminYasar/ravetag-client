import { useEffect, useState } from "react";
import { useValues } from "../../hooks/Contexts/useValues";
import { useAxiosPublic } from "../../hooks/Axios/useAxiosPublic";
import Container from "../../layouts/Container/Container";
import Title from "../../components/Title/Title";
import Swal from "sweetalert2";
import { Link, Navigate } from "react-router-dom";
import LoaderDiv from "../../components/Loaders/LoaderDiv";

const Purchases = () => {
  const { user, loading: userLoading } = useValues();

  const axios = useAxiosPublic();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchOrders = async () => {
      if (user?.phone) {
        const getOrders = await axios.get(
          `/orders?phone=${user?.phone?.replace(/[^0-9]/g, "")}`
        );
        setOrders(getOrders?.data?.result);
      } else {
        setOrders(JSON.parse(localStorage.getItem("ls_orders")));
      }
      setLoading(false);
    };

    fetchOrders();
  }, [user]);

  if (userLoading || loading) return <LoaderDiv />;
  if (!user?.phone) return <Navigate to="/login" />;

  const cancelOrder = async (c_id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "Your order will be cancelled!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, cancel it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .post("/cancel-order", { c_id })
            .then((res) => {
              if (res?.data?.message === "success") {
                Swal.fire({
                  title: "Cancelled!",
                  text: "Your order has been cancelled.",
                  icon: "success",
                });
                return window.location.reload();
              } else {
                return Swal.fire({
                  position: "center",
                  icon: "info",
                  title: res?.data?.message,
                  showConfirmButton: true,
                });
              }
            })
            .catch((error) => {
              console.error(error);
              return Swal.fire({
                position: "center",
                icon: "error",
                title: error?.message,
                showConfirmButton: true,
              });
            });
        }
      });
    } catch (error) {
      console.error(error);
      return Swal.fire({
        position: "center",
        icon: "error",
        title: error?.message,
        showConfirmButton: true,
      });
    }
  };

  return (
    <Container className={`flex flex-col gap-3 justify-center py-7 px-2`}>
      <Title>Your Orders</Title>

      {orders
        ?.slice()
        ?.reverse()
        ?.map((order) => (
          <div
            key={order?.date}
            className="p-3 border-2 border-slate-200 text-sm text-slate-800 font-normal w-full max-w-[650px] mx-auto mb-2"
          >
            <div className="pb-1 mb-1 border-b-2 border-b-slate-100 flex flex-row justify-between items-center">
              <span className="italic text-slate-500">
                Order date: {order?.date}
              </span>
              <span
                className={`text-sm py-1 px-2 rounded-sm capitalize ${
                  order?.status === "pending"
                    ? "bg-orange-200 text-orange-700"
                    : order?.status === "processing"
                    ? "bg-blue-200 text-blue-700"
                    : order?.status === "complete"
                    ? "bg-green-200 text-green-700"
                    : "bg-slate-200 text-slate-500"
                }`}
              >
                {order?.status}
              </span>
            </div>

            {order?.order?.map((product) => (
              <div
                key={product?.id}
                className="flex flex-row gap-3 justify-between items-center py-4 border-b-2 border-b-slate-100"
              >
                {/* Product Image */}
                <img
                  src={product?.image}
                  alt="Product Image"
                  className="w-[70px] aspect-square object-contain"
                />

                {/* Product Info */}
                <div className="flex flex-col gap-1">
                  <Link to={`/product/${product?.id}`}>{product?.name}</Link>
                  <span className="text-slate-600">
                    {product?.color} / {product?.size}
                  </span>
                  <span className="text-slate-600 mt-1 italic">
                    SKU: {product?.sku}
                  </span>
                </div>

                {/* Product Quantity and Price */}
                <div className="flex flex-col gap-1">
                  <span>Quantity: {product?.quantity}</span>
                  <span className="font-medium">
                    Unit price: Tk {product?.price}
                  </span>
                </div>
              </div>
            ))}

            <div className="flex flex-row justify-between items-center pt-2 text-sm">
              <span>Subtotal</span>
              <span className="font-semibold">Tk {order?.bdt}</span>
            </div>

            {order?.status === "pending" ? (
              <button
                type="button"
                onClick={() => cancelOrder(order?.c_id)}
                className="px-2 py-1 mt-2 text-sm bg-red-200 text-red-600 font-normal rounded-sm block w-fit ml-auto"
              >
                Cancel Order
              </button>
            ) : (
              order?.status !== "cancelled" && (
                <div
                  className="tooltip tooltip-warning font-light ml-auto block w-fit"
                  data-tip="Your order has been processed already and can't be cancelled."
                >
                  <button
                    type="button"
                    className="px-2 py-1 mt-2 text-sm bg-slate-200 text-slate-500 font-normal rounded-sm"
                  >
                    Cancel Order
                  </button>
                </div>
              )
            )}
          </div>
        ))}
    </Container>
  );
};
export default Purchases;
