import { useEffect, useRef, useState } from "react";
import useProducts from "../../hooks/GET/useProducts";
import LoaderScreen from "../../components/Loaders/LoaderScreen";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/Shop/ProductCard/ProductCard";
import Container from "../../layouts/Container/Container";

const Trending = () => {
  const navigate = useNavigate();
  const searchInputRef = useRef(null);
  const [products, setProducts] = useState([]);

  const getProducts = useProducts({ top_sales: true });

  useEffect(() => {
    if (Array.isArray(getProducts)) {
      setProducts(getProducts);
    }
  }, [getProducts]);

  if (getProducts?.isLoading) {
    return <LoaderScreen />;
  }

  if (getProducts?.error) {
    console.error(getProducts?.error);
    return <p>{getProducts?.error}</p>;
  }

  return (
    <Container className="px-2 py-3">
      {/* Top Bar */}
      <div className="flex flex-row gap-5 justify-between items-center py-3 mb-2">
        {/* Search input */}
        <label className="input input-bordered input-sm flex items-center gap-2 ml-auto">
          <input
            type="text"
            className="grow"
            placeholder="Search"
            ref={searchInputRef}
          />
          <button
            onClick={() => {
              return navigate(`/shop?search=${searchInputRef.current.value}`);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </label>
      </div>

      {/* Products Grid */}
      <div className="w-full flex flex-row flex-wrap gap-7 justify-center">
        {products?.map((product) => {
          return <ProductCard key={product?.sku} product={product} />;
        })}
      </div>
    </Container>
  );
};
export default Trending;
