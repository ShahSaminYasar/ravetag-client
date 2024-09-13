import Container from "../../Container/Container";
import logo from "../../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-slate-50 border-y-2 border-y-red-600">
      <Container
        className={`flex flex-row gap-3 flex-wrap justify-between items-center px-2 py-10`}
      >
        <img src={logo} alt="Logo" className="w-52" />

        <div className="text-[15px] w-52">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus
          blanditiis numquam unde aliquid perspiciatis itaque.
        </div>
      </Container>
    </footer>
  );
};
export default Footer;
