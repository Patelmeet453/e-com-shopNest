import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Shop = () => {
  const navigate = useNavigate();
  const products = useSelector((s) => s.products.list);

  const [searchParams] = useSearchParams();

  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");

  /* ========================
     SYNC CATEGORY FROM URL
  ======================== */
  useEffect(() => {
    const urlCategory = searchParams.get("category") || "all";
    setCategory(urlCategory);
  }, [searchParams]);

   const brandParam = searchParams.get("brand");

  /* ========================
     FILTER LOGIC
  ======================== */
  let filteredProducts = [...products];

  if (category !== "all") {
    filteredProducts = filteredProducts.filter((p) => p.category === category);
  }

  // ✅ BRAND FILTER (NEW)
  if (brandParam) {
    filteredProducts = filteredProducts.filter((p) =>
      p.name.toLowerCase().includes(brandParam)
    );
  }

  if (sort === "low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (sort === "high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="px-6 md:px-16 py-12 text-white">
      {/* ========================
          HEADER
      ======================== */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-emerald-400">Shop</h1>
        <p className="text-gray-400 mt-2">Browse all available products</p>
      </div>

      {/* ========================
          FILTER STRIP
      ======================== */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
        {/* CATEGORY PILLS */}
        <div className="flex flex-wrap gap-3">
          {["all", "laptop", "mobile", "earphone","watch"].map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-2 rounded-full text-sm capitalize transition
                ${
                  category === c
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                    : "bg-emerald-900/20 text-gray-300 hover:bg-emerald-900/40"
                }
              `}
            >
              {c === "all" ? "All Products" : c}
            </button>
          ))}
        </div>

        {/* SORT */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400">Sort by</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="
    appearance-none
    bg-emerald-900/20
    border border-emerald-900/40
    rounded-full
    pl-4 pr-10 py-2
    text-sm text-white
    cursor-pointer
    hover:bg-emerald-900/30
    focus:outline-none
    focus:ring-2 focus:ring-emerald-600/40
    transition
  "
          >
            <option className="bg-[#020617] text-white" value="">
              Recommended
            </option>
            <option className="bg-[#020617] text-white" value="low">
              Price: Low → High
            </option>
            <option className="bg-[#020617] text-white" value="high">
              Price: High → Low
            </option>
          </select>
        </div>
      </div>

      {/* ========================
          PRODUCT GRID
      ======================== */}
      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-400">No products found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {filteredProducts.map((p) => (
            <div
              key={p._id}
              onClick={() => navigate(`/product/${p._id}`)}
              className="
                cursor-pointer rounded-3xl overflow-hidden
                bg-gradient-to-br from-[#020617]/80 to-emerald-950/60
                border border-emerald-900/30
                hover:shadow-2xl hover:shadow-emerald-600/10
                transition
              "
            >
              {/* IMAGE */}
              <div className="h-56 bg-black flex items-center justify-center">
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-full object-contain p-6 hover:scale-105 transition"
                />
              </div>

              {/* INFO */}
              <div className="p-5">
                <h3 className="font-semibold text-white truncate">{p.name}</h3>

                <div className="flex items-center justify-between mt-2">
                  <p className="text-emerald-400 font-semibold text-lg">
                    ₹{p.price}
                  </p>
                  <span className="text-xs px-3 py-1 rounded-full bg-emerald-900/30 text-emerald-300 capitalize">
                    {p.category}
                  </span>
                </div>

                <button
                  className="
                    w-full mt-4 py-2 rounded-xl
                    bg-emerald-600/90 hover:bg-emerald-600
                    text-black font-medium
                    transition
                  "
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;
