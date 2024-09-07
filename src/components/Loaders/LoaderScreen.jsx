import logo from "../../assets/logo_1-1.png";

const LoaderScreen = () => {
  return (
    <div className="w-full h-screen bg-white flex flex-col items-center justify-center">
      <div className="w-[100px] aspect-square rounded-full overflow-hidden">
        <img
          src={logo}
          alt="Logo"
          className="animation_pulse w-full h-full aspect-square"
        />
      </div>
    </div>
  );
};
export default LoaderScreen;
