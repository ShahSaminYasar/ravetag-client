import Container from "../../layouts/Container/Container";

const LoaderScreen = () => {
  return (
    <Container>
      <div className="w-full bg-white grid grid-cols-1 sm:grid-cols-2 justify-center gap-10 px-3 py-7">
        {/* Left/Top */}
        <div className="skeleton w-full max-w-80 sm:max-w-[600px] mx-auto aspect-square"></div>
        {/* Right/Bottom */}
        <div className="flex w-full flex-col gap-4">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-[15%]"></div>
          <div className="skeleton h-4 w-[15%]"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      </div>
    </Container>

    // <div className="w-full h-screen bg-white flex flex-col items-center justify-center">
    //   <div className="w-[100px] aspect-square rounded-full overflow-hidden">
    //     <img
    //       src={logo}
    //       alt="Logo"
    //       className="animation_pulse w-full h-full aspect-square"
    //     />
    //   </div>
    // </div>
  );
};
export default LoaderScreen;
