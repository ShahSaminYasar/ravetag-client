import { useEffect, useState } from "react";
import ProductCard from "../../components/Shop/ProductCard/ProductCard";
import Container from "../../layouts/Container/Container";
import useProducts from "../../hooks/GET/useProducts";
import LoaderScreen from "../../components/Loaders/LoaderScreen";

const Shop = () => {
  const [products, setProducts] = useState([]);

  const getProducts = useProducts();

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
    <Container className={`grid grid-cols-4`}>
      <section className="col-span-1 bg-slate-400">Filter Products</section>
      <section className="col-span-3 grid grid-cols-3 gap-6 p-5">
        {products?.map((product) => {
          return <ProductCard key={product?.sku} product={product} />;
        })}
      </section>
    </Container>
  );
};
export default Shop;
