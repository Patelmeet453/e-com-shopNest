import User from "../models/User.js";

/* GET CART */
export const getCart = async (req, res) => {
  const user = await User.findById(req.user._id).populate("cart.product");
  res.json(user.cart);
};

/* ADD TO CART */
export const addToCart = async (req, res) => {
  const { productId, qty } = req.body;

  const user = await User.findById(req.user._id);

  const existing = user.cart.find((i) => i.product.toString() === productId);

  if (existing) {
    existing.qty += qty;
  } else {
    user.cart.push({ product: productId, qty });
  }

  await user.save();
  await user.populate("cart.product");

  res.json(user.cart);
};

/* UPDATE QTY */
export const updateQty = async (req, res) => {
  const { productId, qty } = req.body;

  const user = await User.findById(req.user._id);

  const item = user.cart.find((i) => i.product.toString() === productId);

  if (item && qty >= 1) {
    item.qty = qty;
  }

  await user.save();
  await user.populate("cart.product");

  res.json(user.cart);
};

/* REMOVE ITEM */
export const removeFromCart = async (req, res) => {
  const user = await User.findById(req.user._id);

  user.cart = user.cart.filter(
    (i) => i.product.toString() !== req.params.productId,
  );

  await user.save();
  await user.populate("cart.product");

  res.json(user.cart);
};

/* 🔥 CLEAR CART (IMPORTANT) */

/* 🔥 CLEAR CART */
export const clearCart = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.cart = []; // 👈 THIS is the key line
  await user.save();

  res.json([]);
};
