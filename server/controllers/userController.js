import User from "../models/User.js";
import bcrypt from "bcryptjs";
import cloudinary from './../config/cloudinary.js';

/* GET ALL USERS */
export const getUsers = async (req, res, next) => {
  try {
    res.json(await User.find().select("-password"));
  } catch (error) {
    next(error);
  }
};

/* CREATE USER (ADMIN) */
export const createUser = async (req, res, next) => {
  if (req.user.email === "demo@gmail.com") {
    return res.status(403).json({ message: "Demo mode - edit disabled" });
  }
  try {
    const { name, email, password, role } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isBlocked: user.isBlocked,
    });
  } catch (error) {
    next(error);
  }
};

/* UPDATE USER */
export const updateUser = async (req, res, next) => {
  if (req.user.email === "demo@gmail.com") {
    return res.status(403).json({ message: "Demo mode - edit disabled" });
  }
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = req.body.name || user.name;
    user.role = req.body.role || user.role;

    await user.save();
    res.json(user);
  } catch (error) {
    next(error);
  }
};

/* BLOCK / UNBLOCK */

export const blockUser = async (req, res, next) => {
  try {
    if (req.user.email === "demo@gmail.com") {
      return res.status(403).json({ message: "Demo mode - edit disabled" });
    }
    // ❌ Admin trying to block themselves
    if (req.user._id.toString() === req.params.id) {
      return res.status(400).json({
        message: "Admin cannot block themselves",
      });
    }

    const { block } = req.body; // true | false
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isBlocked = block;
    await user.save();

    res.json(user);
  } catch (error) {
    next(error);
  }
};

/* DELETE USER */
export const deleteUser = async (req, res, next) => {
  if (req.user.email === "demo@gmail.com") {
    return res.status(403).json({ message: "Demo mode - edit disabled" });
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    next(error);
  }
};



/* GET PROFILE */
export const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.json(user);
};

/* UPDATE PROFILE */
export const updateProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  /* 🔥 IMAGE UPLOAD */
  if (req.file) {
    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: "profile-images",
    });
    user.profileImage = result.secure_url;
  }

  await user.save();
  res.json(user);
};