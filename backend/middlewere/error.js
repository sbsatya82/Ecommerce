const ErrorHandler = require("../utils/errorHandler")

module.exports = (err, req, res, next)=>{
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server Error";

  //wrong mongo db id error
  if(err.name === "CastError"){
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400)
  }
//mongodb duplicate error
  if(err.code === 11000){
    err = new ErrorHandler(`Duplicate ${Object.keys(err.keyValue)} entered`, 400)
  }
  
  //wrong JWT expire error 
  
  if(err.name ==="TokenExpireError"){
    const message = 'Json web token is Expired, try again'
    err = new ErrorHandler(message, 400)
  }

  res.status(err.statusCode).json({
    success:false,
    message: err.message,
  })
}