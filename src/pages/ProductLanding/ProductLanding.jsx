import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useProducts from "../../hooks/GET/useProducts";
import Container from "../../layouts/Container/Container";
import CustomerDetails from "../../components/Checkout/CustomerDetails";
import "./ProductLanding.css";
import LoaderScreen from "../../components/Loaders/LoaderScreen";
import { Helmet } from "react-helmet";

const ProductLanding = () => {
  const { id } = useParams();

  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(false);

  const [images, setImages] = useState([]);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState();
  const [selectedColor, setSelectedColor] = useState();
  const [selectedSize, setSelectedSize] = useState();
  const [sizeWarning, setSizeWarning] = useState(false);
  const [stockOut, setStockOut] = useState(false);

  const getProduct = useProducts({ id });

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    if (Array.isArray(getProduct)) {
      setProduct(getProduct?.[0]);
      console.log(getProduct?.[0]);
      setLoading(false);

      setImages(getProduct?.[0]?.variants[0]?.images);
      setActiveImage(0);
      setSelectedVariant(getProduct?.[0]?.variants[0]);
      setSelectedColor(getProduct?.[0]?.variants[0]?.name);
      setSelectedSize();
      setStockOut(false);
    }
  }, [id, getProduct]);

  if (loading) return <LoaderScreen />;

  return (
    <>
      <Helmet>
        <title>{product?.name || "Product"} | RaveTag BD</title>
        <meta
          property="og:title"
          content={`${product?.name || "Product"} | RaveTag BD`}
        />
        <meta
          property="og:description"
          content={`${
            product?.description ||
            "RaveTag is a men's clothing store located in Beanibazar, Sylhet, offering the latest products from world-class brands."
          }`}
        />
        <meta
          property="og:image"
          itemProp="image"
          content={`${product?.images?.[0]}`}
        />
      </Helmet>
      <div className="product-landing-container">
        <div className="bg-red-700 text-white text-xs py-[2px] px-2">
          <Container
            className={"flex flex-row justify-between items-center flex-wrap"}
          >
            <a href="#location">Azir Market, Beanibazar, Sylhet</a>
            <a href="tel:01778070630">+880 1778-070630</a>
          </Container>
        </div>
        <header className="w-full bg-red-600 text-white text-center py-2 px-2 text-2xl shadow-sm">
          <Link to="/">RaveTag</Link>
        </header>

        <Container
          className={`px-2 flex flex-col gap-3 items-center font-normal text-slate-800 py-5 text-sm`}
        >
          {/* Product Image */}
          <img
            src={`${
              product?.images?.[0] ||
              "https://tocas-ui.com/5.0/zh-tw/assets/images/16-9.png"
            }`}
            alt="Product Image"
            className="w-full max-w-[400px] aspect-square object-contain"
          />

          {/* Product Name */}
          <h1 className="text-3xl font-medium">{product?.name}</h1>

          {/* Product Prices */}
          <span className="font-semibold text-lg text-red-700 -mb-2">
            Regular price Tk {product?.price}
          </span>
          <span className="font-medium text-3xl text-yellow-400 block w-fit px-2 py-2 bg-indigo-600">
            Offer price{" "}
            <span className="font-bold">Tk {product?.offer_price}</span>
          </span>

          {/* Product Content */}
          <p>{product?.description}</p>
          {/* {product?.images?.length > 1 && (
          <img
            src={product?.images?.[1]}
            alt="Product image"
            className="w-full max-w-[400px] aspect-square object-contain"
          />
        )} */}

          {/* Order Details */}
          <span className="font-medium text-sm w-full block text-center p-2 bg-violet-900 text-white mt-5 uppercase">
            Select color and Size
          </span>
          <div className="overflow-hidden">
            <img
              className="rounded-md border-2 border-slate-200 border-dashed w-full max-w-[300px] aspect-square object-contain"
              src={`${
                images?.[activeImage] ||
                "https://tocas-ui.com/5.0/zh-tw/assets/images/16-9.png"
              }`}
              alt="Product Image"
            />
            <div className="flex flex-row flex-wrap gap-2 my-5">
              {images?.map((image, i) => (
                <img
                  key={image}
                  src={`${
                    image ||
                    "https://tocas-ui.com/5.0/zh-tw/assets/images/16-9.png"
                  }`}
                  onClick={() => {
                    setActiveImage(i);
                  }}
                  className={`w-[70px] aspect-square object-contain border-2 border-dashed border-red-200 cursor-pointer ${
                    activeImage == i && "opacity-50"
                  }`}
                />
              ))}
            </div>

            {/* Colors */}
            <span className="underline mb-1">Colors</span>
            <div className="flex flex-row gap-2 items-center justify-start mb-3">
              {product?.variants?.map((variant) => (
                <div key={variant?.name} className="flex flex-col items-center">
                  <button
                    className={`block w-[50px] aspect-square cursor-pointer border-2 ${
                      selectedColor == variant?.name
                        ? "border-slate-800"
                        : "border-transparent"
                    }`}
                    onClick={() => {
                      setSelectedVariant(variant);
                      setSelectedColor(variant?.name);
                      setImages(variant?.images);
                      setActiveImage(0);
                      setSelectedSize();
                      setStockOut(false);
                    }}
                  >
                    <img
                      src={variant?.images[0]}
                      alt="Product Image"
                      className="aspect-square object-cover"
                    />
                  </button>
                  <span
                    className={`text-[12px] ${
                      selectedColor == variant?.name
                        ? "text-slate-800"
                        : "text-slate-400"
                    }`}
                  >
                    {variant?.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Sizes */}
            <div className="relative">
              <span className="underline">Sizes</span>
              <span
                className={`block absolute px-2 py-1 bg-red-600 text-white shadow-sm -top-[15px] left-[50px] border-2 border-red-500 rounded-sm pointer-events-none ${
                  sizeWarning ? "opacity-100" : "opacity-0"
                }`}
              >
                Please select a size
              </span>
            </div>

            <div className="flex flex-row gap-2 items-center justify-start mb-8">
              {selectedVariant?.sizes?.map((size) => (
                <button
                  key={size?.size}
                  className={`block text-sm text-slate-800 w-[40px] h-[40px] border-2 cursor-pointer rounded-full overflow-hidden ${
                    size?.stock == 0 && "opacity-50 line-through"
                  } ${
                    selectedSize == size?.size
                      ? "border-slate-800"
                      : "border-slate-300"
                  }`}
                  onClick={() => {
                    setSizeWarning(false);
                    setSelectedSize(size?.size);
                    if (size?.stock == 0) {
                      setStockOut(true);
                    } else {
                      setStockOut(false);
                    }
                  }}
                >
                  {size?.size}
                </button>
              ))}
            </div>
          </div>

          {/* Delivery Details */}
          <span className="font-medium text-sm w-full block text-center p-2 bg-violet-900 text-white mt-5 uppercase">
            Delivery Details
          </span>

          {/* Purchase Details */}
          <div className="px-5 py-7 bg-slate-100 flex flex-col gap-3 border-2 border-slate-300 border-dashed w-full max-w-[700px]">
            <span className="text-slate-800 text-2xl block text-left capitalize mb-3">
              Purchase Details
            </span>

            <div
              key={product?.id}
              className="flex flex-row gap-3 items-center justify-between"
            >
              <div className="relative w-fit">
                <img
                  src={`${
                    images?.[activeImage] ||
                    "https://tocas-ui.com/5.0/zh-tw/assets/images/16-9.png"
                  }`}
                  alt={product?.name}
                  className="w-[70px] aspect-square rounded-md object-contain"
                />
                <span className="absolute w-[20px] h-[20px] bg-red-600 grid place-content-center rounded-full text-sm text-white -top-1 -right-1">
                  1
                </span>
              </div>
              {/* Details */}
              <div className="text-slate-800 text-sm text-left flex flex-col gap-1">
                <span>{product?.name}</span>
                <span className="text-slate-500 italic">
                  {selectedColor} / {selectedSize || "No size selected"}
                </span>
              </div>
              {/* Price */}
              <span className="text-sm text-slate-800">
                Tk {product?.offer_price}
              </span>
            </div>

            <div className="text-sm text-slate-800 flex flex-col gap-2 mt-7">
              <div className="flex flex-row justify-between items-center">
                <span>Subtotal (1 item)</span>
                <span className="font-semibold">Tk {product?.offer_price}</span>
              </div>
              <div className="flex flex-row justify-between items-center">
                <span>Shipping</span>
                <span className="font-semibold">Tk 130.00</span>
              </div>
              <div className="flex flex-row justify-between items-center text-lg">
                <span>Total</span>
                <span className="font-semibold text-xl">
                  Tk {product?.offer_price + 130}
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-white w-full max-w-[700px] border-2 border-slate-400 border-dashed">
            <CustomerDetails
              products={[product]}
              total={product?.offer_price + 130}
              setSizeWarning={setSizeWarning}
              selectedColor={selectedColor}
              selectedSize={selectedSize}
              stockOut={stockOut}
              variantImage={images?.[activeImage]}
            />
          </div>
        </Container>
      </div>
    </>
  );
};
export default ProductLanding;
