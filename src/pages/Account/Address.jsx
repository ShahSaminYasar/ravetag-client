import { useEffect, useState } from "react";
import Loader from "../../components/Loaders/Loader";
import Container from "../../layouts/Container/Container";
import { useValues } from "../../hooks/Contexts/useValues";
import Title from "../../components/Title/Title";
import Swal from "sweetalert2";
import { useAxiosPublic } from "../../hooks/Axios/useAxiosPublic";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, Navigate } from "react-router-dom";
import LoaderDiv from "../../components/Loaders/LoaderDiv";

const Address = () => {
  const axios = useAxiosPublic();
  const { user, loading: userLoading } = useValues();

  const [customerDetails, setCustomerDetails] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCustomerDetails(
      JSON.parse(localStorage.getItem("customer_details")) || {}
    );
  }, []);

  if (userLoading) return <LoaderDiv />;

  if (!user?.phone) {
    return <Navigate to={`/login`} />;
  }

  const saveDetails = async (e) => {
    event.preventDefault();
    setLoading(true);

    const { email, name, address, apartment, city, postal_code } = e.target;

    const customerData = {
      phone: `+${user?.phone}`,
      email: email?.value,
      name: name?.value,
      address: address?.value,
      apartment: apartment?.value,
      city: city?.value,
      postal_code: postal_code?.value,
    };

    try {
      localStorage.setItem("customer_details", JSON.stringify(customerData));
      const result = await axios.post("/customer", { customerData });
      if (result?.data?.message === "success") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Delivery details updated successfully.",
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        Swal.fire({
          position: "center",
          icon: "info",
          title:
            result?.data?.message || "Unknown error occured, please retry.",
          showConfirmButton: true,
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        position: "center",
        icon: "error",
        title:
          error?.data?.response?.message || "An error occured, please retry.",
        showConfirmButton: true,
      });
    }
    setLoading(false);
  };

  return (
    <Container className={`py-10 px-2`}>
      {/* Title */}
      <Title>Delivery Details</Title>

      {/* Form */}
      <form
        onSubmit={(e) => saveDetails(e)}
        className="flex flex-col gap-3 text-sm w-full max-w-[800px] mx-auto border-dashed border-2 border-slate-200 p-5 m-2"
      >
        {/* Contact Details */}
        <span className="text-slate-700 text-lg font-medium block text-left capitalize -mb-2">
          Contact
        </span>
        <div className="flex flex-col lg:flex-row gap-3 justify-between items-center">
          {/* Phone number */}
          <span className="w-full p-3 bg-slate-100 rounded-md text-blue-900 font-medium text-lg shadow-sm">
            Phone: {user?.phone}{" "}
            <span
              className={`text-sm ${
                user?.verified ? "text-green-500" : "text-red-500"
              }`}
            >
              ({user?.verified ? "Verified" : "Not verified"})
            </span>
            <div
              className="tooltip tooltip-info font-light"
              data-tip="To change the phone number, you need to SIGN-OUT and login with the new number"
            >
              <button
                type="button"
                className="ml-3 w-[20px] h-[20px] rounded-full bg-slate-300 text-slate-700 text-sm"
              >
                ?
              </button>
            </div>
          </span>
          {/* Email Address */}
          <input
            type="email"
            name="email"
            placeholder="Email address (optional)"
            className="input input-bordered w-full"
            defaultValue={customerDetails?.email}
          />
        </div>

        {/* Delivery Details */}
        <span className="text-slate-700 text-lg font-medium block text-left capitalize -mb-2 mt-2">
          Delivery
        </span>
        {/* Full Name */}
        <span className="text-sm text-slate-800 font-medium block text-left -mb-2 mt-1">
          Full name
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
        <span className="text-sm text-slate-800 font-medium block text-left -mb-2 mt-1">
          Address
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
        <span className="text-sm text-slate-800 font-medium block text-left -mb-2 mt-1">
          Apartment, suite, etc. (optional)
        </span>
        <input
          type="text"
          name="apartment"
          placeholder="Apartment, suite, etc. (optional)"
          className="input input-bordered"
          defaultValue={customerDetails?.apartment}
        />

        <div className="flex flex-col md:flex-row gap-3 justify-between items-center">
          <div className="w-full">
            <span className="text-sm text-slate-800 font-medium block text-left mt-1">
              City
            </span>
            {/* City */}
            <input
              type="text"
              name="city"
              placeholder="City"
              className="input input-bordered w-full"
              required
              defaultValue={customerDetails?.city}
            />
          </div>

          {/* Post Code */}
          <div className="w-full">
            <span className="text-sm text-slate-800 font-medium block text-left mt-1">
              Post code
            </span>
            <input
              type="text"
              name="postal_code"
              placeholder="Postal code"
              className="input input-bordered w-full"
              defaultValue={customerDetails?.postal_code}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-row gap-3">
          <Link
            to="/account"
            className="text-lg px-3 py-3 bg-slate-300 text-slate-700 font-medium rounded-xl hover:bg-slate-200 min-w-[170px] flex flex-row gap-2 items-center justify-center"
          >
            <IoMdArrowRoundBack /> Go Back
          </Link>
          <button
            type="submit"
            className="text-lg px-3 py-3 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 disabled:opacity-70 disabled:bg-red-700 w-full"
            disabled={loading}
          >
            {loading ? <Loader /> : "Save details"}
          </button>
        </div>
      </form>
    </Container>
  );
};
export default Address;
