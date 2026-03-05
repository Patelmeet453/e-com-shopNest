import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { useState, useMemo } from "react";

/* =========================
   UNIVERSAL DESCRIPTION PARSER
========================= */
const parseDescription = (description) => {
  if (!description) return [];

  return description
    .replace(/\r/g, "")
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      if (line.includes("—")) {
        const [title, ...rest] = line.split("—");
        return { title: title.trim(), text: rest.join("—").trim() };
      }

      if (line.includes(":")) {
        const [title, ...rest] = line.split(":");
        return { title: title.trim(), text: rest.join(":").trim() };
      }

      if (line.includes(",")) {
        const [title, ...rest] = line.split(",");
        return { title: title.trim(), text: rest.join(",").trim() };
      }

      return { title: "Feature", text: line.trim() };
    });
};

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [showAllDesc, setShowAllDesc] = useState(false);
  const [showAllSpecs, setShowAllSpecs] = useState(false);

  const product = useSelector((s) => s.products.list.find((p) => p._id === id));

  const related = useSelector((s) =>
    s.products.list
      .filter((p) => p.category === product?.category && p._id !== product?._id)
      .slice(0, 4),
  );

  const descriptionPoints = useMemo(
    () => parseDescription(product?.description),
    [product],
  );

  if (!product) return null;

  /* =========================
     DESCRIPTION / SPECS LOGIC
  ========================= */
  const visibleDesc = showAllDesc
    ? descriptionPoints
    : descriptionPoints.slice(0, 4);

  const specsEntries = Object.entries(product.specs || {});
  const visibleSpecs = showAllSpecs ? specsEntries : specsEntries.slice(0, 3);

  return (
    <div className="px-6 md:px-16 py-10 text-white">
      {/* =========================
          MAIN SECTION
      ========================= */}
      <div className="grid lg:grid-cols-2 gap-12">
        {/* IMAGE (STICKY) */}
        <div className="lg:sticky lg:top-24 self-start flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="
      object-contain
      max-h-[280px] sm:max-h-[340px] lg:max-h-[420px]
      w-full
      max-w-md
    "
          />
        </div>

        {/* DETAILS */}
        <div>
          <h1 className="text-3xl font-semibold">{product.name}</h1>

          <p className="text-emerald-400 text-2xl font-bold mt-4">
            ₹{product.price}
          </p>

          {/* QTY */}
          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="px-4 py-2 bg-gray-800 rounded"
            >
              −
            </button>

            <span>{qty}</span>

            <button
              onClick={() => setQty((q) => q + 1)}
              className="px-4 py-2 bg-gray-800 rounded"
            >
              +
            </button>
          </div>

          <button
            onClick={() => dispatch(addToCart({ productId: product._id, qty }))}
            className="mt-6 w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700"
          >
            Add to Cart
          </button>

          {/* =========================
              DESCRIPTION
          ========================= */}
          <div className="mt-10">
            <h3 className="text-xl text-emerald-400 mb-4">
              Product Description
            </h3>

            <ul className="space-y-4">
              {visibleDesc.map((item, i) => (
                <li key={i} className="leading-relaxed">
                  {item.title !== "Feature" && (
                    <span className="font-semibold">{item.title}</span>
                  )}
                  <span className="text-gray-300">
                    {item.title !== "Feature" ? " — " : ""}
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>

            {descriptionPoints.length > 4 && (
              <button
                onClick={() => setShowAllDesc(!showAllDesc)}
                className="mt-4 text-emerald-400 text-sm hover:underline"
              >
                {showAllDesc ? "Show Less" : "Show More"}
              </button>
            )}
          </div>

          {/* =========================
              SPECIFICATIONS
          ========================= */}
          <div className="mt-10">
            <h3 className="text-xl text-emerald-400 mb-4">Specifications</h3>

            <div className="bg-[#020617] border border-emerald-900/40 rounded-2xl p-4">
              <div className="space-y-3">
                {visibleSpecs.map(([key, value]) => (
                  <div
                    key={key}
                    className="
                    grid grid-cols-[180px_1fr]
                    gap-4
                    bg-black/40
                    rounded-lg
                    px-4 py-3
                    items-start
                    "
                  >
                    {/* LEFT : LABEL */}
                    <span className="text-gray-400 capitalize text-sm">
                      {key}
                    </span>

                    {/* RIGHT : VALUE */}
                    <span className="text-white text-sm leading-relaxed break-words">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {specsEntries.length > 3 && (
              <button
                onClick={() => setShowAllSpecs(!showAllSpecs)}
                className="mt-4 text-emerald-400 text-sm hover:underline"
              >
                {showAllSpecs ? "Show Less" : "Show More"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* =========================
          RELATED PRODUCTS (UNCHANGED UI)
      ========================= */}
      <div className="mt-16">
        <h2 className="text-2xl text-emerald-400 mb-6">Related Products</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {related.map((p) => (
            <div
              key={p._id}
              onClick={() => navigate(`/product/${p._id}`)}
              className="
                cursor-pointer rounded-2xl
                bg-gradient-to-br from-[#020617] to-[#064e3b]
                border border-emerald-900/40
                overflow-hidden
                hover:scale-[1.02] transition
              "
            >
              <div className="relative h-44 w-full">
                <img
                  src={p.image}
                  alt={p.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              <div className="p-4">
                <p className="line-clamp-1">{p.name}</p>
                <p className="text-emerald-400 font-semibold">₹{p.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
