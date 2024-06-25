const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReview, getAdminProduct } = require("../controllers/projuctController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewere/auth");
const upload = require("../middlewere/multer");


const router = express.Router();

router.route("/products")
  .get(getAllProducts);



router.route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoles('admin'),getAdminProduct);



router.route("/product/new")
.post(isAuthenticatedUser, authorizeRoles('admin'),upload.array('images'), createProduct);


  
router.route("/product/:id")
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct)
  .get(getProductDetails)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);


router.route("/review")
  .put(isAuthenticatedUser, createProductReview);


router.route("/reviews")
  .get(isAuthenticatedUser, getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);




module.exports = router;