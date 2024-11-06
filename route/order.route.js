const express = require('express');
const router = express.Router();
const { createOrder, getOrder } = require('../controller/order.controller');

router.post('/create', createOrder);
router.get('/:userId', getOrder);

module.exports = router;
