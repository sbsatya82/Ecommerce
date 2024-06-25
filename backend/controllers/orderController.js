
const Order = require("../models/orderModel");
const Product = require("../models/productModel")
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewere/catchAsyncError");


//create new order 

exports.newOrder = catchAsyncError(async (req,res,next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt:Date.now(),
    user:req.user._id
  });

  res.status(201).json({
    success:true,
    message:`Order create successfully`,
    order
  });
})

//get single order 
exports.getSingleOrder = catchAsyncError(async (req,res,next) => {
  const order = await Order.findById(req.params.id).populate("user","name email");

  if(!order){
    return next(new ErrorHandler("Order not found", 404));
  }

  res.status(201).json({
    success:true,
    order,
  })
})


//get logged in user orders 
exports.myOrder = catchAsyncError(async (req,res,next) => {
  const orders = await Order.find({
    user:req.user._id,
  })

  if(!orders){
    return next(new ErrorHandler(`Order not found`, 404));
  }

  res.status(201).json({
    success:true,
    orders,
  });
})

//get all orders --admin
exports.getAllOrder = catchAsyncError(async (req,res,next) => {
  const orders = await Order.find();

  if(!orders){
    return next(new ErrorHandler(`Order not found`, 404));
  }

  let totalAmount =0;
  orders.forEach(order => {
    totalAmount += order.totalPrice;
  });

  res.status(201).json({
    success:true,
    totalAmount,
    orders,
  });
})

//update order status --admin
exports.updateOrder = catchAsyncError(async (req,res,next) => {
  const order = await Order.findById(req.params.id);

  if(!order){
    return next(new ErrorHandler(`Order not found`, 404));
  }

 if(order.orderStatus==="Delivered"){
  return next(new ErrorHandler("You have already delivered this product", 404))
 }

 order.orderItems.forEach(async (order) => {
  await updateStock(order.product, order.quantity);
 });


 order.orderStatus = req.body.status;
 if(req.body.status ==="Delivered"){
  order.deliveredAt = Date.now();
 }

 await order.save({
  validateBeforeSave:false
 })

  res.status(201).json({
    success:true
  });
})

//stock update
async function updateStock (id,quantity){
  const product = await Product.findById(id);
  product.stock -= quantity;
  await product.save({validateBeforeSave:false})
}


//delete order
exports.deleteOrder = catchAsyncError(async (req,res,next) => {
  const order = await Order.findByIdAndDelete(req.params.id);

  if(!order){
    return next(new ErrorHandler(`Order not found`, 404));
  }


  res.status(201).json({
    success:true,
  });
})