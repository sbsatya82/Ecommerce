const express = require("express");
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUser, getSingleUser, updateRole, deleteUser } = require("../controllers/userController");
const { isAuthenticatedUser,authorizeRoles } = require("../middlewere/auth");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/logout").get(logoutUser);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isAuthenticatedUser,getUserDetails);
router.route("/password/update").put(isAuthenticatedUser,updatePassword);
router.route("/me/update").put(isAuthenticatedUser,updateProfile);

router.route("/users").get(isAuthenticatedUser,authorizeRoles('admin'),getAllUser);
router.route("/user/:id").get(isAuthenticatedUser,authorizeRoles('admin'),getSingleUser);

router.route("/user/:id").put(isAuthenticatedUser,authorizeRoles('admin'),updateRole);
router.route("/user/:id").delete(isAuthenticatedUser,authorizeRoles('admin'),deleteUser);


module.exports = router;