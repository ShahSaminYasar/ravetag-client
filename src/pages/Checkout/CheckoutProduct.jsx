import { useLocation } from "react-router-dom";
import Container from "../../layouts/Container/Container";
import { useEffect, useState } from "react";
import useProducts from "../../hooks/GET/useProducts";
import LoaderDiv from "../../components/Loaders/LoaderDiv";

const CheckoutProduct = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [products, setProducts] = useState([]);

  const id = queryParams.get("id");
  const size = queryParams.get("size");
  const color = queryParams.get("color");
  const img = queryParams.get("img");

  const getProduct = useProducts({ id: id });

  useEffect(() => {
    if (getProduct?.length > 0) {
      setProducts(getProduct);
    }
  }, [getProduct, id]);

  if (id && getProduct?.length == 0) return <LoaderDiv />;

  return (
    <Container className="grid grid-cols-1 lg:grid-cols-2 gap-7 justify-center items-start">
      <div className="px-5 py-7"></div>

      <div className="px-5 py-7 bg-slate-100 flex flex-col gap-3">
        {products?.map((product) => (
          <div
            key={product?._id}
            className="flex flex-row gap-3 items-center justify-between"
          >
            <div className="relative w-fit">
              <img
                src={img}
                alt={product?.name}
                className="w-[70px] aspect-square rounded-md"
              />
              <span className="absolute w-[15px] h-[15px] bg-red-600 grid place-content-center rounded-full text-xs text-white -top-1 -right-1">
                {"1"}
              </span>
            </div>
            {/* Details */}
            <div className="text-slate-800 text-sm text-left flex flex-col gap-1">
              <span>{product?.name}</span>
              <span className="text-slate-500 italic">
                {color} / {size}
              </span>
            </div>
            {/* Price */}
            <span className="text-sm text-slate-800">
              Tk {product?.offer_price}
            </span>
          </div>
        ))}

        <div className="text-sm text-slate-800">
          <div className="flex flex-row justify-between items-center">
            <span>Subtotal (1 item)</span>
            <span className="font-semibold">
              Tk {products?.[0]?.offer_price}
            </span>
          </div>
          <div className="flex flex-row justify-between items-center">
            <span>Shipping</span>
            <span className="font-semibold">Tk 130.00</span>
          </div>
          <div className="flex flex-row justify-between items-center text-lg">
            <span>Total</span>
            <span className="font-semibold text-xl">
              Tk {products?.[0]?.offer_price + 130}
            </span>
          </div>
        </div>
      </div>
    </Container>
  );
};
export default CheckoutProduct;
