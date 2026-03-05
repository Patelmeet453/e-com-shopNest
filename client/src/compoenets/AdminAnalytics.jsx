import { useEffect, useState } from "react";
import api from "../api/axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  Users,
  Package,
  ShoppingBag,
  IndianRupee,
} from "lucide-react";


/* ========================
   FORMATTERS
======================== */
const formatDay = (d) => `${d._id.day}/${d._id.month}`;

const formatWeek = (w) => `Week ${w._id.week}`;

const formatMonth = (m) =>
  new Date(m._id.year, m._id.month - 1).toLocaleString("default", {
    month: "short",
    year: "numeric",
  });

/* ========================
   COMPONENT
======================== */
const AdminAnalytics = () => {
  const [data, setData] = useState(null);
  const [view, setView] = useState("daily");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/analytics", { withCredentials: true })
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  }, []);

  /* ========================
     LOADING STATE
  ======================== */
  if (loading) {
    return (
      <div className="grid md:grid-cols-4 gap-6 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-24 rounded-xl bg-gradient-to-br from-emerald-900/30 to-gray-900/40"
          />
        ))}

        <div className="md:col-span-4 h-[360px] rounded-2xl bg-gradient-to-br from-emerald-900/30 to-gray-900/40" />
      </div>
    );
  }

  /* ========================
     CHART DATA
  ======================== */
  const chartData =
    view === "daily"
      ? data.dailyRevenue.map((d) => ({
          label: formatDay(d),
          revenue: d.total,
        }))
      : view === "weekly"
      ? data.weeklyRevenue.map((w) => ({
          label: formatWeek(w),
          revenue: w.total,
        }))
      : data.monthlyRevenue.map((m) => ({
          label: formatMonth(m),
          revenue: m.total,
        }));

  return (
    <div className="space-y-10 px-6 mx-auto">
      {/* ========================
    STATS CARDS (WITH ICONS)
======================== */}
<div className="grid md:grid-cols-4 gap-6">
  {[
    {
      key: "users",
      label: "Users",
      value: data.users,
      icon: Users,
    },
    {
      key: "products",
      label: "Products",
      value: data.products,
      icon: Package,
    },
    {
      key: "orders",
      label: "Orders",
      value: data.orders,
      icon: ShoppingBag,
    },
    {
      key: "revenue",
      label: "Revenue",
      value: `₹${data.revenue}`,
      icon: IndianRupee,
    },
  ].map(({ key, label, value, icon: Icon }) => (
    <div
      key={key}
      className="
        relative overflow-hidden
        rounded-2xl p-6
        bg-gradient-to-br from-[#020617]/80 to-emerald-950/60
        border border-emerald-900/30
        backdrop-blur
      "
    >
      {/* BIG ICON */}
      <Icon
        className="
          absolute top-4 right-2
          w-20 h-20
          text-emerald-600/15
        "
      />

      {/* CONTENT */}
      <p className="text-gray-400 tracking-wide z-10 relative">
        {label}
      </p>
      <h2 className="text-3xl font-semibold text-emerald-400 mt-2 z-10 relative">
        {value}
      </h2>
    </div>
  ))}
</div>


      {/* ========================
          VIEW SWITCH
      ======================== */}
      <div className="flex gap-3">
        {["daily", "weekly", "monthly"].map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition
              ${
                view === v
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20"
                  : "bg-emerald-900/20 text-gray-400 hover:text-white border border-emerald-900/30"
              }
            `}
          >
            {v.toUpperCase()}
          </button>
        ))}
      </div>

      {/* ========================
          CHART
      ======================== */}
      <div
        className="
          rounded-3xl p-6
          bg-gradient-to-br from-[#020617]/80 to-emerald-950/50
          border border-emerald-900/30
          backdrop-blur
        "
      >
        <h3 className="text-xl font-semibold text-emerald-400 mb-4">
          Revenue Trend ({view})
        </h3>

        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={chartData}>
            <CartesianGrid
              stroke="#064e3b"
              strokeDasharray="4 4"
            />
            <XAxis dataKey="label" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#020617",
                border: "1px solid #10b981",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#6ee7b7" }}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ r: 4, fill: "#10b981" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminAnalytics;
