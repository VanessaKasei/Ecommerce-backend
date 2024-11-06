const Order = require("../models/order.model");

const createOrder = async (req, res) => {
    const { userId, cartItems, shippingInfo, paymentMethod, paymentStatus } = req.body;
  
    const orderId = `ORD-${Math.floor(Math.random() * 1000000)}`; // Simple order ID generation strategy
  
    try {
      const newOrder = new Order({
        userId,
        cartItems,
        shippingInfo,
        paymentMethod,
        paymentStatus,
        orderId, 
      });
  
      const savedOrder = await newOrder.save();
  
      res.status(201).json({
        message: 'Order placed successfully',
        orderId: savedOrder.orderId,
        orderDetails: savedOrder,
      });
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ message: 'Error placing order, please try again later' });
    }
  };

  const getOrder = async (req, res) => {
    const { userId } = req.params;  
  
    try {
      const orders = await Order.find({ userId }); 
  
      if (!orders || orders.length === 0) {
        return res.status(404).json({ message: 'No orders found for this user' });
      }
  
      res.status(200).json(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ message: 'Error fetching orders, please try again later' });
    }
  };

module.exports = { createOrder, getOrder };
