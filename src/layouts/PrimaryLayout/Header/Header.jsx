import Container from "../../Container/Container";
import { Link, NavLink } from "react-router-dom";
import { FaRegUser, FaShoppingCart } from "react-icons/fa";

const Header = () => {
  const nav = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Shop",
      path: "/shop",
    },
  ];

  return (
    <header className="bg-red-600 text-white px-2 w-full shadow-sm">
      <Container className="flex flex-row justify-between items-center h-[75px]">
        {/* LOGO */}
        <Link to="/" className="text-4xl">
          RaveTag
        </Link>
        {/* Navigation */}
        <div className="flex flex-row gap-3 text-lg text-white">
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
              `text-md font-normal ${
                isActive ? "text-yellow-400" : "text-white"
              }`
            }
          >
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
  );
};
export default Header;
