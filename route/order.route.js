const express = require('express');
const router = express.Router();
const { createOrder, getOrdersByUser } = require('../controller/order.controller');

router.post('/create', createOrder);
router.get("/:userId", getOrdersByUser);

module.exports = router;
