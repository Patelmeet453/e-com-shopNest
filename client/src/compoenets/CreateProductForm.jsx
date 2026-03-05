import { useEffect, useState } from "react";
import { Upload, Plus, X, Image as ImageIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  resetProductState,
} from "../features/product/productSlice";
import toast from "react-hot-toast";

const CreateProductForm = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.products);

  const [imagePreview, setImagePreview] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    specs: [{ key: "", value: "" }],
    image: null,
  });

  /* 🔁 Reset after success */
  useEffect(() => {
    if (success) {
      toast.success("Product created successfully");
      dispatch(resetProductState());
      setForm({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        specs: [{ key: "", value: "" }],
        image: null,
      });
      setImagePreview(null);
    }
  }, [success, dispatch]);

  /* INPUT HANDLER */
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files && files[0]) {
      setForm({ ...form, image: files[0] });
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  /* SPEC HANDLERS */
  const handleSpecChange = (index, field, value) => {
    const updatedSpecs = [...form.specs];
    updatedSpecs[index][field] = value;
    setForm({ ...form, specs: updatedSpecs });
  };

  const addSpec = () => {
    setForm({
      ...form,
      specs: [...form.specs, { key: "", value: "" }],
    });
  };

  const removeSpec = (index) => {
    setForm({
      ...form,
      specs: form.specs.filter((_, i) => i !== index),
    });
  };

  /* SUBMIT */
  const submitHandler = (e) => {
    e.preventDefault();

    const specsObject = {};
    form.specs.forEach((s) => {
      if (s.key && s.value) specsObject[s.key] = s.value;
    });

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("category", form.category);
    formData.append("stock", form.stock);
    formData.append("specs", JSON.stringify(specsObject));
    formData.append("image", form.image);

    dispatch(createProduct(formData));
  };

  return (
    <div className="flex justify-center mt-10 px-4">
      <form
        onSubmit={submitHandler}
        className="
          w-full max-w-3xl
          bg-gradient-to-br from-[#020617] via-[#020617] to-[#064e3b]
          border border-emerald-900/40
          rounded-2xl p-8 shadow-2xl
        "
      >
        {/* HEADER */}
        <h2 className="text-2xl font-semibold text-emerald-400 mb-8">
          Create New Product
        </h2>

        {/* PRODUCT NAME */}
        <div className="mb-5">
          <label className="block text-sm text-gray-400 mb-1">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter product name"
            required
            className="w-full p-3 rounded-lg bg-[#020617]
              border border-gray-700 focus:border-emerald-500 outline-none"
          />
        </div>

        {/* DESCRIPTION */}
        <div className="mb-5">
          <label className="block text-sm text-gray-400 mb-1">
            Description
          </label>
          <textarea
            name="description"
            rows={4}
            value={form.description}
            onChange={handleChange}
            placeholder="Enter product description"
            required
            className="w-full p-3 rounded-lg bg-[#020617]
              border border-gray-700 focus:border-emerald-500 outline-none"
          />
        </div>

        {/* PRICE & STOCK */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="₹ Price"
              required
              className="w-full p-3 rounded-lg bg-[#020617]
                border border-gray-700 focus:border-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Stock</label>
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              placeholder="Available quantity"
              required
              className="w-full p-3 rounded-lg bg-[#020617]
                border border-gray-700 focus:border-emerald-500 outline-none"
            />
          </div>
        </div>

        {/* CATEGORY */}
        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-1">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-[#020617]
              border border-gray-700 focus:border-emerald-500 outline-none"
          >
            <option value="">Select category</option>
            <option value="mobile">Mobile</option>
            <option value="laptop">Laptop</option>
            <option value="earphone">Earphone</option>
            <option value="watch">Watch</option>
          </select>
        </div>

        {/* SPECS */}
        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">
            Specifications
          </label>

          {form.specs.map((spec, index) => (
            <div key={index} className="flex flex-wrap gap-3 mb-3">
              <input
                type="text"
                placeholder="Key (RAM)"
                value={spec.key}
                onChange={(e) => handleSpecChange(index, "key", e.target.value)}
                className="flex-1 p-3 rounded-lg bg-[#020617]
                  border border-gray-700 focus:border-emerald-500 outline-none"
                required
              />

              <input
                type="text"
                placeholder="Value (8GB)"
                value={spec.value}
                onChange={(e) =>
                  handleSpecChange(index, "value", e.target.value)
                }
                className="flex-1 p-3 rounded-lg bg-[#020617]
                  border border-gray-700 focus:border-emerald-500 outline-none"
                required
              />

              {form.specs.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSpec(index)}
                  className="p-3 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600/40"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addSpec}
            className="flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300"
          >
            <Plus size={16} /> Add specification
          </button>
        </div>

        {/* IMAGE UPLOAD */}
        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">
            Product Image
          </label>

          <label
            className="flex items-center gap-3 cursor-pointer
            text-gray-400 hover:text-emerald-400"
          >
            <Upload size={18} />
            <span>{form.image ? form.image.name : "Upload image"}</span>
            <input
              type="file"
              name="image"
              accept="image/*"
              hidden
              onChange={handleChange}
              required
            />
          </label>

          {/* IMAGE PREVIEW */}
          {imagePreview && (
            <div className="mt-4 flex items-center gap-4">
              <div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-700">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <ImageIcon size={16} />
                <span className="text-sm">Preview</span>
              </div>
            </div>
          )}
        </div>

        {/* ERROR */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="
            w-full py-3 rounded-xl font-semibold
            bg-emerald-600 hover:bg-emerald-700
            transition disabled:opacity-60
          "
        >
          {loading ? "Creating Product..." : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default CreateProductForm;
