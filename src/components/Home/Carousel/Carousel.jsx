import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import Container from "../../../layouts/Container/Container";

const swiper_img = {
  width: "100%",
  aspectRatio: "10/3",
  objectFit: "cover",
  borderRadius: "20px",
};

const Carousel = () => {
  return (
    <Container className="mt-4 rounded-2xl overflow-hidden px-2">
      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        autoplay={{
          delay: 3000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
        navigation={true}
        // pagination={{ clickable: true }}
        className="carouselSwiper"
      >
        <SwiperSlide>
          <img
            src={`https://picsum.photos/1280/720`}
            style={swiper_img}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={`https://i0.wp.com/www.nogorpolli.com/wp-content/uploads/2018/12/list-of-top-15-fashion-or-clothing-brands-house-in-bangladesh-richman-dorjibari-%E0%A6%A8%E0%A6%97%E0%A6%B0-%E0%A6%AA%E0%A6%B2%E0%A7%8D%E0%A6%B2%E0%A7%80-nogor-polli-apparel-clothing-fashion-store.png?resize=750%2C500&ssl=1`}
            style={swiper_img}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={`https://www.nogorpolli.com/wp-content/uploads/2018/12/list-of-top-15-fashion-or-clothing-brands-house-in-bangladesh-nogorpolli-%E0%A6%A8%E0%A6%97%E0%A6%B0-%E0%A6%AA%E0%A6%B2%E0%A7%8D%E0%A6%B2%E0%A7%80-nogor-polli-apparel-clothing-fashion-store.png`}
            style={swiper_img}
          />
        </SwiperSlide>
      </Swiper>
    </Container>
  );
};
export default Carousel;
