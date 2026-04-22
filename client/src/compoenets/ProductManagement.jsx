import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  deleteProduct,
} from "../features/product/productSlice.js";
import { Trash2, Pencil } from "lucide-react";
import EditProductModal from "../model/EditProductModal.jsx";
import toast from "react-hot-toast";

const ProductManagement = () => {
  const [editProduct, setEditProduct] = useState(null);

  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.products);

  const user = useSelector((state) => state.auth.user);
  const isDemo = user?.email === "demo@gmail.com";

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const deleteHandler = (id) => {
    if (isDemo) {
      toast.error("Demo mode: You cannot delete products");
      return;
    }

    if (confirm("Are you sure?")) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <div className="p-6 md:p-10 text-white">
      <h1 className="text-3xl font-bold text-emerald-400 mb-8">
        Product Management
      </h1>

      <div
        className="
        bg-gradient-to-br from-[#020617] to-[#064e3b]
        border border-emerald-900/40
        rounded-2xl shadow-xl overflow-x-auto
      "
      >
        {loading ? (
          <p className="p-6 text-center">Loading...</p>
        ) : (
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-700">
                <th className="p-4">Image</th>
                <th className="p-4">Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {list.map((product) => (
                <tr
                  key={product._id}
                  className="border-b border-gray-800 hover:bg-white/5 transition"
                >
                  {/* IMAGE */}
                  <td className="p-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  </td>

                  {/* NAME */}
                  <td className="p-4">{product.name}</td>

                  {/* CATEGORY */}
                  <td className="p-4 capitalize">{product.category}</td>

                  {/* PRICE */}
                  <td className="p-4">₹{product.price}</td>

                  {/* STOCK */}
                  <td className="p-4">
                    {product.stock > 0 ? (
                      <span className="text-emerald-400">{product.stock}</span>
                    ) : (
                      <span className="text-red-400">Out</span>
                    )}
                  </td>

                  {/* ACTIONS */}
                  <td className="p-4 flex justify-center gap-3">
                    <button
                      className="p-2 rounded-lg bg-blue-600/20 text-blue-400 hover:bg-blue-600/40"
                      title="Edit (next step)"
                      onClick={() => {
                        if (isDemo) {
                          toast.error("Demo mode: You cannot edit products");
                          return;
                        }
                        setEditProduct(product);
                      }}
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      onClick={() => deleteHandler(product._id)}
                      className="p-2 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600/40"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}

              {list.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-6 text-center text-gray-400">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
      {editProduct && (
        <EditProductModal
          product={editProduct}
          onClose={() => setEditProduct(null)}
        />
      )}
    </div>
  );
};

export default ProductManagement;
