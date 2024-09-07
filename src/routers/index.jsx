import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/home";
import Error from "../pages/Error/Error";
import PrimaryLayout from "../layouts/PrimaryLayout/PrimaryLayout";
import Shop from "../pages/Shop/Shop";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Account from "../pages/Account/account";
import Checkout from "../pages/Checkout/checkout";
import OrderConfirmation from "../pages/OrderConfirmation/orderConfirmation";
import Receipt from "../pages/Receipt/Receipt";
import ProductLanding from "../pages/ProductLanding/ProductLanding";
import Cart from "../pages/Cart/cart";

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
        path: "/product/:id",
        element: <ProductDetails />,
      },
      {
        path: "/account",
        element: <Account />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
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
