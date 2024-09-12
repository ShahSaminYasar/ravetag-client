import { useEffect, useState } from "react";
import moment from "moment";
import { useAxiosPublic } from "../../hooks/Axios/useAxiosPublic";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Loader from "../Loaders/Loader";
import { useValues } from "../../hooks/Contexts/useValues";

const CustomerDetails = ({ products, total }) => {
  const { user, setUser } = useValues();

  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [saveDetails, setSaveDetails] = useState(true);

  const axios = useAxiosPublic();
  const navigate = useNavigate();

  const [customerDetails, setCustomerDetails] = useState({});
  const [confirmingOrder, setConfirmingOrder] = useState(false);

  useEffect(() => {
    setCustomerDetails(
      JSON.parse(localStorage.getItem("customer_details")) || {}
    );
  }, [user]);

  const confirmOrder = async (e) => {
    event.preventDefault();
    setConfirmingOrder(true);

    const { mobile, email, name, address, apartment, city, postal_code } =
      e.target;

    const newCustomerDetails = {
      phone: mobile?.value,
      email: email?.value,
      name: name?.value,
      address: address?.value,
      apartment: apartment?.value,
      city: city?.value,
      postal_code: postal_code?.value,
    };
    setCustomerDetails(newCustomerDetails);

    if (!user?.phone) {
      setUser({ phone: mobile?.value, verified: false });
    }

    if (saveDetails) {
      localStorage.setItem(
        "customer_details",
        JSON.stringify(newCustomerDetails)
      );
    } else {
      localStorage.removeItem("customer_details");
    }

    const orderDetails = {
      customer: newCustomerDetails,
      order: products,
      bdt: total,
      date: moment().format("llll"),
      status: "pending",
    };

    const ls_orders = JSON.parse(localStorage.getItem("ls_orders")) || [];
    localStorage.setItem(
      "ls_orders",
      JSON.stringify([...ls_orders, orderDetails])
    );

    try {
      const result = await axios.post("/place-order", {
        order_details: orderDetails,
      });

      if (result?.data?.message === "success") {
        localStorage.removeItem("cart");
        setConfirmingOrder(false);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your order was placed successfully.",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => navigate("/account")); //TODO
      } else {
        setConfirmingOrder(false);
        Swal.fire({
          position: "center",
          icon: "error",
          title: result?.data?.message,
          showConfirmButton: true,
        });
      }
    } catch (error) {
      setConfirmingOrder(false);
      console.error(error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: error?.message,
        showConfirmButton: true,
      });
    }
  };

  return (
    <form onSubmit={(e) => confirmOrder(e)} className="flex flex-col gap-3">
      {/* Contact Details */}
      <span className="text-slate-700 text-lg font-medium block text-left capitalize -mb-2">
        Contact
      </span>
      {/* Phone number */}
      <input
        type="tel"
        name="mobile"
        placeholder="Mobile phone number"
        className="input input-bordered w-full"
        required
        defaultValue={customerDetails?.phone || "+880"}
      />

      {/* Email Address */}
      <input
        type="email"
        name="email"
        placeholder="Email address (optional)"
        className="input input-bordered"
        defaultValue={customerDetails?.email}
      />

      {/* Delivery Details */}
      <span className="text-slate-700 text-lg font-medium block text-left capitalize -mb-2 mt-2">
        Delivery
      </span>
      {/* Full Name */}
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        className="input input-bordered"
        required
        defaultValue={customerDetails?.name}
      />
      {/* Address */}
      <input
        type="text"
        name="address"
        placeholder="Address"
        className="input input-bordered"
        required
        defaultValue={customerDetails?.address}
      />
      {/* Apartment */}
      <input
        type="text"
        name="apartment"
        placeholder="Apartment, suite, etc. (optional)"
        className="input input-bordered"
        defaultValue={customerDetails?.apartment}
      />
      {/* City */}
      <input
        type="text"
        name="city"
        placeholder="City"
        className="input input-bordered"
        required
        defaultValue={customerDetails?.city}
      />
      {/* Post Code */}
      <input
        type="text"
        name="postal_code"
        placeholder="Postal code"
        className="input input-bordered"
        defaultValue={customerDetails?.postal_code}
      />

      {/* Consent to save data */}
      <div className="flex flex-row gap-1 items-center text-slate-700 text-sm my-3">
        <input
          type="checkbox"
          name="save_details_flag"
          defaultChecked={saveDetails}
          onChange={(e) => setSaveDetails(e.target.checked)}
        />
        <span>Save this information for future</span>
      </div>

      {/* Shipping Method */}
      <span className="text-slate-700 text-lg font-medium block text-left capitalize -mb-2 mt-2">
        Shipping Method
      </span>
      <button
        type="button"
        className={`flex flex-row justify-between items-center border-[1px] rounded-md text-sm px-3 py-4 ${
          shippingMethod === "standard"
            ? "bg-green-100 border-green-700 text-green-700"
            : "bg-slate-100 border-slate-700 text-slate-700"
        }`}
        onClick={() => setShippingMethod("standard")}
      >
        <span>Standart Shipping</span>
        <span className="font-medium">Tk 130.00</span>
      </button>

      {/* Payment Method */}
      <span className="text-slate-700 text-lg font-medium block text-left capitalize -mb-2 mt-2">
        Payment Method
      </span>
      {/* Cash On Delivery (COD) */}
      <button
        type="button"
        className={`flex flex-row justify-between items-center border-[1px] rounded-md text-sm px-3 py-4 ${
          paymentMethod === "cod"
            ? "bg-blue-100 text-blue-700 border-blue-700"
            : "bg-slate-100 text-slate-600 border-slate-500"
        }`}
        onClick={() => setPaymentMethod("cod")}
      >
        <span>Cash On Delivery (COD)</span>
        <span
          className={`block w-[15px] h-[15px] rounded-full border-[1px] ${
            paymentMethod === "cod"
              ? "bg-blue-600 border-blue-600"
              : "bg-white border-slate-300"
          }`}
        ></span>
      </button>

      {/* BKash Payment */}
      <button
        type="button"
        className={`flex flex-row justify-between items-center border-[1px] rounded-md text-sm px-3 py-3 ${
          paymentMethod === "bkash"
            ? "bg-pink-100 text-pink-700 border-pink-700"
            : "bg-slate-100 text-slate-600 border-slate-500"
        }`}
        onClick={() => setPaymentMethod("bkash")}
      >
        <div className="flex flex-row items-center gap-2 justify-start">
          <img
            src={`https://seeklogo.com/images/B/bkash-logo-376D8E5FFA-seeklogo.com.png`}
            alt="bkash logo"
            className="w-[70px]"
          />
          <span>BKash Payment</span>
        </div>
        <span
          className={`block w-[15px] h-[15px] rounded-full border-[1px] ${
            paymentMethod === "bkash"
              ? "bg-pink-600 border-pink-600"
              : "bg-white border-slate-300"
          }`}
        ></span>
      </button>

      {/* Order Confirm Button */}
      <button
        type="submit"
        className="text-lg px-3 py-3 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 disabled:opacity-70 disabled:bg-red-700"
        disabled={confirmingOrder}
      >
        {confirmingOrder ? <Loader /> : "Confirm Order"}
      </button>
    </form>
  );
};
export default CustomerDetails;
