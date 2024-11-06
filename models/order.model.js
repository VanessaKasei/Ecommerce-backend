const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  cartItems: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      variationDetails: {
        size: { type: String },
        color: { type: String },
        material: { type: String }
      }
    }
  ],
  shippingInfo: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true }
  },
  paymentMethod: {
    type: String,
    enum: ['mpesa', 'creditCard'],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['payNow', 'payLater'],
    required: true
  },
  orderStatus: {
    type: String,
    enum: ['pending', 'completed', 'canceled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
