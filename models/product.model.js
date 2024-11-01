const mongoose = require("mongoose");

const variationSchema = new mongoose.Schema({
  size: String,
  color: String,
  material: String,
  price: {
    type: Number,
    required: true,
  },
  image:{
    type:String,
    required:true
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
  },
  description: {
    type: String,
    required: true,
  },
  image:{
    type:String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  variations: [variationSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
