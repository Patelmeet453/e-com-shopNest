import { useDispatch, useSelector } from "react-redux";
import { updateQty, removeFromCart } from "../features/cart/cartSlice";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const GST_RATE = 0.18; // 18%

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector((s) => s.cart.items);

  const navigate = useNavigate();

  // 🧮 Calculations
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.qty,
    0,
  );

  const gst = subtotal * GST_RATE;
  const total = subtotal + gst;

  return (
    <div className="px-6 md:px-16 py-10 text-white">
      <h1 className="text-3xl font-bold text-emerald-400 mb-8">
        {items.length === 0 ? "" : "Cart"}
      </h1>

      {items.length === 0 ? (
        <div
          className="
    flex flex-col items-center justify-center
    rounded-2xl
    py-16
    text-center
  "
        >
          <div
            className="
      w-20 h-20 mb-6
      flex items-center justify-center
      rounded-full
      bg-emerald-600/10
      text-emerald-400
    "
          >
            <ShoppingCart size={36} />
          </div>

          <h2 className="text-2xl font-semibold text-white">
            Your cart is empty
          </h2>

          <p className="text-gray-400 mt-2 max-w-sm">
            Looks like you haven’t added anything to your cart yet. Start
            exploring products and add them to your cart.
          </p>

          <button
            onClick={() => navigate("/store")}
            className="
      mt-6 px-6 py-3 rounded-xl
      bg-emerald-600 hover:bg-emerald-700
      text-white font-semibold
      transition
    "
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {/* LEFT: CART ITEMS */}
          <div className="md:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.product._id}
                className="
                  flex gap-4 items-center
                  bg-[#020617]
                  border border-gray-700
                  rounded-2xl p-4
                "
              >
                {/* IMAGE */}
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-24 h-24 object-contain rounded-lg"
                />

                {/* DETAILS */}
                <div className="flex-1">
                  <h3 className="font-semibold">{item.product.name}</h3>
                  <p className="text-emerald-400 font-medium">
                    ₹{item.product.price}
                  </p>

                  {/* QTY CONTROLS */}
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() =>
                        dispatch(
                          updateQty({
                            productId: item.product._id,
                            qty: item.qty - 1,
                          }),
                        )
                      }
                      disabled={item.qty === 1}
                      className="px-3 py-1 bg-gray-800 rounded"
                    >
                      −
                    </button>

                    <span>{item.qty}</span>

                    <button
                      onClick={() =>
                        dispatch(
                          updateQty({
                            productId: item.product._id,
                            qty: item.qty + 1,
                          }),
                        )
                      }
                      className="px-3 py-1 bg-gray-800 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* ITEM TOTAL */}
                <div className="text-right">
                  <p className="font-semibold">
                    ₹{item.product.price * item.qty}
                  </p>

                  <button
                    onClick={() => dispatch(removeFromCart(item.product._id))}
                    className="text-red-400 mt-2 flex items-center gap-1"
                  >
                    <Trash2 size={16} /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: SUMMARY */}
          <div
            className="
              bg-gradient-to-br from-[#020617] to-[#064e3b]
              border border-emerald-900/40
              rounded-2xl p-6 h-fit
            "
          >
            <h2 className="text-xl text-emerald-400 mb-4">Order Summary</h2>

            <div className="space-y-3 text-gray-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>GST (18%)</span>
                <span>₹{gst.toFixed(2)}</span>
              </div>

              <div className="border-t border-gray-700 pt-3 flex justify-between text-white font-semibold">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>

            <button
              className="
                mt-6 w-full py-3 rounded-xl
                bg-emerald-600 hover:bg-emerald-700
                font-semibold
              "
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
