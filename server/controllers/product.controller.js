import { Product } from "../models/product.model.js";

export const getProducts = async (_, res) => {
  try {
    const products = await Product.find();

    if (!products) {
      return res
        .status(404)
        .json({ success: false, message: "No products found." });
    }

    return res.status(200).json({
      success: true,
      message: "Products fetched successfully.",
      products,
    });
  } catch (error) {
    console.log("Error in getProducts controller.", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    return res.status(200).json({
      success: true,
      message: "Product fetched successfully.",
      product,
    });
  } catch (error) {
    console.log("Error in getProduct controller.", error.message);
  }
};
