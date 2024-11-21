const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  variationId: {
    type: String,
    required: false,
  },
  variationDetails: {
    type: Object,  
    default: {},
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  cartItems: [cartItemSchema],
});


module.exports = mongoose.model('Cart', cartSchema)
