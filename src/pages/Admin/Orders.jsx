import { useEffect, useState } from "react";
import { useAxiosPublic } from "../../hooks/Axios/useAxiosPublic";
import Container from "../../layouts/Container/Container";
import LoaderScreen from "../../components/Loaders/LoaderScreen";
import { Link } from "react-router-dom";

const Orders = () => {
  const axios = useAxiosPublic();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      let res = await axios.get("/orders");
      setLoading(false);
      setOrders(res?.data?.result);
    };

    fetchOrders();
  }, []);

  return loading ? (
    <LoaderScreen />
  ) : (
    <Container>
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
export default Orders;
