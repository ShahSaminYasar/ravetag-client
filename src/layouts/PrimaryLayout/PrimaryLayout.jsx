import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

const PrimaryLayout = () => {
  return (
    <>
      {/* Header */}
      <Header />
      {/* Main */}
      <main>
        <Outlet />
      </main>
      {/* Footer */}
      <Footer />
    </>
  );
};
export default PrimaryLayout;
