import Container from "../../layouts/Container/Container";

const LoaderScreenShop = () => {
  return (
    <Container>
      <div className="w-full bg-white flex flex-row flex-wrap justify-center gap-10 px-3 py-7">
        <div className="skeleton w-[300px] h-[350px]"></div>
        <div className="skeleton w-[300px] h-[350px]"></div>
        <div className="skeleton w-[300px] h-[350px]"></div>
        <div className="skeleton w-[300px] h-[350px]"></div>
        <div className="skeleton w-[300px] h-[350px]"></div>
        <div className="skeleton w-[300px] h-[350px]"></div>
      </div>
    </Container>
  );
};
export default LoaderScreenShop;
