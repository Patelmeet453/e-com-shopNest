import { CheckCircle2, ShoppingBag, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div
      className="
        min-h-[80vh]
        flex items-center justify-center
        px-6 text-white
      "
    >
      <div
        className="
          max-w-md w-full text-center
          rounded-3xl p-10
          bg-gradient-to-br from-[#020617]/80 to-emerald-950/60
          border border-emerald-900/40
          backdrop-blur
          animate-fadeIn
        "
      >
        {/* SUCCESS ICON */}
        <div className="flex justify-center mb-6">
          <CheckCircle2
            size={90}
            className="text-emerald-400 animate-scaleIn"
          />
        </div>

        {/* TEXT */}
        <h1 className="text-3xl font-bold text-emerald-400">
          Payment Successful!
        </h1>

        <p className="text-gray-400 mt-3">
          Your order has been placed successfully.
          <br />
          Thank you for shopping with <span className="text-emerald-400">ShopNest</span>.
        </p>

        {/* ACTION BUTTONS */}
        <div className="mt-10 flex flex-col gap-4">
          <button
            onClick={() => navigate("/orders")}
            className="
              flex items-center justify-center gap-2
              py-3 rounded-full
              bg-emerald-600 hover:bg-emerald-700
              font-semibold transition
              shadow-lg shadow-emerald-600/30
            "
          >
            <Package size={18} />
            View My Orders
          </button>

          <button
            onClick={() => navigate("/shop")}
            className="
              flex items-center justify-center gap-2
              py-3 rounded-full
              border border-emerald-400
              text-emerald-400
              hover:bg-emerald-400/10
              font-semibold transition
            "
          >
            <ShoppingBag size={18} />
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
