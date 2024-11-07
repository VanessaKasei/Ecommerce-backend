const Order = require("../models/order.model");
const createOrder = async (req, res) => {
  const { userId, cartItems, shippingInfo, paymentMethod, paymentStatus } = req.body;

  try {
    const newOrder = new Order({
      userId,
      cartItems,
      shippingInfo,
      paymentMethod,
      paymentStatus,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({
      message: "Order placed successfully",
      orderDetails: savedOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Error placing order, please try again later" });
  }
};

const getOrdersByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await Order.find({ userId });  // Find orders for this user
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};



module.exports = { createOrder, getOrdersByUser };
