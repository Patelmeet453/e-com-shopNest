import { useNavigate } from "react-router-dom";
import laptopImg from "../assets/laptop.png";
import mobileImg from "../assets/mobile.png";
import earphoneImg from "../assets/earphone.png";
import watchImg from "../assets/watch.png";
import Hero from "../compoenets/Hero";
import FeaturedProducts from "../compoenets/FeaturedProducts";

const Home = () => {
  const navigate = useNavigate();

  const categories = [
    { name: "Laptops", slug: "laptop", image: laptopImg },
    { name: "Mobiles", slug: "mobile", image: mobileImg },
    { name: "Earphones", slug: "earphone", image: earphoneImg },
    { name: "Watchs", slug: "watch", image: watchImg },
  ];

  return (
    <>
      <div>
        <Hero />
      </div>
      <div className="px-6 md:px-16 py-16">
        <h1 className="text-4xl font-bold text-emerald-400 text-center">
          Explore Our Categories
        </h1>
        <p className="text-gray-400 text-center mt-2 mb-12">
          Discover the latest tech products
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.slug}
              onClick={() => navigate(`/store/${cat.slug}`)}
              className="
              relative cursor-pointer overflow-hidden rounded-3xl
              h-[260px] group
            "
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="
                w-full h-full object-cover
                group-hover:scale-110 transition duration-500
              "
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">
                <h2 className="text-2xl text-white font-semibold">
                  {cat.name}
                </h2>
                <span className="text-emerald-300 text-sm">
                  Explore {cat.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
      {/* FEATURED PRODUCTS */}
      <FeaturedProducts />
      </div>
    </>
  );
};

export default Home;
