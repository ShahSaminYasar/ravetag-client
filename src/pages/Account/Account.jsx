import { Link, Navigate } from "react-router-dom";
import Container from "../../layouts/Container/Container";
import { IoBagCheckOutline, IoBagOutline } from "react-icons/io5";
import { FaRegAddressBook } from "react-icons/fa6";
import { useValues } from "../../hooks/Contexts/useValues";
import LoaderDiv from "../../components/Loaders/LoaderDiv";

const Account = () => {
  const { user, loading, setUser } = useValues();

  if (loading) return <LoaderDiv />;

  if (!user?.phone) return <Navigate to="/login" />;

  return (
    <Container className={`flex flex-col gap-3 items-center py-4 px-2`}>
      {/* {!user?.phone && (
        <Link
          to="/login"
          className="px-3 py-2 text-sm rounded-md bg-indigo-800 text-white block w-fit ml-auto"
        >
          Login
        </Link>
      )} */}
      {!user?.verified && (
        <Link
          to="/login"
          className="bg-teal-100 border-2 border-teal-600 rounded-md text-teal-600 font-normal flex flex-row gap-3 justify-between items-center flex-wrap w-full my-2 mx-3 text-md py-2 px-2"
        >
          <span>
            Please <span className="font-medium">verify</span> your phone number
          </span>
          <button
            type="button"
            className="px-2 py-1 text-white bg-teal-600 rounded-md"
          >
            Verify
          </button>
        </Link>
      )}
      <div
        className={`py-10 px-2 flex flex-row gap-7 flex-wrap justify-center`}
      >
        <Link
          to={`/purchases`}
          className="px-4 py-4 rounded-xl bg-blue-800 border-4 border-blue-400 text-white text-xl flex flex-col gap-2 items-center hover:shadow-xl"
        >
          <IoBagCheckOutline className="text-5xl" />
          <span>Purchases</span>
        </Link>

        <Link
          to={`/cart`}
          className="px-4 py-4 rounded-xl bg-orange-600 border-4 border-orange-300 text-white text-xl flex flex-col gap-2 items-center hover:shadow-xl"
        >
          <IoBagOutline className="text-5xl" />
          <span>Your Cart</span>
        </Link>

        <Link
          to={`/address`}
          className="px-4 py-4 rounded-xl bg-green-600 border-4 border-green-300 text-white text-xl flex flex-col gap-2 items-center hover:shadow-xl"
        >
          <FaRegAddressBook className="text-5xl" />
          <span>Address</span>
        </Link>
      </div>

      {user?.phone && (
        <button
          className="px-3 py-2 text-sm rounded-md bg-red-700 text-white block w-fit ml-auto"
          onClick={() => {
            localStorage.removeItem("user");
            return setUser({});
          }}
        >
          Logout
        </button>
      )}
    </Container>
  );
};
export default Account;
