const Category = require("../models/category.model");

const createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error);
  }
};

const getAllCategories = async (req, res) => {
  try {
    const category = await Category.find();
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingleCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate(
      "products"
    );
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ mesage: error.message });
  }
};


module.exports = {
    createCategory,
    getAllCategories,
    getSingleCategory
}