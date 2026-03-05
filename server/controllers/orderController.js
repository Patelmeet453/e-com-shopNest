import Order from "../models/Order.js";

/* CREATE ORDER AFTER PAYMENT */
export const createOrder = async (req, res, next) => {
  try {
    const items = req.body.items.map((item) => ({
      product: item.product._id || item.product,
      name: item.product.name,
      price: item.product.price,
      image: item.product.image, // 🔥 CLOUDINARY URL SAVED HERE
      qty: item.qty,
    }));

    const order = await Order.create({
      user: req.user._id,
      items,
      shippingAddress: req.body.shippingAddress,
      payment: req.body.payment,
      totalAmount: req.body.totalAmount,
    });

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

/* USER ORDERS */
export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort("-createdAt");
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

/* ADMIN ALL ORDERS */
export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort("-createdAt");

    res.json(orders);
  } catch (error) {
    next(error);
  }
};

/* ADMIN UPDATE ORDER STATUS */
export const updateOrderStatus = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    order.orderStatus = req.body.status;
    await order.save();
    res.json(order);
  } catch (error) {
    next(error);
  }
};
