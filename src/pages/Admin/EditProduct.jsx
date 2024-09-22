import { useEffect, useRef, useState } from "react";
import Title from "../../components/Title/Title";
import { useAxiosPublic } from "../../hooks/Axios/useAxiosPublic";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loaders/Loader";

const EditProduct = () => {
  const { id } = useParams();

  const axios = useAxiosPublic();

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [categories, setCategories] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [variants, setVariants] = useState([]);
  const [modified, setModified] = useState(false);

  const formRef = useRef(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (variants?.length == 0) {
        let getProduct = await axios.get(`/products?id=${id}`);
        getProduct = getProduct?.data;
        if (Array.isArray(getProduct) && getProduct?.length > 0) {
          setProductImages(getProduct[0]?.images);
          setVariants(getProduct[0]?.variants);
          formRef.current.name.value = getProduct[0]?.name;
          formRef.current.description.value = getProduct[0]?.description;
          formRef.current.category.value = getProduct[0]?.category;
          formRef.current.sku.value = getProduct[0]?.sku;
          formRef.current.price.value = getProduct[0]?.price;
          formRef.current.offer_price.value = getProduct[0]?.offer_price;
          formRef.current.sales.value = getProduct[0]?.sales;
          setModified(false);
          setLoading(false);
        }
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      if (categories?.length == 0) {
        let res = await axios.get("/categories");
        setCategories(res?.data?.result);
      }
    };

    fetchProduct();
    fetchCategories();
  }, []);

  const handleUpdateProduct = async () => {
    event.preventDefault();
    setUpdating(true);

    const name = formRef.current.name.value;
    const description = formRef.current.description.value;
    const category = formRef.current.category.value;
    const sku = formRef.current.sku.value;
    const price = Number(formRef.current.price.value);
    const offer_price = Number(formRef.current.offer_price.value);
    const sales = Number(formRef.current.sales.value);

    const data = {
      name,
      images: productImages,
      description,
      category,
      sku,
      price,
      offer_price,
      sales,
      variants,
    };

    try {
      const res = await axios.put("/products", { data, id });

      if (res?.data?.message === "success") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Success",
          text: "Product Updated",
          showConfirmButton: true,
        }).then(() => {
          return setUpdating(false);
        });
      } else {
        setUpdating(false);
        return Swal.fire({
          position: "center",
          icon: "error",
          title: "Failed",
          text: `${res?.data?.message}`,
          showConfirmButton: true,
        });
      }
    } catch (error) {
      setUpdating(false);
      return Swal.fire({
        position: "center",
        icon: "error",
        title: error?.message || "An error occured",
        showConfirmButton: true,
      });
    }
  };

  return (
    <div>
      <div
        className={`min-h-[90vh] w-full text-xl font-medium text-slate-800 content-center ${
          loading ? "grid" : "hidden"
        }`}
      >
        Loading...
      </div>

      <div className={`${!loading ? "block" : "hidden"}`}>
        <Title>Edit Product</Title>
        <form
          className="flex flex-col gap-4 bg-slate-100 p-2 rounded-md mt-5"
          ref={formRef}
          onSubmit={handleUpdateProduct}
        >
          <span className="block text-slate-800 text-sm text-left font-medium -mb-3">
            Product Name
          </span>
          <input
            name="name"
            type="text"
            placeholder="Product Name"
            className="input input-bordered"
          />

          <span className="block text-slate-800 text-sm text-left font-medium -mb-3">
            Product SKU
          </span>
          <input
            name="sku"
            type="text"
            placeholder="Product SKU"
            className="input input-bordered"
          />

          <span className="block text-slate-800 text-sm text-left font-medium -mb-3">
            Product Images
          </span>
          <div className="flex flex-col gap-2 items-start">
            <div className="flex flex-row gap-1 flex-wrap justify-start">
              {productImages?.map((image, imgIdx) => (
                <img
                  key={`${image}${imgIdx}`}
                  src={image}
                  alt=""
                  className="block w-[130px] aspect-video object-contain"
                />
              ))}
            </div>
            <div className="flex flex-row gap-0 flex-wrap">
              <input
                name={`product_image_link`}
                type="text"
                placeholder="Paste Image Link Here"
                className="input input-bordered input-sm"
              />
              <button
                type="button"
                onClick={() => {
                  console.log(formRef.current["product_image_link"].value);
                  if (formRef.current["product_image_link"].value == "") {
                    return;
                  }
                  setProductImages((productImages) => [
                    ...productImages,
                    formRef.current["product_image_link"].value,
                  ]);
                }}
                className="btn btn-sm btn-info text-white"
              >
                Add Image
              </button>
            </div>
          </div>

          <span className="block text-slate-800 text-sm text-left font-medium -mb-3">
            Description
          </span>
          <textarea
            name="description"
            className="textarea textarea-bordered resize-y"
            placeholder="Product Description"
          ></textarea>

          <span className="block text-slate-800 text-sm text-left font-medium -mb-3">
            Product Category
          </span>
          <select name="category" className="select select-bordered capitalize">
            {categories?.map((category) => (
              <option key={category?.name} value={category?.name}>
                {category?.name}
              </option>
            ))}
          </select>

          <span className="block text-slate-800 text-sm text-left font-medium -mb-3">
            Price
          </span>
          <input
            name="price"
            type="number"
            min={0}
            placeholder="Price"
            className="input input-bordered"
          />

          <span className="block text-slate-800 text-sm text-left font-medium -mb-3">
            Offer Price (Keep same as price if no offer)
          </span>
          <input
            name="offer_price"
            min={0}
            type="number"
            placeholder="Offer Price (Keep blank if no offer)"
            className="input input-bordered"
          />

          <span className="block text-slate-800 text-sm text-left font-medium -mb-3">
            Sales
          </span>
          <input
            name="sales"
            type="number"
            min={0}
            placeholder="Total sales"
            className="input input-bordered"
            defaultValue="0"
          />

          <div className="flex flex-row justify-between items-center mt-5 p-2 bg-slate-200 text-slate-800 rounded-md border-2 border-slate-400">
            <span className="block text-slate-800 text-sm text-left font-medium">
              Colors/Designs ({variants?.length})
            </span>
            <button
              type="button"
              className="btn bg-slate-800 hover:bg-slate-900 text-white font-normal btn-sm"
              onClick={() => {
                setVariants((variants) => [
                  ...variants,
                  { name: "", value: "#2727F8", images: [], sizes: [] },
                ]);
                return setModified(true);
              }}
            >
              Add Color/Design
            </button>
          </div>

          {variants?.map((variant, index) => (
            <div
              key={`${variant?.name}_${index}`}
              className="flex flex-col gap-2 p-3 border-2 border-green-200 bg-cyan-100 rounded-md"
            >
              <span className="block text-slate-800 text-sm text-left font-normal -mb-1">
                Color/Design Name:{" "}
                <input
                  name={`variant_name_${index}`}
                  type="text"
                  placeholder="Color Name"
                  className="input input-bordered input-sm"
                  defaultValue={variants?.[index]?.name}
                />
              </span>

              <span className="block text-slate-800 text-sm text-left font-medium -mb-2 mt-2">
                Color/Design Pictures
              </span>
              <div className="flex flex-row gap-1 flex-wrap justify-start">
                {variant?.images?.map((image) => (
                  <img
                    key={image}
                    src={image}
                    alt=""
                    className="block w-[80px] aspect-square object-contain"
                  />
                ))}
              </div>
              <div className="flex flex-row gap-0 flex-wrap">
                <input
                  name={`variant_image_${index}`}
                  type="text"
                  placeholder="Add Image Link"
                  className="input input-bordered input-sm"
                />
                <button
                  type="button"
                  onClick={() => {
                    let newVariants = [...variants];
                    newVariants[index].images = variant?.images || [];
                    if (
                      formRef?.current[`variant_image_${index}`]?.value == "" ||
                      formRef?.current[`variant_image_${index}`]?.value == null
                    ) {
                      return;
                    } else {
                      newVariants[index]?.images?.push(
                        formRef?.current[`variant_image_${index}`]?.value
                      );
                      setVariants(newVariants);
                    }
                  }}
                  className="btn btn-sm btn-info text-white"
                >
                  Add Image
                </button>
              </div>

              <span className="text-slate-800 text-sm text-left font-medium mt-2 -mb-1">
                Sizes
              </span>
              {variant?.sizes?.map((size, idx) => (
                <div
                  key={`variant_${index}_${idx}`}
                  className="flex flex-row gap-1 justify-start items-center flex-wrap"
                >
                  <input
                    type="text"
                    className="input input-bordered input-sm"
                    placeholder="Size"
                    defaultValue={size?.size}
                    name={`variant_${index}_size_${idx}_size`}
                    onChange={() => setModified(true)}
                  />
                  <input
                    type="text"
                    className="input input-bordered input-sm"
                    placeholder="Stock"
                    defaultValue={size?.stock}
                    name={`variant_${index}_size_${idx}_stock`}
                    onChange={() => setModified(true)}
                  />
                </div>
              ))}
              <button
                type="button"
                className="btn btn-info btn-sm w-fit text-white"
                onClick={() => {
                  let newVariants = [...variants];
                  newVariants[index].sizes?.push({
                    size: "",
                    stock: "",
                  });
                  setModified(true);
                  return setVariants(newVariants);
                }}
              >
                Add Size
              </button>

              <button
                type="button"
                className="btn btn-sm bg-green-600 text-white block w-fit mt-2 hover:bg-green-800"
                onClick={() => {
                  if (variant?.sizes?.length == 0) {
                    return alert("Please set at least 1 size for the variant!");
                  }

                  let newVariants = [...variants];
                  newVariants[index].name =
                    formRef?.current[`variant_name_${index}`]?.value;

                  for (let i = 0; i < variant?.sizes?.length; i++) {
                    if (
                      formRef?.current[`variant_${index}_size_${i}_size`]
                        ?.value == "" ||
                      formRef?.current[`variant_${index}_size_${i}_stock`]
                        ?.value == ""
                    ) {
                      return alert(
                        "Please put valid Size and Stock in variants/colors!"
                      );
                    }
                    newVariants[index].sizes[i].size =
                      formRef?.current[
                        `variant_${index}_size_${i}_size`
                      ]?.value;
                    newVariants[index].sizes[i].stock =
                      formRef?.current[
                        `variant_${index}_size_${i}_stock`
                      ]?.value;
                  }

                  setModified(false);
                  return setVariants(newVariants);
                }}
              >
                Save Variant
              </button>
            </div>
          ))}

          <button
            type="submit"
            className="btn bg-red-600 text-white hover:bg-red-800 disabled:bg-red-800 disabled:text-slate-300 mt-3"
            disabled={modified || variants?.length == 0 || updating}
          >
            {variants?.length == 0
              ? "Please add colors/designs"
              : modified
              ? "Please save colors/designs"
              : "Update Product"}
            {updating && <Loader />}
          </button>
        </form>
      </div>
    </div>
  );
};
export default EditProduct;
