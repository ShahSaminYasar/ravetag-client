import { useEffect, useState } from "react";
import moment from "moment";
import { useAxiosPublic } from "../../hooks/Axios/useAxiosPublic";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Loader from "../Loaders/Loader";
import { useValues } from "../../hooks/Contexts/useValues";
import LoaderDiv from "../Loaders/LoaderDiv";

const CustomerDetails = ({
  products,
  total,
  setSizeWarning,
  selectedColor,
  selectedSize,
  stockOut,
  variantImage,
}) => {
  const { user, setUser, loading: userLoading, setCart } = useValues();

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

  if (userLoading) return <LoaderDiv />;

  const confirmOrder = async (e) => {
    event.preventDefault();
    setConfirmingOrder(true);

    const { mobile, name, address, apartment, city, postal_code } = e.target;

    const newCustomerDetails = {
      phone: mobile?.value, //TODO
      name: name?.value,
      address: address?.value,
      apartment: apartment?.value,
      city: city?.value,
      postal_code: postal_code?.value,
    };
    setCustomerDetails(newCustomerDetails);

    if (!user?.phone) {
      setUser({
        phone: mobile?.value?.replace(/[^0-9]/g, ""),
        verified: false,
      });
    }

    if (saveDetails) {
      localStorage.setItem(
        "customer_details",
        JSON.stringify(newCustomerDetails)
      );
    } else {
      localStorage.removeItem("customer_details");
    }

    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let c_id = "";
    for (let i = 0; i < 5; i++) {
      c_id += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    let finalProductsArray = products;
    if (selectedColor) {
      if (!selectedSize) {
        setConfirmingOrder(false);
        Swal.fire({
          position: "center",
          icon: "info",
          title: "Size not selected",
          text: "Please select a size of the product.",
          showConfirmButton: true,
        });
        return setSizeWarning(true);
      }

      finalProductsArray = [
        {
          id: products?.[0]?._id,
          name: products?.[0]?.name,
          color: selectedColor,
          size: selectedSize,
          image: variantImage,
          quantity: 1,
          sku: products?.[0]?.sku,
          price: products?.[0]?.offer_price,
        },
      ];
    }

    const orderDetails = {
      customer: newCustomerDetails,
      order: finalProductsArray,
      bdt: total,
      date: moment().format("llll"),
      status: "pending",
      c_id,
    };

    const ls_orders = JSON.parse(localStorage.getItem("ls_orders")) || [];
    if (ls_orders?.length > 0) {
      localStorage.setItem(
        "ls_orders",
        JSON.stringify([...ls_orders, orderDetails])
      );
    } else {
      localStorage.setItem("ls_orders", JSON.stringify([orderDetails]));
    }

    try {
      const result = await axios.post("/place-order", {
        order_details: orderDetails,
      });

      if (result?.data?.message === "success") {
        setCart([]);
        setConfirmingOrder(false);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Order Placed",
          text: "We will call to your number for confirmation shortly.",
          showConfirmButton: true,
        }).then(() => navigate("/purchases"));
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
    <form
      onSubmit={(e) => confirmOrder(e)}
      className="flex flex-col gap-3 w-full max-w-[700px]"
    >
      {/* Contact Details */}
      <span className="text-slate-700 text-lg font-medium block text-left capitalize -mb-2">
        Contact Number{" "}
        <span className="text-sm italic">
          (Please include country code +880)
        </span>
      </span>
      {/* Phone number */}
      <input
        type="tel"
        name="mobile"
        placeholder="+88017*****123"
        className="input input-bordered w-full"
        required
        defaultValue={
          user?.phone ? `+${user?.phone}` : customerDetails?.phone || "+880"
        }
      />

      {/* Email Address */}
      {/* <input
        type="email"
        name="email"
        placeholder="Email address (optional)"
        className="input input-bordered"
        defaultValue={customerDetails?.email}
      /> */}

      {/* Delivery Details */}
      <span className="text-slate-700 text-lg font-medium block text-left capitalize -mb-2 mt-2">
        Delivery
      </span>
      {/* Full Name */}
      <span className="text-slate-700 text-md font-medium block text-left capitalize -mb-2 mt-2">
        Your Name
      </span>
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        className="input input-bordered"
        required
        defaultValue={customerDetails?.name}
      />
      {/* Address */}
      <span className="text-slate-700 text-md font-medium block text-left capitalize -mb-2 mt-2">
        Your Address
      </span>
      <input
        type="text"
        name="address"
        placeholder="Address"
        className="input input-bordered"
        required
        defaultValue={customerDetails?.address}
      />
      {/* Apartment */}
      <span className="text-slate-700 text-md font-medium block text-left capitalize -mb-2 mt-2">
        Your Apartment/Flat No. (optional)
      </span>
      <input
        type="text"
        name="apartment"
        placeholder="Apartment, suite, etc. (optional)"
        className="input input-bordered"
        defaultValue={customerDetails?.apartment}
      />
      {/* City */}
      <span className="text-slate-700 text-md font-medium block text-left capitalize -mb-2 mt-2">
        City
      </span>
      <input
        type="text"
        name="city"
        placeholder="City"
        className="input input-bordered"
        required
        defaultValue={customerDetails?.city}
      />
      {/* Post Code */}
      <span className="text-slate-700 text-md font-medium block text-left capitalize -mb-2 mt-2">
        Post Code
      </span>
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
      {/* <button
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
      </button> */}

      {/* Order Confirm Button */}
      <button
        type="submit"
        className="text-lg px-3 py-3 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 disabled:opacity-70 disabled:bg-red-700"
        disabled={confirmingOrder || (stockOut && stockOut === true)}
      >
        {confirmingOrder ? <Loader /> : "Confirm Order"}
      </button>
    </form>
  );
};
export default CustomerDetails;
