const mongoose = require("mongoose");

const variationSchema = new mongoose.Schema({
  size: String,
  color: String,
  material: String,
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  generalPrice: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    require: () => {
      return this.variations.length === 0;
    },
  },
  catgeories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Catgeory",
    },
  ],
  variations:[variationSchema],
  createdAt:{
    type: Date,
    default: Date.now,
  }
});

const Product = mongoose.model('Product', productSchema)
module.exports = Product;
