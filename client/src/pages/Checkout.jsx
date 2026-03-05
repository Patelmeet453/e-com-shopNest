import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios";
import { placeOrder } from "../features/order/orderSlice";
import { fetchCart } from "../features/cart/cartSlice";
import toast from "react-hot-toast";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((s) => s.cart);

  const [paymentMethod, setPaymentMethod] = useState("ONLINE");

  const [address, setAddress] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });

  const subtotal = items.reduce(
    (sum, i) => sum + i.product.price * i.qty,
    0
  );
  const gst = subtotal * 0.18;
  const totalAmount = Math.round(subtotal + gst);

  const placeCODOrder = async () => {
    if (Object.values(address).some(v => !v)) {
      toast.error("Fill all address fields");
      return;
    }

    await dispatch(
      placeOrder({
        items,
        shippingAddress: address,
        payment: {
          method: "COD",
          status: "Pending",
        },
        totalAmount,
      })
    );

    await api.delete("/cart/clear");
    dispatch(fetchCart());
    navigate("/payment-success");
  };

  const handleOnlinePayment = async () => {
    if (Object.values(address).some(v => !v)) {
      toast.error("Fill all address fields");
      return;
    }

    const { data } = await api.post("/payment", {
      amount: totalAmount,
    });

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: data.amount,
      currency: "INR",
      name: "ShopNest",
      order_id: data.id,

      handler: async (response) => {
        await dispatch(
          placeOrder({
            items,
            shippingAddress: address,
            payment: {
              method: "ONLINE",
              razorpayOrderId: data.id,
              razorpayPaymentId: response.razorpay_payment_id,
              status: "Paid",
            },
            totalAmount,
          })
        );

        await api.delete("/cart/clear");
        dispatch(fetchCart());
        navigate("/payment-success");
      },

      theme: { color: "#10b981" },
    };

    new window.Razorpay(options).open();
  };

  return (
    <div className="max-w-3xl mx-auto p-6 text-white">
      <h2 className="text-2xl text-emerald-400 mb-6">Checkout</h2>

      {/* ADDRESS */}
      <div className="grid gap-3 mb-6">
        {Object.keys(address).map((k) => (
          <input
            key={k}
            placeholder={k}
            className="p-3 rounded bg-gray-800"
            onChange={(e) =>
              setAddress({ ...address, [k]: e.target.value })
            }
          />
        ))}
      </div>

      {/* PAYMENT METHOD */}
      <div className="mb-6">
        <p className="mb-2 text-gray-300">Payment Method</p>

        <label className="flex items-center gap-2 mb-2">
          <input
            type="radio"
            value="ONLINE"
            checked={paymentMethod === "ONLINE"}
            onChange={() => setPaymentMethod("ONLINE")}
          />
          Online Payment
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="COD"
            checked={paymentMethod === "COD"}
            onChange={() => setPaymentMethod("COD")}
          />
          Cash on Delivery
        </label>
      </div>

      {/* ACTION BUTTON */}
      <button
        onClick={
          paymentMethod === "COD"
            ? placeCODOrder
            : handleOnlinePayment
        }
        className="w-full bg-emerald-600 py-3 rounded-xl font-semibold"
      >
        {paymentMethod === "COD" ? "Place Order" : "Pay Now"}
      </button>
    </div>
  );
};

export default Checkout;
