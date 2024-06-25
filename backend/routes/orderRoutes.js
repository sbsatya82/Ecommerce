const express = require("express");
const { newOrder, getSingleOrder, myOrder, getAllOrder, updateOrder, deleteOrder } = require("../controllers/orderController");
const { isAuthenticatedUser,authorizeRoles } = require("../middlewere/auth");
const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser,newOrder);

router.route("/order/:id").get(isAuthenticatedUser,getSingleOrder);

router.route("/orders/me").get(isAuthenticatedUser,myOrder);

router.route("/orders").get(isAuthenticatedUser,authorizeRoles('admin'),getAllOrder);

router.route("/order/:id").put(isAuthenticatedUser,authorizeRoles('admin'),updateOrder).delete(isAuthenticatedUser,authorizeRoles('admin'),deleteOrder);

module.exports = router;