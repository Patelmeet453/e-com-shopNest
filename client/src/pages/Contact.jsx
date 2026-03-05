import { Mail, Phone, MapPin, Send } from "lucide-react";

const Contact = () => {
  return (
    <div className="px-6 md:px-20 py-16 text-white">
      <h1 className="text-4xl font-bold text-emerald-400 text-center mb-6">
        Contact Us
      </h1>

      <p className="text-gray-400 text-center mb-12">
        Have questions? We’d love to hear from you.
      </p>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
        {/* ================= INFO ================= */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Mail className="text-emerald-400" size={20} />
            <p className="text-gray-300">
              support@shopnest.com
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Phone className="text-emerald-400" size={20} />
            <p className="text-gray-300">
              +91 98765 43210
            </p>
          </div>

          <div className="flex items-center gap-4">
            <MapPin className="text-emerald-400" size={20} />
            <p className="text-gray-300">
              India
            </p>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed mt-6">
            Our support team is available to assist you with orders, payments,
            returns, and general queries. We usually respond within 24 hours.
          </p>
        </div>

        {/* ================= FORM ================= */}
        <form
          className="
            bg-gradient-to-br from-[#020617] to-emerald-950
            border border-emerald-900/40
            rounded-2xl p-6 space-y-4
          "
        >
          <input
            placeholder="Your Name"
            className="
              w-full px-4 py-2
              bg-black/30 text-white
              border border-emerald-900/40
              rounded-lg
              focus:outline-none focus:ring-1 focus:ring-emerald-600
            "
          />

          <input
            placeholder="Your Email"
            className="
              w-full px-4 py-2
              bg-black/30 text-white
              border border-emerald-900/40
              rounded-lg
              focus:outline-none focus:ring-1 focus:ring-emerald-600
            "
          />

          <textarea
            rows="4"
            placeholder="Your Message"
            className="
              w-full px-4 py-2
              bg-black/30 text-white
              border border-emerald-900/40
              rounded-lg
              focus:outline-none focus:ring-1 focus:ring-emerald-600
            "
          />

          <button
            type="submit"
            className="
              w-full flex items-center justify-center gap-2
              py-2 rounded-lg
              bg-emerald-600 hover:bg-emerald-700
              transition font-medium
            "
          >
            <Send size={16} />
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
