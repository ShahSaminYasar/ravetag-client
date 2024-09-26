import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product?._id}`} className="w-fit">
      <div className="relative group w-full max-w-80 rounded-sm overflow-hidden shadow-sm bg-slate-50 border-dashed border-2 border-red-200">
        {/* Product Image */}
        <div className="w-full aspect-square overflow-hidden">
          <img
            src={product?.images?.[0]}
            alt={product?.name + " image"}
            className="w-full h-full object-cover group-hover:scale-110 ease-in-out duration-300"
          />
        </div>

        {/* Text Content */}
        <div className="transition-all flex flex-col gap-2 text-slate-900 p-3 translate-y-0 group-hover:-translate-y-20 bg-slate-50 bg-opacity-50 backdrop-blur-sm">
          {/* Product Name */}
          <span className="text-xl">{product?.name}</span>
          {/* Product Prices */}
          {product?.offer_price < product?.price ? (
            <div className="flex flex-row items-center gap-2 text-slate-400">
              <del>BDT {product?.price}</del>
              <span className="text-red-600 font-semibold text-lg">
                BDT {product?.offer_price}
              </span>
            </div>
          ) : (
            <span className="text-red-600 font-semibold text-lg">
              BDT {product?.price}
            </span>
          )}
        </div>
        {/* View Product Button */}
        <Link
          to={`/product/${product?._id}`}
          className="col-span-2 hidden flex-row justify-center items-center gap-2 w-full rounded-md bg-transparent text-red-600 font-semibold text-sm px-2 py-2 group-hover:flex absolute bottom-5 left-0 right-0"
        >
          <FaEye /> View
        </Link>
      </div>
    </Link>
  );
};
export default ProductCard;
