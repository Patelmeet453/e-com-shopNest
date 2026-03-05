import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

export const getDashboardStats = async (req, res) => {
  const users = await User.countDocuments();
  const products = await Product.countDocuments();

  const orders = await Order.find({ orderStatus: "Delivered" });

  const revenue = orders.reduce(
    (sum, o) => sum + o.totalAmount,
    0
  );

  res.json({
    users,
    products,
    orders: orders.length,
    revenue,
  });
};
