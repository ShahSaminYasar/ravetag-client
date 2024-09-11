import Carousel from "../../components/Home/Carousel/Carousel";
import Categories from "../../components/Home/Categories/Categories";
import Location from "../../components/Home/Location/Location";
import TopSales from "../../components/Home/TopSales/TopSales";

const Home = () => {
  return (
    <>
      <Carousel />
      <Categories />
      <TopSales />
      <Location />
    </>
  );
};
export default Home;
