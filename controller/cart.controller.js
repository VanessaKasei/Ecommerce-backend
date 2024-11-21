const Cart = require("../models/cart.model");

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(cart || { userId: req.params.userId, cartItems: [] });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const clearCart = async (req, res) => {
  try {
    await Cart.deleteOne({ userId: req.params.userId });
    res.status(200).send();
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

const postCart = async (req, res) => {
  try {
    const { userId, cartItems } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    if (!cartItems || !Array.isArray(cartItems)) {
      return res
        .status(400)
        .json({ message: "Cart items must be provided as an array" });
    }

    // Find the cart by userId or create a new one if it doesn't exist
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // If cart doesn't exist, create a new cart
      cart = new Cart({
        userId,
        cartItems: cartItems.map((item) => ({
          _id: item._id,
          name: item.name,
          price: item.price,
          image: item.image,
          variationId: item.variationId || null,
          quantity: item.quantity,
          variationDetails: item.variationDetails || null, 
        })),
      });
    } else {
      cart.cartItems = cartItems; // merge them
    }
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getCart,
  clearCart,
  postCart,
};
