const Product = require("../models/productModel")
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewere/catchAsyncError");
const User = require ("../models/userModel");
const Cart = require("../models/cartModel");


//add item to cart 

exports.addItemToCart = catchAsyncError(async (req,res,next) => {
  const { productId, quantity = 1 } = req.body; 
  const userId = req.user.id;


  const product = await Product.findById(productId);
  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    // Create a new cart if it doesn't exist
    cart = await Cart.create({ 
      user: userId, 
      cartItems: [
      {
        product: productId,
        quantity
      }
    ]});
  }

  const cartItem = cart.cartItems.find(item => item.product.equals(productId));
  if(cartItem){
    cartItem.quantity += quantity;
  }else{
    cart.cartItems.push({
      product:productId,
      quantity
    })
  }

  await cart.save();

  res.status(201).json({
    success:true,
    message:`Item add to cart successfully`,
    cart
  });
});


// Get cart items
exports.getCartItems = catchAsyncError(async (req, res, next) => {
  const userId = req.user.id;

  const cart = await Cart.findOne({ user: userId }).populate('cartItems.product');

  if (!cart) {
    return next(new ErrorHandler('Cart not found', 404));
  }

  res.status(200).json({
    success: true,
    cart
  });
});


// Remove item from cart
exports.removeItemFromCart = catchAsyncError(async (req, res, next) => {
  const { productId } = req.params; // Note the change here
  const userId = req.user.id;

  const product = await Product.findById(productId);
  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    return next(new ErrorHandler('Cart not found', 404));
  }

  const cartItemIndex = cart.cartItems.findIndex(item => item.product.equals(productId));
  if (cartItemIndex === -1) {
    return next(new ErrorHandler('Product not found in cart', 404));
  }

  const cartItem = cart.cartItems[cartItemIndex];
  
   // Remove the item entirely from the cart
   cart.cartItems.splice(cartItemIndex, 1);

  // Save the updated cart
  await cart.save();

  res.status(200).json({
    success: true,
    message: 'Item removed from cart successfully',
    cart
  });
});



//remove cart based on user 

exports.removeCart = catchAsyncError(async(req,res,next)=>{
  const userId = req.user.id;

  const cart = await Cart.findOneAndDelete({ user: userId })
  if(!cart){
    return next(new ErrorHandler('Cart not found', 404));
  }
  res.status(200).json({
    success: true,
    message: 'Cart removed successfully',
  })
})