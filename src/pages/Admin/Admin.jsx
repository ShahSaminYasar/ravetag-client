import { HiMenuAlt1 } from "react-icons/hi";
import Container from "../../layouts/Container/Container";
import { Link, NavLink, Outlet } from "react-router-dom";
import Title from "../../components/Title/Title";

const Admin = () => {
  return (
    <>
      <header className="block bg-red-600 text-white px-2 w-full shadow-sm sticky top-0 z-50">
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
        </Container>
      </header>

      <Container className="py-7 px-2">
        <Outlet />
      </Container>

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
            <div className="flex flex-col gap-3 text-lg text-slate-800 font-normal">
              <Title>
                Rave<span className="text-red-600">Tag</span>
              </Title>
              <button
                onClick={() =>
                  (document.getElementById("menu-drawer").checked = false)
                }
                className="block text-left border-b-2 border-b-slate-100"
              >
                <NavLink
                  to="/admin/add-product"
                  className={({ isActive }) =>
                    `block w-full text-md font-normal ${
                      isActive ? "text-indigo-700" : "text-red-600"
                    }`
                  }
                >
                  Add Product
                </NavLink>
              </button>
              <button
                onClick={() =>
                  (document.getElementById("menu-drawer").checked = false)
                }
                className="block text-left border-b-2 border-b-slate-100"
              >
                <NavLink
                  to="/admin/orders"
                  className={({ isActive }) =>
                    `block w-full text-md font-normal ${
                      isActive ? "text-indigo-700" : "text-red-600"
                    }`
                  }
                >
                  Orders
                </NavLink>
              </button>
              <button
                onClick={() =>
                  (document.getElementById("menu-drawer").checked = false)
                }
                className="block text-left border-b-2 border-b-slate-100"
              >
                <NavLink
                  to="/admin/all-products"
                  className={({ isActive }) =>
                    `block w-full text-md font-normal ${
                      isActive ? "text-indigo-700" : "text-red-600"
                    }`
                  }
                >
                  All Products
                </NavLink>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
