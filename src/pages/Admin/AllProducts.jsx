import { useEffect, useState } from "react";
import useProducts from "../../hooks/GET/useProducts";
import Title from "../../components/Title/Title";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useAxiosPrivate } from "../../hooks/Axios/useAxiosPrivate";

const AllProducts = () => {
  const getProducts = useProducts();
  const axios = useAxiosPrivate();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (Array.isArray(getProducts) && getProducts?.length > 0) {
      setProducts(getProducts);
    }
  }, [getProducts]);

  const handleDeleteProduct = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        confirmDelete();
      }
    });

    const confirmDelete = async () => {
      try {
        let res = await axios.delete(`/products?id=${id}`);
        if (res?.data?.message == "success") {
          return Swal.fire({
            title: "Deleted!",
            text: "The product has been deleted.",
            icon: "success",
          }).then(() => {
            window.location.reload();
          });
        } else {
          return Swal.fire({
            position: "center",
            icon: "error",
            title: "Failed",
            text:
              res?.data?.message ||
              "Failed to delete product, please try again.",
            showConfirmButton: true,
          });
        }
      } catch (error) {
        return Swal.fire({
          position: "center",
          icon: "error",
          title: "Error",
          text: error?.data?.message || "An error occured, please try again.",
          showConfirmButton: true,
        });
      }
    };
  };

  return (
    <section className="flex flex-col gap-3 w-full items-center">
      <Title>All Products</Title>
      {products
        ?.slice()
        ?.reverse()
        ?.map((product) => (
          <div
            key={products?._id}
            className="flex flex-row gap-2 items-center justify-between w-full max-w-[700px] overflow-x-auto shadow-md m-3 p-3 border-2 border-slate-100"
          >
            <img
              src={product?.images[0]}
              alt="Product Image"
              className="w-[100px] aspect-square object-contain"
            />

            <div className="flex flex-col gap-1 text-sm text-slate-800 font-normal">
              <span className="font-medium">{product?.name}</span>
              <span>SKU: {product?.sku}</span>
              <span>Category: {product?.category}</span>
              <span>Price: {product?.price}</span>
              <span>Offer Price: {product?.offer_price}</span>
              <span>Sales: {product?.sales}</span>
            </div>

            <div className="flex flex-col gap-1 text-sm text-slate-800 font-normal">
              <span>
                <span className="font-medium">Sizes:</span>{" "}
                {product?.variants?.map((variant) => (
                  <span key={variant?.name} className="block">
                    <span className="font-semibold">{variant?.name}:</span>{" "}
                    {variant?.sizes?.map((size) => (
                      <span key={`${size?.size}${size?.stock}`}>
                        {size?.size}
                        <span className="font-semibold">({size?.stock}</span>) |{" "}
                      </span>
                    ))}{" "}
                  </span>
                ))}
              </span>

              <div className="flex flex-wrap flex-row gap-1">
                <Link
                  to={`/product/${product?._id}`}
                  className="btn btn-sm bg-blue-600 text-white"
                >
                  View
                </Link>
                <Link
                  to={`/admin/edit-product/${product?._id}`}
                  className="btn btn-sm bg-orange-600 text-white"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDeleteProduct(product?._id)}
                  className="btn btn-sm bg-red-600 text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
    </section>
  );
};

export default AllProducts;
