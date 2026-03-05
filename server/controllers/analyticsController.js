import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

export const getAnalytics = async (req, res, next) => {
  try {
    const users = await User.countDocuments();
    const products = await Product.countDocuments();
    const orders = await Order.countDocuments();

    const deliveredMatch = { orderStatus: "Delivered" };

    /* TOTAL REVENUE */
    const revenueData = await Order.find(deliveredMatch);
    const revenue = revenueData.reduce(
      (sum, o) => sum + o.totalAmount,
      0
    );

    /* 📅 DAY-WISE (LAST 7 DAYS) */
    const dailyRevenue = await Order.aggregate([
      { $match: deliveredMatch },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },
          total: { $sum: "$totalAmount" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
      { $limit: 7 },
    ]);

    /* 📅 WEEK-WISE (LAST 8 WEEKS) */
    const weeklyRevenue = await Order.aggregate([
      { $match: deliveredMatch },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            week: { $week: "$createdAt" },
          },
          total: { $sum: "$totalAmount" },
        },
      },
      { $sort: { "_id.year": 1, "_id.week": 1 } },
      { $limit: 8 },
    ]);

    /* 📅 MONTH-WISE */
    const monthlyRevenue = await Order.aggregate([
      { $match: deliveredMatch },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          total: { $sum: "$totalAmount" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    res.json({
      users,
      products,
      orders,
      revenue,
      dailyRevenue,
      weeklyRevenue,
      monthlyRevenue,
    });
  } catch (error) {
    next(error);
  }
};
