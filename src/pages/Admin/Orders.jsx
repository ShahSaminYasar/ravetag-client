import { useEffect, useState } from "react";
import { useAxiosPublic } from "../../hooks/Axios/useAxiosPublic";
import Container from "../../layouts/Container/Container";
import LoaderScreen from "../../components/Loaders/LoaderScreen";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

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

  const changeStatus = async (id, status) => {
    try {
      let res = await axios.put(`/change-order-status`, { id, status });
      if (res?.data?.message == "success") {
        return Swal.fire({
          position: "center",
          icon: "success",
          title: "Status Changed",
          html: `<span style="color: #000000; font-weight: 400;">Order ID: ${id} <br/> Current Status: <span style="font-weight: 600; text-transform: uppercase;">${status}</span></span>`,
          showConfirmButton: true,
        }).then(() => {
          return window.location.reload();
        });
      } else {
        return Swal.fire({
          position: "center",
          icon: "error",
          title: "Failed",
          text: `${res?.data?.message}`,
          showConfirmButton: true,
        });
      }
    } catch (error) {
      return Swal.fire({
        position: "center",
        icon: "error",
        title: "Failed",
        text: `${error?.message}`,
        showConfirmButton: true,
      });
    }
  };

  return loading ? (
    <LoaderScreen />
  ) : (
    <Container>
      {orders
        ?.slice()
        ?.reverse()
        ?.map((order) => (
          <div
            key={order?.c_id}
            className="p-3 border-2 border-cyan-600 bg-cyan-100 text-sm text-slate-800 font-normal w-full max-w-[650px] mx-auto mb-4"
          >
            <div className="pb-1 mb-1 flex flex-row justify-between items-center">
              <span className="italic text-slate-500">
                Order date: {order?.date}
              </span>
              <select
                disabled={order?.status == "delivered"}
                defaultValue={order?.status}
                className={`select select-bordered select-sm disabled:bg-green-200 disabled:text-green-700 disabled:opacity-100 ${
                  order?.status === "pending"
                    ? "bg-orange-200 text-orange-700"
                    : order?.status === "processing"
                    ? "bg-blue-200 text-blue-700"
                    : order?.status === "delivered"
                    ? "bg-green-200 text-green-700"
                    : order?.status === "shipped"
                    ? "bg-violet-200 text-violet-700"
                    : "bg-slate-200 text-slate-500"
                }`}
                onChange={(e) => {
                  if (order?.status == "delivered") {
                    return;
                  }
                  changeStatus(order?._id, e.target.value);
                }}
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <span className="text-sm text-slate-800 font-medium block text-left border-b-2 border-b-cyan-600 pb-1">
              Customer details
            </span>
            <div className="pt-2 flex flex-col gap-1 items-start text-md text-slate-900 font-medium">
              <span>
                <span className="font-bold">Name:</span> {order?.customer?.name}
              </span>
              <span>
                <span className="font-bold">Phone:</span>{" "}
                {order?.customer?.phone}
              </span>
              <span>
                <span className="font-bold">Address:</span>{" "}
                {order?.customer?.Address}
              </span>
              <span>
                <span className="font-bold">Apartment:</span>{" "}
                {order?.customer?.apartment}
              </span>
              <span>
                <span className="font-bold">City:</span> {order?.customer?.city}
              </span>
              <span>
                <span className="font-bold">Post code:</span>{" "}
                {order?.customer?.postal_code}
              </span>
            </div>

            <span className="text-sm text-slate-800 font-medium block text-left border-b-2 border-b-cyan-600 pb-1 mt-3">
              Order receipt
            </span>
            {order?.order?.map((product) => (
              <div
                key={product?.id}
                className="flex flex-row gap-3 justify-between items-center py-4 border-b-2 border-b-cyan-200"
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

            <div className="border-t-2 border-t-cyan-600 flex flex-row justify-between items-center pt-2 text-sm">
              <span>Subtotal (with Shipping fee)</span>
              <span className="font-semibold">Tk {order?.bdt}</span>
            </div>
          </div>
        ))}
    </Container>
  );
};
export default Orders;
