import Container from "../../Container/Container";
import logo from "../../../assets/logo.png";
import { Link } from "react-router-dom";
import { FaDirections } from "react-icons/fa";
import { useEffect, useState } from "react";
import "./footer.css";

const Footer = () => {
  const [developerName, setDeveloperName] = useState("SHAH SAMIN YASAR");
  const [developerLink, setDeveloperLink] = useState(
    "https://shahsaminyasar.github.io/portfolio/home.html"
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (developerName === "SHAH SAMIN YASAR") {
        setDeveloperName("Tech Talk2");
        setDeveloperLink("https://www.techtalk2.com/");
      } else {
        setDeveloperName("SHAH SAMIN YASAR");
        setDeveloperLink(
          "https://shahsaminyasar.github.io/portfolio/home.html"
        );
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [developerName]);

  return (
    <footer className="bg-zinc-50 border-t-2 border-y-red-600">
      <Container
        className={`flex flex-row gap-8 flex-wrap justify-between items-start px-2 py-10`}
      >
        <img src={logo} alt="Logo" className="w-full max-w-52" />

        <div className="text-red-600 font-normal text-sm flex flex-col gap-0 items-start">
          <span className="text-md text-slate-800 font-bold mb-1">Pages</span>
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/account">Account</Link>
        </div>

        <div className="text-red-600 font-normal text-sm flex flex-col gap-0 items-start">
          <span className="text-md text-slate-800 font-bold mb-1">Socials</span>
          <a href="https://www.facebook.com/ravetag">Facebook</a>
          <a href="https://www.youtube.com/@ravetag2713">YouTube</a>
        </div>

        <a
          href="https://www.google.com/maps/dir//RaveTag+%E0%A6%B0%E0%A7%87%E0%A6%87%E0%A6%AC+%E0%A6%9F%E0%A7%87%E0%A6%97+R5C5%2B577+Beanibazar/@24.8204185,92.1581751,16z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3751cb85874089d1:0x87a52586bcd514fc!2m2!1d92.1582!2d24.8204151?entry=ttu&g_ep=EgoyMDI0MDkxOC4xIKXMDSoASAFQAw%3D%3D"
          className="btn bg-indigo-800 text-white hover:bg-indigo-900"
          target="_blank"
        >
          Map directions <FaDirections />
        </a>
      </Container>
      <div className="text-center text-xs font-normal text-slate-600 w-full border-t-2 border-red-600 py-2">
        <span>&copy; Copyright 2024 RaveTag | All rights reserved</span>
        <br />
        <span className="block text-slate-500 mt-1">
          Made with <span className="text-red-600">❤</span> by{" "}
          <a
            href={developerLink}
            target="_blank"
            id="developer"
            className="text-red-600 font-medium"
          >
            {developerName}
          </a>
        </span>
      </div>
    </footer>
  );
};
export default Footer;
