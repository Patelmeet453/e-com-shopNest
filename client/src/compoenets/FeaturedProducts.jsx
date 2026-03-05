import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const FeaturedProducts = () => {
  const navigate = useNavigate();

  // 🔥 Get products from redux
  const products = useSelector((s) => s.products.list);

  // ✅ Pick max 4 products (can be mixed categories)
  const featured = products.slice(0, 4);

  if (!featured.length) return null;

  return (
    <div className="px-6 md:px-16 py-16">
      {/* HEADER */}
      <h2 className="text-4xl font-bold text-emerald-400 text-center">
        Featured Products
      </h2>
      <p className="text-gray-400 text-center mt-2 mb-12">
        Handpicked products just for you
      </p>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {featured.map((p) => (
          <div
            key={p._id}
            onClick={() => navigate(`/product/${p._id}`)}
            className="
              cursor-pointer rounded-2xl overflow-hidden
              bg-gradient-to-br from-[#020617]/80 to-emerald-950/60
              border border-emerald-900/30
              hover:shadow-xl hover:shadow-emerald-600/10
              hover:scale-[1.02]
              transition
            "
          >
            {/* IMAGE */}
            <div className="h-48 bg-black flex items-center justify-center">
              <img
                src={p.image}
                alt={p.name}
                className="h-full object-contain p-4 hover:scale-105 transition"
              />
            </div>

            {/* INFO */}
            <div className="p-4">
              <h3 className="font-semibold text-white truncate">
                {p.name}
              </h3>
              <p className="text-emerald-400 font-medium mt-1">
                ₹{p.price}
              </p>
              <p className="text-xs text-gray-400 mt-1 capitalize">
                {p.category}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
