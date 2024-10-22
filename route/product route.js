const express = require("express");
const router = express.Router();

const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  editProduct,
  deleteProduct,
} = require("../controller/product.controller");

router.post("/", createProduct);
router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);
router.put("/:id",editProduct)
router.delete("/:id",deleteProduct)

module.exports = router;
