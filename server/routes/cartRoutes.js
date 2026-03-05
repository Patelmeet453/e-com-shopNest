import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getCart,
  addToCart,
  updateQty,
  clearCart,
  removeFromCart,
} from "../controllers/cartController.js";

const router = express.Router();

router.get("/", protect, getCart);
router.post("/", protect, addToCart);
router.put("/", protect, updateQty);
router.delete("/clear", protect, clearCart);
router.delete("/:productId", protect, removeFromCart);

export default router;
