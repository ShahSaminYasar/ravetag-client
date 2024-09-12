import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Error from "../pages/Error/Error";
import PrimaryLayout from "../layouts/PrimaryLayout/PrimaryLayout";
import Shop from "../pages/Shop/Shop";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Account from "../pages/Account/Account";
import OrderConfirmation from "../pages/OrderConfirmation/orderConfirmation";
import Receipt from "../pages/Receipt/Receipt";
import ProductLanding from "../pages/ProductLanding/ProductLanding";
import Cart from "../pages/Cart/cart";
import Trending from "../pages/Trending/Trending";
import CheckoutCart from "../pages/Checkout/CheckoutCart";
import CheckoutProduct from "../pages/Checkout/CheckoutProduct";
import Address from "../pages/Account/Address";
import Login from "../pages/Account/Login";

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
        path: "/confirm-order",
        element: <OrderConfirmation />,
      },
      {
        path: "/receipt",
        element: <Receipt />,
      },
    ],
  },
  {
    path: "/product-lead",
    element: <ProductLanding />,
  },
]);
