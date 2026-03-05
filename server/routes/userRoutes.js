import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import {
  getUsers,
  blockUser,
  createUser,
  updateUser,
  deleteUser,
  getProfile,
  updateProfile,
} from "../controllers/userController.js";
import upload from "../middleware/multer.js";

const router = express.Router();

/* 🔥 PROFILE ROUTES FIRST */
router.get("/profile", protect, getProfile);
router.put(
  "/profile",
  protect,
  upload.single("image"),
  updateProfile
);

router.get("/", protect, adminOnly, getUsers);
router.post("/", protect, adminOnly, createUser);
router.put("/:id", protect, adminOnly, updateUser);
router.put("/:id/block", protect, adminOnly, blockUser);
router.delete("/:id", protect, adminOnly, deleteUser);



export default router;
