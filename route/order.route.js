const express = require('express');
const router = express.Router();
const { createOrder, getOrdersByUser, getAllOrders, updateOrderStatus } = require('../controller/order.controller');

router.post('/create', createOrder);
router.get("/:userId", getOrdersByUser);
router.get("/", getAllOrders)
router.patch("/:orderId/status", updateOrderStatus);


module.exports = router;
