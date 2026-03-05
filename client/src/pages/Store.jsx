import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Store = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  const products = useSelector((s) =>
    s.products.list.filter((p) => p.category === category),
  );

  return (
    <div className="px-6 md:px-16 py-10">
      <h1 className="text-3xl font-bold text-emerald-400 capitalize mb-10">
        {category} Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="
              rounded-2xl
              bg-gradient-to-br from-[#020617] to-[#064e3b]
              border border-emerald-900/40
              overflow-hidden
              hover:scale-[1.02] transition
            "
          >
            {/* IMAGE (CLICKABLE) */}
            <div
              onClick={() => navigate(`/product/${product._id}`)}
              className="relative h-56 w-full cursor-pointer"
            >
              <img
                src={product.image}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* CATEGORY BADGE */}
              {/* <span
                className="
                  absolute top-3 left-3
                  bg-black/70 text-emerald-400
                  text-xs px-3 py-1 rounded-full
                  uppercase tracking-wide
                "
              >
                {product.category}
              </span> */}
            </div>

            {/* CONTENT */}
            <div className="p-4">
              <h3 className="text-white font-medium line-clamp-1">
                {product.name}
              </h3>

              <div className="flex items-center justify-between mt-1">
                {/* PRICE */}
                <p className="text-emerald-400 font-semibold text-lg">
                  ₹{product.price}
                </p>

                {/* CATEGORY */}
                <span
                  className="
                  text-xs px-3 py-1 rounded-full
                  bg-emerald-900/40 text-emerald-300
                  capitalize"
                            >
                  {product.category}
                </span>
              </div>

              <button
                onClick={() => navigate(`/product/${product._id}`)}
                className="
                  mt-4 w-full py-2 rounded-lg
                  bg-emerald-600 hover:bg-emerald-700
                "
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <p className="text-gray-400 mt-10">
          No products found in this category
        </p>
      )}
    </div>
  );
};

export default Store;
