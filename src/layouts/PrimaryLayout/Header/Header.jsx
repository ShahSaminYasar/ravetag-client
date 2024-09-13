import Container from "../../Container/Container";
import { Link, NavLink } from "react-router-dom";
import { FaRegUser, FaShoppingCart } from "react-icons/fa";
import { useValues } from "../../../hooks/Contexts/useValues";

const Header = () => {
  const {cart} = useValues();

  const nav = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Shop",
      path: "/shop",
    },
    {
      name: "Trending",
      path: "/trending",
    },
    {
      name: "Winter Collection",
      path: "/shop?category=hoodie",
    },
  ];

  return (
    <>
      <div className="bg-red-700 text-white text-sm py-1 px-2">
        <Container
          className={"flex flex-row justify-between items-center flex-wrap"}
        >
          <a href="#location">Azir Market, Beanibazar, Sylhet</a>
          <a href="tel:01778070630">+880 1778-070630</a>
        </Container>
      </div>
      <header className="bg-red-600 text-white px-2 w-full shadow-sm sticky top-0 z-50">
        <Container className="flex flex-row justify-between items-center h-[75px]">
          {/* LOGO */}
          <Link to="/" className="text-4xl">
            RaveTag
          </Link>
          {/* Navigation */}
          <div className="flex flex-row gap-5 text-lg text-white">
            {nav?.map((navLink) => {
              return (
                <NavLink
                  key={navLink.name}
                  to={navLink?.path}
                  className={({ isActive }) =>
                    `text-md font-normal ${
                      isActive ? "text-yellow-400" : "text-white"
                    }`
                  }
                >
                  {navLink?.name}
                </NavLink>
              );
            })}
          </div>
          {/* CTAs */}
          <div className="flex flex-row gap-5 items-center text-xl">
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `relative text-md font-normal ${
                  isActive ? "text-yellow-400" : "text-white"
                }`
              }
            >
              <span className="absolute w-[17px] h-[17px] bg-violet-800 grid place-content-center rounded-full text-[10px] text-white -top-2 -right-2">
                {cart?.length}
              </span>
              <FaShoppingCart />
            </NavLink>
            <NavLink
              to="/account"
              className={({ isActive }) =>
                `text-md font-normal ${
                  isActive ? "text-yellow-400" : "text-white"
                }`
              }
            >
              <FaRegUser />
            </NavLink>
          </div>
        </Container>
      </header>
    </>
  );
};
export default Header;
