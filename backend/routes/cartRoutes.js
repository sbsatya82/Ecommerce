const express = require("express");
const { isAuthenticatedUser } = require("../middlewere/auth");
const { addItemToCart, getCartItems, removeItemFromCart, removeCart} = require("../controllers/cartController");
const router = express.Router();



router.route("/cart").get(isAuthenticatedUser,getCartItems);
router.route("/cart/new").post(isAuthenticatedUser,addItemToCart);
router.route("/cart/:productId").delete(isAuthenticatedUser,removeItemFromCart);
router.route("/cart/remove").get(isAuthenticatedUser,removeCart);

module.exports = router;