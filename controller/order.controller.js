const Order = require("../models/order.model");
const createOrder = async (req, res) => {
  const { userId, cartItems, shippingInfo, paymentMethod, paymentStatus } =
    req.body;

  try {
    const newOrder = new Order({
      userId,
      cartItems: cartItems.map((item) => ({
        ...item,
        variationDetails: item.variationDetails || null,
      })),
      shippingInfo,
      paymentMethod,
      paymentStatus,
    });

    const savedOrder = await newOrder.save();

    res.status(200).json({
      message: "Order placed successfully",
      orderId: savedOrder._id,
      orderDetails: {
        cartItems: savedOrder.cartItems,
        shippingInfo: savedOrder.shippingInfo,
        paymentMethod: savedOrder.paymentMethod,
        paymentStatus: savedOrder.paymentStatus,
        orderStatus: savedOrder.orderStatus,
        createdAt: savedOrder.createdAt,
      },
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res
      .status(500)
      .json({ message: "Error placing order, please try again later" });
  }
};

const getOrdersByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await Order.find({ userId });
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find(); // Fetch all orders

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.json({ orders });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};



const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params; // Get order ID from the route parameter
  const { orderStatus } = req.body; // Get the new order status from the request body

  try {
    const order = await Order.findById(orderId); // Find the order by its ID

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Update the order status
    order.orderStatus = orderStatus;

    await order.save(); 

    res.json({ message: "Order status updated successfully", order });
  } catch (err) {
    console.error("Error updating order status:", err);
    res.status(500).json({ message: "Error updating order status" });
  }
};



module.exports = { createOrder, getOrdersByUser,getAllOrders, updateOrderStatus };
