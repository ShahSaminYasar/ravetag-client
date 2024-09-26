import useCategoriesList from "../../../hooks/GET/useCategoriesList";
import Container from "../../../layouts/Container/Container";
import LoaderDiv from "../../Loaders/LoaderDiv";
import Title from "../../Title/Title";
import { Link } from "react-router-dom";

const Categories = () => {
  const getCategories = useCategoriesList();

  return (
    <Container className={`py-10 px-2`}>
      <Title>Categories</Title>
      <div className="flex flex-row gap-2 flex-wrap justify-center mt-7">
        {getCategories?.isLoading ? (
          <LoaderDiv />
        ) : getCategories?.error ? (
          "An error occured, please refresh the page."
        ) : (
          getCategories?.slice(0, 6)?.map((category) => (
            <Link key={category?.name} to={`/shop?category=${category?.name}`}>
              <div className="relative group w-[300px] aspect-[3/4] overflow-hidden">
                <img
                  src={category?.image}
                  alt={category?.name}
                  className="w-full h-full object-cover group-hover:scale-105"
                />
                <span className="text-3xl text-white font-light block text-center absolute bottom-3 left-0 right-0 uppercase group-hover:bottom-5">
                  {category?.name}
                </span>
              </div>
            </Link>
          ))
        )}
      </div>
    </Container>
  );
};
export default Categories;
