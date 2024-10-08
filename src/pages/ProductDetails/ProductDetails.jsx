import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Container from "../../layouts/Container/Container";
import { FaArrowRight, FaShoppingCart } from "react-icons/fa";
// import useProducts from "../../hooks/GET/useProducts";
import LoaderScreen from "../../components/Loaders/LoaderScreen";
import { IoCloseSharp } from "react-icons/io5";
import CartSidebar from "../../components/CartSidebar/CartSidebar";
import { useValues } from "../../hooks/Contexts/useValues";
import { Helmet } from "react-helmet";
import { useAxiosPublic } from "../../hooks/Axios/useAxiosPublic";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const { cart, setCart } = useValues();
  const navigate = useNavigate();
  const axios = useAxiosPublic();

  // const getProduct = useProducts({ id: productId });

  const [productLoading, setProductLoading] = useState(true);
  const [productError, setProductError] = useState(null);

  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState();
  const [selectedColor, setSelectedColor] = useState();
  const [selectedSize, setSelectedSize] = useState();
  const [sizeWarning, setSizeWarning] = useState(false);
  const [stockOut, setStockOut] = useState(false);
  // const [cartOpen, setCartOpen] = useState(false);

  // useEffect(() => {
  //   if (Array.isArray(getProduct)) {
  //     setProduct(getProduct?.[0]);
  //     setImages(getProduct?.[0]?.variants[0]?.images);
  //     setActiveImage(0);
  //     setSelectedVariant(getProduct?.[0]?.variants[0]);
  //     setSelectedColor(getProduct?.[0]?.variants[0]?.name);
  //     setSelectedSize();
  //     setStockOut(false);
  //   }
  // }, [getProduct]);

  useEffect(() => {
    axios
      .get(`/products?id=${productId}`)
      .then((getProduct) => {
        setProduct(getProduct?.data?.[0]);
        setImages(getProduct?.data?.[0]?.variants[0]?.images);
        setActiveImage(0);
        setSelectedVariant(getProduct?.data?.[0]?.variants[0]);
        setSelectedColor(getProduct?.data?.[0]?.variants[0]?.name);
        setSelectedSize();
        setStockOut(false);
        return setProductLoading(false);
      })
      .catch((error) => {
        return setProductError(
          error?.message | "An error occured, please refresh the page!"
        );
      });
  }, []);

  const addToCart = () => {
    if (!selectedSize) {
      return setSizeWarning(true);
    }
    let details = {
      id: product?._id,
      name: product?.name,
      color: selectedColor,
      size: selectedSize,
      image: selectedVariant?.images?.[0],
      quantity: 1,
      sku: product?.sku,
    };

    let newCart = [...cart];
    const check = newCart.find(
      (item) =>
        item?.id == product?._id &&
        item?.color == selectedColor &&
        item?.size == selectedSize
    );
    if (check) {
      check.quantity++;
    } else {
      newCart.push(details);
    }
    console.log("Setting new cart...");
    // localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
    let cart_drawer_input = document.getElementById("cart-drawer");
    cart_drawer_input.checked = true;
    // setCartOpen(true);
  };

  const buyNow = () => {
    if (!selectedSize) {
      return setSizeWarning(true);
    }
    return navigate(
      `/checkout/p?id=${productId}&color=${selectedColor}&size=${selectedSize}&img=${images?.[activeImage]}`
    );
  };

  if (productLoading) {
    return <LoaderScreen />;
  }

  if (productError) {
    console.error(productError);
    return <p>{productError}</p>;
  }

  if (!productLoading && !product?.name) {
    return <Navigate to={"/shop"} />;
  }

  // //   TODO
  // useEffect(() => {
  //   fetch("/json/products.json")
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setImages(data[0]?.variants[0]?.images);
  //       setSelectedVariant(data[0]?.variants[0]);
  //       setSelectedColor(data[0]?.variants[0]?.name);
  //       return setProduct(data[0]);
  //     });
  // }, []);

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
          content={`${product?.images[0]}`}
        />
      </Helmet>
      <Container>
        <section className="grid grid-cols-1 lg:grid-cols-5 gap-14 py-6 px-2">
          {/* Image */}
          <div className="lg:col-span-3 overflow-hidden">
            <img
              className="rounded-md border-2 border-slate-200 border-dashed w-full max-w-80 lg:max-w-[600px] aspect-square object-contain mx-auto"
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
          </div>
          {/* Details */}
          <div className="lg:col-span-2 flex flex-col gap-1 text-sm text-slate-800">
            {/* Product Name */}
            <h1 className="text-3xl font-semibold text-slate-800 mb-3">
              {product?.name}
            </h1>

            {/* Product SKU */}
            <span className="text-slate-600 capitalize">
              SKU: {product?.sku}
            </span>

            {/* Category */}
            <span className="text-slate-600 capitalize mb-3">
              Category: {product?.category}
            </span>

            {/* Price */}
            <span className="text-xl font-semibold text-slate-900 -mb-2">
              Tk {product?.offer_price}
            </span>
            {product?.offer_price < product?.price && (
              <span className="text-slate-400 line-through mb-3">
                Tk {product?.price}
              </span>
            )}

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

            {/* CTAs */}
            <div>
              {/* Add To Cart Button */}
              <button
                className="w-full flex flex-row justify-center items-center gap-2 rounded-sm hover:bg-red-600 hover:text-white text-lg px-2 py-2 border-2 border-red-600 bg-transparent text-red-600 mb-3 disabled:opacity-70 disabled:pointer-events-none"
                disabled={stockOut}
                onClick={addToCart}
              >
                {stockOut ? (
                  "Out of Stock"
                ) : (
                  <>
                    <FaShoppingCart /> Add to cart
                  </>
                )}
              </button>
              {/* Buy Now Button */}
              <button
                className="w-full flex flex-row justify-center items-center gap-2 rounded-sm bg-red-600 text-white text-lg px-2 py-2 border-2 border-transparent hover:border-red-600 hover:bg-transparent hover:text-red-600 mb-8 disabled:opacity-50 disabled:pointer-events-none"
                disabled={stockOut}
                onClick={buyNow}
              >
                <FaArrowRight /> Buy it Now
              </button>
            </div>

            {/* Description */}
            <span className="underline mb-1">Description</span>
            <p className="text-sm text-slate-700 font-light">
              {product?.description}
            </p>
          </div>
        </section>

        {/* Cart Drawer */}
        <div className="drawer drawer-end z-[60]">
          <input id="cart-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
            {/* <label
            htmlFor="cart-drawer"
            className="drawer-button btn btn-primary"
          >
            Open drawer
          </label> */}
          </div>
          <div className="drawer-side">
            <label
              htmlFor="cart-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <div className="menu bg-white text-slate-800 min-h-full w-96 p-4 relative">
              <button
                className="text-3xl absolute block right-10 top-3"
                onClick={() => {
                  document.getElementById("cart-drawer").checked = false;
                  // setCartOpen(false);
                }}
              >
                <IoCloseSharp />
              </button>
              <span className="text-xl font-semibold text-slate-900 ">
                Your Cart
              </span>
              {/* {cartOpen && <CartSidebar />} TODO */}
              <CartSidebar />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};
export default ProductDetails;
