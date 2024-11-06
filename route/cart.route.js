const express = require("express");
const router = express.Router();
const {
  getCart,
  clearCart,
  postCart,
} = require("../controller/cart.controller");

router.get("/:userId", getCart);
router.delete("/:userId", clearCart);
router.post("/checkout", postCart);

module.exports = router;
