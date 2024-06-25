const jwt = require("jsonwebtoken");
const catchAsyncError = require("./catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedData.id);

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }
    
    req.user = user;

    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    // Handle JWT verification errors and database query errors
    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
      return next(new ErrorHandler("Invalid or expired token", 401));
    }
    next(err); 
  }

});

exports.authorizeRoles = (...roles) => {
  return (req,res,next) => {
    if(!roles.includes(req.user.role)){
      return next(new ErrorHandler(`Role: ${req.user.role} is not allowed access this resouce`, 403)
    );
    };
    next();
  }
}