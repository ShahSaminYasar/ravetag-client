import Container from "../../layouts/Container/Container";
import LoaderDiv from "../../components/Loaders/LoaderDiv";
import CustomerDetails from "../../components/Checkout/CustomerDetails";
import { useValues } from "../../hooks/Contexts/useValues";
import { useEffect, useState } from "react";
import { useAxiosPublic } from "../../hooks/Axios/useAxiosPublic";

const CheckoutCart = () => {
  // const [products, setProducts] = useState([]);

  // const getCart = useCart([]);

  // useEffect(() => {
  //   if (
  //     getCart?.length > 0 &&
  //     JSON.stringify(getCart) !== JSON.stringify(products)
  //   ) {
  //     setProducts(getCart);
  //   }
  // }, [getCart, products]);

  const axiosPublic = useAxiosPublic();

  const { cart: products, setCart } = useValues();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAndUpdate = async () => {
      setLoading(true);

      let updatedCart = [...products];

      for (let i = 0; i < updatedCart?.length; i++) {
        if (updatedCart[i] && "price" in updatedCart[i]) {
          continue;
        } else {
          let price = await axiosPublic.get(
            `/product-price?id=${updatedCart[i]?.id}`
          );
          updatedCart[i].price = price?.data?.result;
        }
      }

      if (JSON.stringify(products) !== JSON.stringify(updatedCart)) {
        console.log("Not same..");
        setCart(updatedCart);
      }

      setLoading(false);
    };

    checkAndUpdate();
  }, [products]);

  if (loading) return <LoaderDiv />;

  return (
    <Container className="grid grid-cols-1 lg:grid-cols-5 gap-7 justify-center items-start">
      <div className="lg:col-span-3 px-5 py-7">
        <span className="text-slate-800 text-2xl block text-left capitalize mb-3">
          Customer Details
        </span>
        <CustomerDetails
          products={products}
          total={
            products.reduce((total, product) => {
              return total + product.price * product?.quantity;
            }, 0) + 130
          }
        />
      </div>

      {/* Purchase Details */}
      <div className="lg:col-span-2 sticky top-0 px-5 py-7 bg-slate-100 flex flex-col gap-3 border-x-2 border-slate-400 border-dashed lg:border-b-2">
        <span className="text-slate-800 text-2xl block text-left capitalize mb-3">
          Purchase Details
        </span>

        {products?.map((product) => (
          <div
            key={product?.id}
            className="flex flex-row gap-3 items-center justify-between"
          >
            <div className="relative w-fit">
              <img
                src={product?.image}
                alt={product?.name}
                className="w-[70px] aspect-square rounded-md object-contain"
              />
              <span className="absolute w-[20px] h-[20px] bg-red-600 grid place-content-center rounded-full text-sm text-white -top-1 -right-1">
                {product?.quantity}
              </span>
            </div>
            {/* Details */}
            <div className="text-slate-800 text-sm text-left flex flex-col gap-1">
              <span>{product?.name}</span>
              <span className="text-slate-500 italic">
                {product?.color} / {product?.size}
              </span>
            </div>
            {/* Price */}
            <span className="text-sm text-slate-800">
              Tk {product?.price * product?.quantity}
            </span>
          </div>
        ))}

        <div className="text-sm text-slate-800 flex flex-col gap-2 mt-7">
          <div className="flex flex-row justify-between items-center">
            <span>Subtotal ({products?.length} item/s)</span>
            <span className="font-semibold">
              Tk{" "}
              {products.reduce((total, product) => {
                return total + product.price * product?.quantity;
              }, 0)}
            </span>
          </div>
          <div className="flex flex-row justify-between items-center">
            <span>Shipping</span>
            <span className="font-semibold">Tk 130.00</span>
          </div>
          <div className="flex flex-row justify-between items-center text-lg">
            <span>Total</span>
            <span className="font-semibold text-xl">
              Tk{" "}
              {products.reduce((total, product) => {
                return total + product.price * product?.quantity;
              }, 0) + 130}
            </span>
          </div>
        </div>
      </div>
    </Container>
  );
};
export default CheckoutCart;
