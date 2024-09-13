import { useLocation } from "react-router-dom";
import Container from "../../layouts/Container/Container";
import { useEffect, useState } from "react";
import useProducts from "../../hooks/GET/useProducts";
import LoaderDiv from "../../components/Loaders/LoaderDiv";
import CustomerDetails from "../../components/Checkout/CustomerDetails";

const CheckoutProduct = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [products, setProducts] = useState([]);
  const [propProduct, setPropProduct] = useState([]);

  const id = queryParams.get("id");
  const size = queryParams.get("size");
  const color = queryParams.get("color");
  const img = queryParams.get("img");

  const getProduct = useProducts({ id: id });

  useEffect(() => {
    if (getProduct?.length > 0) {
      setProducts(getProduct);
      let propProductData = [
        {
          id,
          name: getProduct?.[0]?.name,
          color,
          size,
          image: img,
          quantity: 1,
          sku: getProduct?.[0]?.sku,
          price: getProduct?.[0]?.offer_price,
        },
      ];
      setPropProduct(propProductData);
    }
  }, [getProduct, id, color, img, size]);

  if (id && getProduct?.length == 0) return <LoaderDiv />;

  return (
    <Container className="grid grid-cols-1 lg:grid-cols-5 gap-7 justify-center items-start">
      <div className="lg:col-span-3 px-5 py-7">
        <span className="text-slate-800 text-2xl block text-left capitalize mb-3">
          Customer Details
        </span>
        <CustomerDetails
          products={propProduct}
          total={products?.[0]?.offer_price + 130}
        />
      </div>

      {/* Purchase Details */}
      <div className="lg:col-span-2 sticky top-0 px-5 py-7 bg-slate-100 flex flex-col gap-3 border-x-2 border-slate-400 border-dashed lg:border-b-2">
        <span className="text-slate-800 text-2xl block text-left capitalize mb-3">
          Purchase Details
        </span>

        {products?.map((product) => (
          <div
            key={product?._id}
            className="flex flex-row gap-3 items-center justify-between"
          >
            <div className="relative w-fit">
              <img
                src={img}
                alt={product?.name}
                className="w-[70px] aspect-square rounded-md object-contain"
              />
              <span className="absolute w-[20px] h-[20px] bg-red-600 grid place-content-center rounded-full text-sm text-white -top-1 -right-1">
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

        <div className="text-sm text-slate-800 flex flex-col gap-2 mt-7">
          <div className="flex flex-row justify-between items-center">
            <span>Subtotal (1 item)</span>
            <span className="font-semibold">
              Tk {products?.[0]?.offer_price || 0}
            </span>
          </div>
          <div className="flex flex-row justify-between items-center">
            <span>Shipping</span>
            <span className="font-semibold">Tk 130.00</span>
          </div>
          <div className="flex flex-row justify-between items-center text-lg">
            <span>Total</span>
            <span className="font-semibold text-xl">
              Tk {products?.[0]?.offer_price + 130 || 0}
            </span>
          </div>
        </div>
      </div>
    </Container>
  );
};
export default CheckoutProduct;
