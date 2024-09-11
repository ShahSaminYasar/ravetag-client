import useProducts from "../../../hooks/GET/useProducts";
import Container from "../../../layouts/Container/Container";
import LoaderDiv from "../../Loaders/LoaderDiv";
import ProductCard from "../../Shop/ProductCard/ProductCard";
import Title from "../../Title/Title";
import "./topSales.css";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Link } from "react-router-dom";

const TopSales = () => {
  const getProducts = useProducts({ top_sales: true });

  return (
    <Container className={`py-10 px-2`}>
      <Title>Top Sales</Title>
      {getProducts?.isLoading ? (
        <LoaderDiv />
      ) : getProducts?.error ? (
        "An error occured, please refresh the page."
      ) : (
        <Swiper
          modules={[Navigation, Pagination]}
          //   navigation={true}
          pagination={{ clickable: true }}
          className="topProductsSwiper mt-7"
          slidesPerView={3}
          spaceBetween={30}
        >
          {getProducts?.slice(0, 6)?.map((product) => (
            <SwiperSlide key={product?.sku}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <Link
        to="/shop"
        className="px-2 py-1 block w-fit bg-white text-slate-700 border-[1px] border-slate-500 shadow-sm mx-auto hover:scale-105"
      >
        View all Products
      </Link>
    </Container>
  );
};
export default TopSales;
