import Container from "../../Container/Container";
import { Link, NavLink } from "react-router-dom";
import { FaRegUser, FaShoppingCart } from "react-icons/fa";
import { useValues } from "../../../hooks/Contexts/useValues";
import Title from "../../../components/Title/Title";
import { HiMenuAlt1 } from "react-icons/hi";
import { FaCaretDown } from "react-icons/fa";

const Header = () => {
  const { cart } = useValues();

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
      name: "Summer",
      subnav: [
        {
          name: "Shirts",
          path: "/shop?category=shirt",
        },
        {
          name: "T-Shirts & Drop Shoulders",
          path: "/shop?category=t-shirt",
        },
        {
          name: "Polo",
          path: "/shop?category=polo",
        },
        {
          name: "Trousers",
          path: "/shop?category=trouser",
        },
        {
          name: "Denim Pants",
          path: "/shop?category=denim-pant",
        },
        {
          name: "Shorts",
          path: "/shop?category=short",
        },
        {
          name: "Gavardine Pants",
          path: "/shop?category=gavardine-pant",
        },
        {
          name: "Formal Wear",
          path: "/shop?category=formal-wear",
        },
        {
          name: "Punjabis",
          path: "/shop?category=punjabi",
        },
      ],
    },
    {
      name: "Accessories",
      subnav: [
        {
          name: "Wallet",
          path: "/shop?category=wallet",
        },
        {
          name: "Belt",
          path: "/shop?category=belt",
        },
      ],
    },
    {
      name: "Jersey",
      path: "/shop?category=jersey",
    },
    {
      name: "Winter Collection",
      subnav: [
        {
          name: "Sweatshirt",
          path: "/shop?category=sweatshirt",
        },
        {
          name: "Trouser",
          path: "/shop?category=trouser",
        },
        {
          name: "Hoodie",
          path: "/shop?category=hoodie",
        },
        {
          name: "Jacket",
          path: "/shop?category=jacket",
        },
        {
          name: "Full Sleeve T-Shirts",
          path: "/shop?category=full-sleve-tshirt",
        },
        {
          name: "Denim & Vercity",
          path: "/shop?category=denim-pant",
        },
      ],
    },
  ];

  return (
    <>
      {/* Topbar */}
      <div className="bg-red-700 text-white text-sm py-1 px-2">
        <Container
          className={"flex flex-row justify-between items-center flex-wrap"}
        >
          <a href="#location">Azir Market, Beanibazar, Sylhet</a>
          <a href="tel:+8801778070630">+880 1778-070630</a>
        </Container>
      </div>

      {/* Header Desktop */}
      <header className="hidden lg:block bg-red-600 text-white px-2 w-full shadow-sm sticky top-0 z-50">
        <Container className="flex flex-row justify-between items-center h-[65px]">
          {/* LOGO */}
          <Link to="/" className="text-3xl">
            Rave<span className="text-yellow-400">Tag</span>
          </Link>
          {/* Navigation */}
          <div className="flex flex-row gap-7 text-lg text-white">
            {nav?.map((navLink) => {
              return navLink.subnav ? (
                <span className="relative text-white cursor-pointer group">
                  <span className="flex flex-row gap-1 items-center">
                    {navLink?.name}
                    <FaCaretDown />
                  </span>{" "}
                  <ul className="min-w-[200px] absolute top-[100%] left-0 bg-white shadow-md text-red-600">
                    {navLink?.subnav?.map((subNavLink) => (
                      <li
                        key={`${subNavLink?.name}${subNavLink?.path}`}
                        className="bg-white hover:bg-red-600 hover:text-white hidden group-hover:block"
                      >
                        <Link to={subNavLink?.path} className="block p-2">
                          {subNavLink?.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </span>
              ) : (
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

      {/* Header Mobile */}
      <header className="block lg:hidden bg-red-600 text-white px-2 w-full shadow-sm sticky top-0 z-50">
        <Container className="flex flex-row justify-between items-center h-[55px]">
          <label
            htmlFor="menu-drawer"
            className="text-white text-3xl cursor-pointer"
          >
            <HiMenuAlt1 />
          </label>

          {/* LOGO */}
          <Link to="/" className="text-3xl">
            Rave<span className="text-yellow-400">Tag</span>
          </Link>

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

      {/* Mobile Header Navbar Drawer */}
      <div className="drawer z-[60]">
        <input id="menu-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content"></div>
        <div className="drawer-side">
          <label
            htmlFor="menu-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="menu bg-white text-slate-800 min-h-full w-80 p-4">
            <div className="flex flex-col gap-3 text-sm text-slate-800 font-normal">
              <Title>
                Rave<span className="text-red-600">Tag</span>
              </Title>
              {nav?.map((navLink) => {
                return navLink?.subnav ? (
                  <span>
                    <span className="flex flex-row gap-1 items-center text-red-600">
                      {navLink?.name}
                      <FaCaretDown />
                    </span>
                    <div className="pl-2 flex flex-col items-start w-full">
                      {navLink?.subnav?.map((subNavLink) => (
                        <button
                          key={`${subNavLink?.name}${subNavLink?.path}`}
                          onClick={() =>
                            (document.getElementById(
                              "menu-drawer"
                            ).checked = false)
                          }
                          className="block w-full text-start"
                        >
                          <NavLink
                            to={subNavLink?.path}
                            className={({ isActive }) =>
                              `p-1 border-b-2 border-b-slate-100 block w-full ${
                                isActive ? "text-indigo-900" : "text-indigo-800"
                              }`
                            }
                          >
                            {subNavLink?.name}
                          </NavLink>
                        </button>
                      ))}
                    </div>
                  </span>
                ) : (
                  <button
                    key={navLink.name}
                    onClick={() =>
                      (document.getElementById("menu-drawer").checked = false)
                    }
                    className="block text-left border-b-2 border-b-slate-100"
                  >
                    <NavLink
                      to={navLink?.path}
                      className={({ isActive }) =>
                        `block w-full text-md font-normal ${
                          isActive ? "text-red-700" : "text-red-600"
                        }`
                      }
                    >
                      {navLink?.name}
                    </NavLink>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Header;
