import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const images = [
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=1920&q=80",
];

const Hero = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  /* AUTO SLIDE EVERY 5 SEC */
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[90vh] w-full overflow-hidden">
      {/* SLIDER IMAGES */}
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          alt="ShopNest Hero"
          className={`
            absolute inset-0 w-full h-full object-cover
            transition-opacity duration-1000 ease-in-out
            ${i === index ? "opacity-100" : "opacity-0"}
          `}
        />
      ))}

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-emerald-950/70" />

      {/* CONTENT */}
      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <div className="text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Smart Shopping,
            <span className="text-emerald-400"> Smarter Experience</span>
          </h1>

          <p className="mt-6 text-gray-300 text-lg md:text-xl">
            Discover the latest laptops, mobiles, and accessories with secure
            payments, AI navigation, and lightning-fast checkout.
          </p>

          {/* BUTTONS */}
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => navigate("/shop")}
              className="
                px-8 py-3 rounded-full
                bg-emerald-600 hover:bg-emerald-700
                text-white font-semibold
                shadow-lg shadow-emerald-600/30
                transition
              "
            >
              Shop Now
            </button>

            <button
              onClick={() => navigate("/login")}
              className="
                px-8 py-3 rounded-full
                border border-emerald-400
                text-emerald-400 hover:bg-emerald-400/10
                font-semibold
                transition
              "
            >
              Sign In
            </button>
          </div>
        </div>
      </div>

      {/* SLIDER DOTS */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <span
            key={i}
            className={`w-2.5 h-2.5 rounded-full transition ${
              i === index
                ? "bg-emerald-400"
                : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
