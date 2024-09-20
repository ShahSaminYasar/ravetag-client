import { useEffect, useRef, useState } from "react";
import Title from "../../components/Title/Title";
import { useAxiosPublic } from "../../hooks/Axios/useAxiosPublic";

const AddProduct = () => {
  const axios = useAxiosPublic();

  const [categories, setCategories] = useState([]);
  const [variants, setVariants] = useState([]);

  const formRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      if (categories?.length == 0) {
        let res = await axios.get("/categories");
        setCategories(res?.data?.result);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <Title>Add Product</Title>

      <form className="flex flex-col gap-2" ref={formRef}>
        <span className="block text-slate-800 text-sm text-left font-medium -mb-1">
          Product Name
        </span>
        <input
          name="name"
          type="text"
          placeholder="Product Name"
          className="input input-bordered"
        />

        <span className="block text-slate-800 text-sm text-left font-medium -mb-1">
          Product SKU
        </span>
        <input
          name="sku"
          type="text"
          placeholder="Product SKU"
          className="input input-bordered"
        />

        <span className="block text-slate-800 text-sm text-left font-medium -mb-1">
          Description
        </span>
        <textarea
          name="description"
          className="textarea textarea-bordered resize-y"
          placeholder="Product Description"
        ></textarea>

        <span className="block text-slate-800 text-sm text-left font-medium -mb-1">
          Product Category
        </span>
        <select name="category" className="select select-bordered capitalize">
          {categories?.map((category) => (
            <option key={category?.name} value={category?.name}>
              {category?.name}
            </option>
          ))}
        </select>

        <span className="block text-slate-800 text-sm text-left font-medium -mb-1">
          Price
        </span>
        <input
          name="price"
          type="number"
          placeholder="Price"
          className="input input-bordered"
        />

        <span className="block text-slate-800 text-sm text-left font-medium -mb-1">
          Offer Price (Keep blank if no offer)
        </span>
        <input
          name="offer_price"
          type="number"
          placeholder="Offer Price (Keep blank if no offer)"
          className="input input-bordered"
        />

        <span className="block text-slate-800 text-sm text-left font-medium -mb-1">
          Sales
        </span>
        <input
          name="sales"
          type="number"
          placeholder="Total sales"
          className="input input-bordered"
          defaultValue="0"
        />

        <div className="flex flex-row justify-between items-center mt-5">
          <span className="block w-full text-slate-100 bg-slate-800 p-1 text-sm text-left font-medium rounded-md">
            Variants
          </span>
          <button
            type="button"
            className="btn btn-info text-white font-normal btn-sm"
            onClick={() => {
              setVariants((variants) => [...variants, {}]);
            }}
          >
            Add Variant
          </button>
        </div>

        {variants?.map((variant, index) => (
          <div
            key={variant?.name}
            className="flex flex-col gap-2 py-3 border-b-2 border-b-slate-100"
          >
            <span className="block text-slate-800 text-sm text-left font-normal -mb-1">
              Variant Name:{" "}
              <input
                name={`variant_name_${index}`}
                type="text"
                placeholder="Color Name"
                className="input input-bordered input-sm"
                defaultValue={variants?.[index]?.name}
              />
            </span>

            <span className="block text-slate-800 text-sm text-left font-medium -mb-1">
              Variant Images
            </span>
            <div className="flex flex-row gap-1 flex-wrap justify-start">
              {variant?.images?.map((image) => (
                <img
                  key={image}
                  src={image}
                  alt=""
                  className="block w-[130px] aspect-video object-contain"
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
                  newVariants[index]?.images?.push(
                    formRef?.current[`variant_image_${index}`]?.value
                  );
                  setVariants(newVariants);
                }}
                className="btn btn-sm btn-info text-white"
              >
                Add Image
              </button>
            </div>

            <span className="text-slate-800 text-sm text-left font-medium mt-2 -mb-1">
              Sizes
            </span>
            {variant?.sizes?.map((size) => (
              <div
                key={size?.size}
                className="flex flex-row gap-1 justify-start items-center flex-wrap"
              >
                <input
                  type="text"
                  className="input input-bordered input-sm"
                  placeholder="Size"
                  defaultValue={size?.size}
                />
                <input
                  type="text"
                  className="input input-bordered input-sm"
                  placeholder="Stock"
                  defaultValue={size?.stock}
                />
              </div>
            ))}
            <button
              type="button"
              className="btn btn-info btn-sm w-fit text-white"
              onClick={() => {
                let newVariants = [...variants];
                newVariants[index].sizes = variant?.sizes || [];
                newVariants[index].sizes?.push({ size: "", stock: "" });
                setVariants(newVariants);
              }}
            >
              Add Size
            </button>

            <button
              type="button"
              onClick={() => {
                let newVariants = [...variants];
                newVariants[index].name =
                  formRef?.current[`variant_name_${index}`]?.value;
                setVariants(newVariants);
                console.log(variants);
              }}
              className="btn btn-sm bg-green-600 text-white block w-fit mt-2 hover:bg-green-800"
            >
              Save Variant
            </button>
          </div>
        ))}

        <button
          type="submit"
          className="btn bg-red-600 text-white hover:bg-red-800 disabled:bg-red-800 mt-3"
        >
          Add Product
        </button>
      </form>
    </>
  );
};

export default AddProduct;
