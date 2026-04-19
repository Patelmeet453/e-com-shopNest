import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#020617] border-t border-emerald-900/40 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
        {/* BRAND */}
        <div>
          <h3 className="text-emerald-400 text-xl font-semibold mb-2">
            ShopNest
          </h3>
          <p className="text-sm leading-relaxed">
            AI-powered smart e-commerce platform for a modern shopping
            experience.
          </p>
        </div>

        {/* LINKS */}
        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-emerald-400">Home</Link></li>
            <li><Link to="/shop" className="hover:text-emerald-400">Shop</Link></li>
            <li><Link to="/about" className="hover:text-emerald-400">About</Link></li>
            <li><Link to="/contact" className="hover:text-emerald-400">Contact</Link></li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h4 className="text-white font-semibold mb-3">Support</h4>
          <p className="text-sm">Email: support@shopnest.com</p>
          <p className="text-sm">Phone: +91 95129 80453</p>
        </div>
      </div>

      <div className="text-center text-xs py-4 border-t border-emerald-900/30">
        © {new Date().getFullYear()} ShopNest. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
