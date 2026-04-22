import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";

export const getProducts = async (req, res, next) => {
  try {
    res.json(await Product.find());
  } catch (error) {
    next(error);
  }
};


export const createProduct = async (req, res, next) => {
  try {
    if (req.user.email === "demo@gmail.com") {
      return res.status(403).json({ message: "Demo mode - edit disabled" });
    }
    // 1️⃣ Upload image to Cloudinary
    const result = await cloudinary.v2.uploader.upload(req.file.path);

    // 2️⃣ Create product
    const product = await Product.create({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      specs: JSON.parse(req.body.specs), // 🔥 important
      image: result.secure_url,
      stock: req.body.stock,
    });

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};
// export const updateProduct = async (req, res, next) => {
//   try {
//     const product = await Product.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     res.json(product);
//   } catch (error) {
//     next(error);
//   }
// };

export const updateProduct = async (req, res, next) => {
  try {
    if (req.user.email === "demo@gmail.com") {
      return res.status(403).json({ message: "Demo mode - edit disabled" });
    }
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 🔁 Update text fields
    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.category = req.body.category || product.category;
    product.stock = req.body.stock || product.stock;

    // 🔁 Update specs
    if (req.body.specs) {
      product.specs = JSON.parse(req.body.specs);
    }

    // 🔁 Update image (if new image uploaded)
    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path);
      product.image = result.secure_url;
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
};
export const deleteProduct = async (req, res, next) => {
  try {
    if (req.user.email === "demo@gmail.com") {
      return res.status(403).json({ message: "Demo mode - edit disabled" });
    }
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (error) {
    next(error);
  }
};

