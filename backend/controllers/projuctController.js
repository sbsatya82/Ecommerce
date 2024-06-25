const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewere/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");
const { uploadOnCloudinary, deleteFromCloudiary } = require("../utils/cloudinary");

//Create Product , Admin
exports.createProduct = catchAsyncError(async (req, res, next) => {
  
  let imagesLink = [];

  for (let file of req.files) {
    
    const result = await uploadOnCloudinary(file.path);
    console.log(result);
    imagesLink.push({
      public_id: result.public_id,
      url: result.secure_url
    });
  }

  req.body.images = imagesLink;


  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product
  });
});


//get all product
exports.getAllProducts = catchAsyncError(async (req, res, next) => {
  const resultPerPage = 10;
  const productCount = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);
  const products = await apiFeatures.query;
  res.status(200).json({
    success: true,
    products,
    productCount
  })
});
//get all product --admin

exports.getAdminProduct = catchAsyncError(async (req, res, next) => {

  const products = await Product.find();

  res.status(200).json({
    success: true,
    products
  })
})

//update product -- admin

exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404))
  }
  console.log("body:",req.body);
  const updatedproduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  })

  res.status(200).json({
    success: true,
    updatedproduct
  })
});


//delete product -- admin

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const productId = req.params.id;

  try {
    // Attempt to find the product by ID and delete it
    const removedProduct = await Product.findOneAndDelete({ _id: productId });

    // Check if product was found and deleted
    if (!removedProduct) {
      return next(new ErrorHandler("Product not found", 404))
    }

    //image remove from cloudnary

    for (let i = 0; i < removedProduct.images.length; i++) {
      deleteFromCloudiary(removedProduct.images[i].public_id);
    }

    // Respond with success message and removed product data
    return res.status(200).json({
      success: true,
      message: "Product removed successfully",
      data: removedProduct
    });

  } catch (error) {
    console.error("Error removing product:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
});

// product details 

exports.getProductDetails = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404))
  }
  res.status(200).json({
    success: true,
    product
  })
});

//create review

exports.createProductReview = catchAsyncError(async (req, res, next) => {

  const { rating, comment, productId } = req.body;

  // Validate input data
  if (!productId || !rating || !comment) {
    return next(new ErrorHandler("Please provide productId, rating, and comment", 400));
  }




  const product = await Product.findById(productId);
  if (!product) {
    return next(new ErrorHandler(`Product not found on this id:-${productId}`, 404))
  }


  // Check if the user has already reviewed this product
  const existingReview = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );


  if (existingReview) {
    // Update existing review
    existingReview.rating = rating;
    existingReview.comment = comment;
  } else {
    // Create a new review
    const newReview = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
    product.reviews.push(newReview);
    product.numOfReviews = product.reviews.length;
  }

  // Calculate average rating for the product
  let totalRating = 0;
  product.reviews.forEach((rev) => {
    totalRating += rev.rating;
  });
  product.ratings = totalRating / product.reviews.length;

  // Save the updated product
  await product.save();

  res.status(200).json({
    success: true,
    message: "Review created successfully",
  });
});


//get all review of a product

exports.getProductReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new ErrorHandler(`Product not found on this id:-${productId}`, 404));
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews
  })
});

//delete reviews
exports.deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHandler(`Product not found on this id:-${req.query.productId}`, 404));
  }

  const reviews = product.reviews.filter((rev) =>
    rev._id.toString() !== req.query.id.toString()
  );

  let totalRating = 0;
  reviews.forEach((rev) => {
    totalRating += rev.rating;
  });
  const ratings = totalRating / reviews.length;
  const noOfReview = reviews.length;
  // Save the updated product
  await Product.findByIdAndUpdate(
    req.query.productId,
    { 
      reviews,
      ratings, 
      noOfReview 
    }, 
    { new: true, 
      runValidators: true, 
      useFindAndModify: false 
    }
  );
  res.status(200).json({
    success: true,
  })
});