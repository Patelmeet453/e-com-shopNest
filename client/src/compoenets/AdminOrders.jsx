import { useEffect, useState } from "react";
import api from "../api/axios.js";

const statusStyle = (status) => {
  if (status === "Delivered") return "text-emerald-400 bg-emerald-400/10";
  if (status === "Cancelled") return "text-red-400 bg-red-400/10";
  return "text-yellow-400 bg-yellow-400/10";
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/orders").then((res) => setOrders(res.data));
  }, []);

  const updateStatus = (id, status) => {
    api.put(`/orders/${id}`, { status }).then((res) => {
      setOrders((o) => o.map((or) => (or._id === id ? res.data : or)));
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 text-white">
      <h2 className="text-3xl font-semibold text-emerald-400 mb-10">
        Orders Management
      </h2>

      {orders.length === 0 ? (
        <p className="text-gray-400 text-center">No orders found.</p>
      ) : (
        <div className="space-y-8">
          {orders.map((o) => (
            <div
              key={o._id}
              className="
                rounded-3xl p-6
                bg-gradient-to-br from-[#020617]/70 to-emerald-950/40
                border border-emerald-900/30
                backdrop-blur
              "
            >
              {/* HEADER */}
              <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                <div>
                  <p className="font-semibold text-lg">{o.user?.name}</p>
                  <p className="text-sm text-gray-400">
                    Total: ₹{o.totalAmount}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`px-4 py-1 rounded-full text-sm font-medium ${statusStyle(
                      o.orderStatus,
                    )}`}
                  >
                    {o.orderStatus}
                  </span>

                  <select
                    value={o.orderStatus}
                    onChange={(e) => updateStatus(o._id, e.target.value)}
                    className="
                      bg-emerald-900/20
                      border border-emerald-900/30
                      rounded-full px-4 py-2 text-sm
                      focus:outline-none focus:ring-1 focus:ring-emerald-600
                    "
                  >
                    <option>Pending</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </div>
              </div>

              {/* ITEMS */}
              <div className="space-y-4">
                {o.items.map((i) => (
                  <div
                    key={i._id}
                    className="
                      flex items-center gap-4
                      bg-black/30 rounded-2xl p-4
                    "
                  >
                    <img
                      src={i.image}
                      alt={i.name}
                      className="w-16 h-16 object-contain rounded-lg bg-black/40"
                    />

                    <div className="flex-1">
                      <p className="font-medium">{i.name}</p>
                      <p className="text-sm text-gray-400">Quantity: {i.qty}</p>
                    </div>

                    <p className="text-emerald-400 font-semibold">
                      ₹{i.price * i.qty}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
