import { useState } from "react";
import { X, Upload, Plus, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { updateProduct } from "../features/product/productSlice";

const EditProductModal = ({ product, onClose }) => {
  const dispatch = useDispatch();

  const [imagePreview, setImagePreview] = useState(product.image);
  const [form, setForm] = useState({
    name: product.name || "",
    description: product.description || "",
    price: product.price || "",
    category: product.category || "",
    stock: product.stock || "",
    specs: Object.entries(product.specs || {}).map(([key, value]) => ({
      key,
      value,
    })),
    image: null,
  });

  /* ---------------- HANDLERS ---------------- */
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files?.[0]) {
      setForm({ ...form, image: files[0] });
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSpecChange = (i, field, value) => {
    const updated = [...form.specs];
    updated[i][field] = value;
    setForm({ ...form, specs: updated });
  };

  const addSpec = () =>
    setForm({ ...form, specs: [...form.specs, { key: "", value: "" }] });

  const removeSpec = (i) =>
    setForm({ ...form, specs: form.specs.filter((_, idx) => idx !== i) });

  const submitHandler = async () => {
    const specsObj = {};
    form.specs.forEach((s) => {
      if (s.key && s.value) specsObj[s.key] = s.value;
    });

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("category", form.category);
    formData.append("stock", form.stock);
    formData.append("specs", JSON.stringify(specsObj));
    if (form.image) formData.append("image", form.image);

    await dispatch(updateProduct({ id: product._id, formData }));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      {/* MODAL */}
      <div
        className="
          w-full max-w-3xl
          max-h-[90vh]
          flex flex-col
          bg-gradient-to-br from-[#020617] to-[#064e3b]
          border border-emerald-900/40
          rounded-2xl
          shadow-2xl
          text-white
        "
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h2 className="text-lg font-semibold text-emerald-400">
            Edit Product
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10"
          >
            <X />
          </button>
        </div>

        {/* BODY (SCROLLABLE) */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {/* BASIC INFO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-sm text-gray-400">Product Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full mt-1 p-3 rounded-lg bg-[#020617]
                border border-gray-700 focus:border-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full mt-1 p-3 rounded-lg bg-[#020617]
                border border-gray-700 focus:border-emerald-500 outline-none"
              >
                <option value="">Select category</option>
                <option value="mobile">Mobile</option>
                <option value="laptop">Laptop</option>
                <option value="earphone">Earphone</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-400">Price</label>
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                className="w-full mt-1 p-3 rounded-lg bg-[#020617]
                border border-gray-700 focus:border-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">Stock</label>
              <input
                name="stock"
                type="number"
                value={form.stock}
                onChange={handleChange}
                className="w-full mt-1 p-3 rounded-lg bg-[#020617]
                border border-gray-700 focus:border-emerald-500 outline-none"
              />
            </div>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="text-sm text-gray-400">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full mt-1 p-3 rounded-lg bg-[#020617]
              border border-gray-700 focus:border-emerald-500 outline-none"
            />
          </div>

          {/* SPECS */}
          <div>
            <label className="text-sm text-gray-400 block mb-2">
              Specifications
            </label>

            {form.specs.map((s, i) => (
              <div key={i} className="flex gap-3 mb-3">
                <input
                  placeholder="Key"
                  value={s.key}
                  onChange={(e) =>
                    handleSpecChange(i, "key", e.target.value)
                  }
                  className="flex-1 p-3 rounded-lg bg-[#020617]
                  border border-gray-700 focus:border-emerald-500 outline-none"
                />
                <input
                  placeholder="Value"
                  value={s.value}
                  onChange={(e) =>
                    handleSpecChange(i, "value", e.target.value)
                  }
                  className="flex-1 p-3 rounded-lg bg-[#020617]
                  border border-gray-700 focus:border-emerald-500 outline-none"
                />
                <button
                  onClick={() => removeSpec(i)}
                  className="p-3 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600/40"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}

            <button
              onClick={addSpec}
              className="flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300"
            >
              <Plus size={16} /> Add specification
            </button>
          </div>

          {/* IMAGE */}
          <div>
            <label className="text-sm text-gray-400 block mb-2">
              Product Image
            </label>

            <label className="flex items-center gap-3 cursor-pointer text-gray-400 hover:text-emerald-400">
              <Upload size={18} />
              <span>Change image</span>
              <input
                type="file"
                hidden
                name="image"
                accept="image/*"
                onChange={handleChange}
              />
            </label>

            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-4 w-24 h-24 rounded-lg object-cover border border-gray-700"
              />
            )}
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-gray-600 hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={submitHandler}
            className="px-6 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 font-semibold"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
