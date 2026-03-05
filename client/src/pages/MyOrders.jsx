import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyOrders } from "../features/order/orderSlice";

const statusColor = (status) => {
  if (status === "Delivered") return "text-emerald-400 bg-emerald-400/10";
  if (status === "Cancelled") return "text-red-400 bg-red-400/10";
  return "text-yellow-400 bg-yellow-400/10";
};

const MyOrders = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((s) => s.orders);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  if (loading)
    return (
      <p className="text-gray-400 text-center mt-20">
        Loading your orders...
      </p>
    );

  if (error)
    return (
      <p className="text-red-400 text-center mt-20">
        {error}
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 text-white">
      <h2 className="text-3xl font-semibold text-emerald-400 mb-10">
        My Orders
      </h2>

      {list.length === 0 ? (
        <p className="text-gray-400 text-center">
          You haven’t placed any orders yet.
        </p>
      ) : (
        <div className="space-y-8">
          {list.map((o) => (
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
              <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                <span
                  className={`
                    px-4 py-1 rounded-full text-sm font-medium
                    ${statusColor(o.orderStatus)}
                  `}
                >
                  {o.orderStatus}
                </span>

                <p className="text-lg font-semibold text-emerald-400">
                  ₹{o.totalAmount}
                </p>
              </div>

              {/* ITEMS */}
              <div className="space-y-4">
                {o.items.map((i) => (
                  <div
                    key={i._id}
                    className="
                      flex gap-4 items-center
                      bg-black/30 rounded-2xl p-4
                    "
                  >
                    <img
                      src={i.image}
                      alt={i.name}
                      className="w-16 h-16 object-contain rounded-lg"
                    />

                    <div className="flex-1">
                      <p className="font-medium">{i.name}</p>
                      <p className="text-sm text-gray-400">
                        Quantity: {i.qty}
                      </p>
                    </div>
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

export default MyOrders;
