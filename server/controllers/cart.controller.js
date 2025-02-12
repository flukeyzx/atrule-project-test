import { Cart } from "../models/cart.model.js";

export const addItemToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({
      userId: req.user._id,
    });

    if (cart) {
      const existingProduct = cart.products.find(
        (p) => p.productId.toString() === productId
      );

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({
          productId,
          quantity,
        });
      }

      await cart.save();
    } else {
      cart = new Cart({
        userId: req.user._id,
        products: [{ productId, quantity }],
      });
      await cart.save();
    }

    return res.status(200).json({
      success: true,
      message: "Item added to cart successfully.",
      cart,
    });
  } catch (error) {
    console.log("Error in addItemToCart controller.", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

export const getCartItems = async (req, res) => {
  try {
    const cart = await Cart.find({
      userId: req.user._id,
    }).populate("products.productId");

    if (!cart.length) {
      return res
        .status(404)
        .json({ success: false, message: "No items found in the cart.", cart });
    }

    return res.status(200).json({
      success: true,
      message: "Cart items fetched successfully.",
      cart,
    });
  } catch (error) {
    console.log("Error in getCartItems controller.", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};
