import { useEffect, useState } from "react";
import ProductCard from "../../components/Shop/ProductCard/ProductCard";
import Container from "../../layouts/Container/Container";
import useProducts from "../../hooks/GET/useProducts";
import LoaderScreen from "../../components/Loaders/LoaderScreen";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

const Shop = () => {
  // const navigate = useNavigate();
  // const searchInputRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState({});

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const category = queryParams.get("category");
  const search = queryParams.get("search");
  const trending = queryParams.get("trending");

  useEffect(() => {
    if (category) {
      setFilter((filter) => ({ ...filter, category }));
    } else {
      setFilter({});
    }
    if (search) {
      setFilter((filter) => ({ ...filter, search }));
    }
    if (trending) {
      setFilter((filter) => ({ ...filter, top_sales: true }));
    }
  }, [location.search, category, search, trending]);

  const getProducts = useProducts(filter);

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

  // useEffect(() => {
  //   fetch("/json/products.json")
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       return setProducts(data);
  //     });
  // }, []);

  return (
    <>
      <Helmet>
        <title>{category?.toUpperCase() || "Shop"} | RaveTag BD</title>
      </Helmet>
      <Container className="px-2 py-3 pb-10">
        {/* Top Bar */}
        <div className="flex flex-row gap-5 justify-between items-center py-3 mb-2">
          <span className="block text-sm text-slate-500 font-normal text-left italic capitalize">
            {category && `Category: ${category}`}
            {search && `Searched for '${search}'`}
          </span>

          {/* Search input */}
          {/* <label className="input input-bordered input-sm flex items-center gap-2">
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
        </label> */}
        </div>

        {/* Products Grid */}
        <div className="w-full flex flex-row flex-wrap gap-7 justify-center">
          {products?.length > 0 ? (
            products
              ?.slice()
              ?.reverse()
              ?.map((product) => {
                return <ProductCard key={product?.sku} product={product} />;
              })
          ) : (
            <span>
              Sorry, no products of &quot;{category || "this category"}&quot;
              available at this moment!{" "}
              <Link to="/shop" className="text-red-600">
                Available Products
              </Link>
            </span>
          )}
        </div>
      </Container>
    </>
  );
};
export default Shop;
