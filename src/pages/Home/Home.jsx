import Carousel from "../../components/Home/Carousel/Carousel";
import Categories from "../../components/Home/Categories/Categories";
import Location from "../../components/Home/Location/Location";
import TopSales from "../../components/Home/TopSales/TopSales";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home | RaveTag BD</title>
      </Helmet>
      <Carousel />
      <Categories />
      <TopSales />
      <Location />
    </>
  );
};
export default Home;
