import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Error from "../pages/Error/Error";
import PrimaryLayout from "../layouts/PrimaryLayout/PrimaryLayout";
import Shop from "../pages/Shop/Shop";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Account from "../pages/Account/Account";
import ProductLanding from "../pages/ProductLanding/ProductLanding";
import Cart from "../pages/Cart/cart";
import Trending from "../pages/Trending/Trending";
import CheckoutCart from "../pages/Checkout/CheckoutCart";
import CheckoutProduct from "../pages/Checkout/CheckoutProduct";
import Address from "../pages/Account/Address";
import Login from "../pages/Account/Login";
import Purchases from "../pages/Account/Purchases";
import Admin from "../pages/Admin/Admin";
import AddProduct from "../pages/Admin/AddProduct";
import AllProducts from "../pages/Admin/AllProducts";
import Orders from "../pages/Admin/Orders";
import EditProduct from "../pages/Admin/EditProduct";
import AdminRedirect from "../pages/Admin/AdminRedirect";
import AdminRoute from "./AdminRoute";
import AdminLogin from "../pages/Admin/AdminLogin";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PrimaryLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/trending",
        element: <Trending />,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },
      {
        path: "/account",
        element: <Account />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/address",
        element: <Address />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout/c",
        element: <CheckoutCart />,
      },
      {
        path: "/checkout/p",
        element: <CheckoutProduct />,
      },
      {
        path: "/purchases",
        element: <Purchases />,
      },
    ],
  },
  {
    path: "/product-lead/:id",
    element: <ProductLanding />,
  },
  {
    path: "/admin-login",
    element: <AdminLogin />,
  },
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <Admin />
      </AdminRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminRedirect />,
      },
      {
        path: "/admin/add-product",
        element: <AddProduct />,
      },
      {
        path: "/admin/edit-product/:id",
        element: <EditProduct />,
      },
      {
        path: "/admin/all-products",
        element: <AllProducts />,
      },
      {
        path: "/admin/orders",
        element: <Orders />,
      },
    ],
  },
]);
