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
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) {
      return res.status(404).json({ message: "cart not found" });
    }
    res.json(cart.cartItems);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
    getCart,
    clearCart,
    postCart
}
