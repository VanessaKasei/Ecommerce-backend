const express = require("express");
const router = express.Router();

const {
  createCategory,
  getAllCategories,
  getSingleCategory,
} = require("../controller/category.controller");

router.post("/", createCategory);
router.get("/", getAllCategories);
router.get("/:id", getSingleCategory);

module.exports = router;
