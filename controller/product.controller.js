const Product = require("../models/product.model");
const Category = require("../models/category.model");

const createProduct = async (req, res) => {
  try {
    const { variations } = req.body;

    if (variations && variations.length > 0) {
      delete req.body.stock;
      delete req.body.image;
    }

    const product = new Product(req.body);
    await product.save();

    if (req.body.categories) {
      await Category.updateMany(
        { _id: { $in: req.body.categories } },
        { $push: { products: product._id } }
      );
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error);
  }
};

const getAllProducts = async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }
    const updatedProducts = await Product.findById(req.params.id);
    res.status(200).json(updatedProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  editProduct,
  deleteProduct,
};
