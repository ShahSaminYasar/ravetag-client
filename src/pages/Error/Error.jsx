import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="grid content-center gap-3 text-slate-800 w-full min-h-screen text-center">
      <span className="font-bold text-5xl">Error</span>
      <span className="text-md font-normal">Go to <Link className="text-red-600 font-medium" to="/">Home</Link></span>
    </div>
  );
};
export default Error;
