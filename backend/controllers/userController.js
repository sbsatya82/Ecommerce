const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewere/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const { sendEmail } = require("../utils/sendEmail");
const crypto = require('crypto');



//register user

exports.registerUser = catchAsyncError(async (req,res,next)=>{
  const {name, email, password} = req.body;
  const user = await User.create({
    name,email,password,
    avatar:{
      public_id:"sample id",
      url:"sample url"
    }
  });

  sendToken(user,201,res)

})

//login user

exports.loginUser = catchAsyncError(async(req,res,next) => {
  const {email, password} = req.body;
  if(!email || !password){
    return next(new ErrorHandler("Enter your email & password", 400))
  }
  const user = await User.findOne({email}).select('+password');
  if(!user){
    return next(new ErrorHandler("Invalid email or password", 401)); 
  }

  const isPasswordMatched = await user.comparePassword(password);

  if(!isPasswordMatched){
    return next(new ErrorHandler("Invalid email or password", 401))
  }
  
  sendToken(user,200,res)
})


//logout user

exports.logoutUser = catchAsyncError(async(req,res,next) => {

  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly:true
  })

  res.status(200).json({
    success:true,
    message:"Logout successfully"
  })
});

//forget password 

  exports.forgotPassword = catchAsyncError(async(req,res,next) => {
    const user = await User.findOne({email:req.body.email});
    if(!user){
      return next(new ErrorHandler("User not found",404));
    }
    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave:false});

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n${resetPasswordUrl}\n\nIf you have not requested email then please ignore it`;

    try{
      await sendEmail({
        email:user.email,
        subject:`Ecommerce Password Recovery`,
        message
      });
      res.status(200).json({
        success:true,
        message:`Email sent to ${user.email} successfully`,
      })
    }catch(error){
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({validateBeforeSave:false});
      return next(new ErrorHandler(error.message,500))
    }

  })


//reset password
exports.resetPassword = catchAsyncError(async(req,res,next) => {
  //creating has token
  const resetPasswordToken = crypto
  .createHash('sha256')
  .update(req.params.token)
  .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: {$gt : Date.now()}
  });

  if(!user){
    return next(new ErrorHandler("Reset password token is invalid or has been expired", 400))
  }

// Trim and normalize password inputs
const password = req.body.password.trim();
const confirmPassword = req.body.confirmPassword.trim();

if (password !== confirmPassword) {
  console.log(`Entered password: '${password}'`);
  console.log(`Entered confirmPassword: '${confirmPassword}'`);
  return next(new ErrorHandler("Password does not match", 400));
}

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendToken(user, 200,res);
})


//get user details
exports.getUserDetails = catchAsyncError(async(req,res,next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success:true,
    user,
  })
});

//Update user password
exports.updatePassword = catchAsyncError(async(req,res,next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if(!isPasswordMatched){
    return next(new ErrorHandler("Old password is incorrect", 401));
  }
  if(req.body.confirmPassword!==req.body.newPassword){
    return next(new ErrorHandler("password does not match", 401));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendToken(user,200,res);
});

//Update user profile
exports.updateProfile = catchAsyncError(async(req,res,next) => {
  const newUserData ={
    name:req.body.name,
    email:req.body.email
  };

    // Find user by ID and update with new data
    const user = await User.findByIdAndUpdate(
      req.user.id,
      newUserData,
      {
        new: true, // Return the updated document after update
        runValidators: true, // Run Mongoose schema validators on update
        useFindAndModify: false // Use native findOneAndUpdate() instead of findAndModify()
      }
    );
  
    if (!user) {
      return next(new Error('User not found')); // Handle case where user is not found
    }

  res.status(200).json({
    success:true,
    user
  });
});

//get all user --admin
exports.getAllUser = catchAsyncError(async(req,res,next) => {
  const users = await User.find();
  res.status(200).json({
    success:true,
    users 
  });
})
//get single user --admin
exports.getSingleUser = catchAsyncError(async(req,res,next) => {
  const user = await User.findById(req.params.id);

  if(!user){
    return  next(new ErrorHandler(`User does not exist with id: ${req.params.id}`),401);
  }
  res.status(200).json({
    success:true,
    user 
  });
})


//Update user role -- admin
exports.updateRole = catchAsyncError(async(req,res,next) => {
    const {role} = req.body;
    const {id} = req.params;

    // Check if required fields are provided
  if (!role || !id) {
    return next(new ErrorHandler("Role and user ID are required", 400));
  }

    // Find user by ID and update the role
  const user = await User.findByIdAndUpdate(
    id,
    { role }, // Update the 'role' field with the new role value
    {
      new: true, // Return the updated document after update
      runValidators: true, // Run Mongoose schema validators on update
      useFindAndModify: false, // Use native findOneAndUpdate() instead of findAndModify()
    }
  );

  // Check if user was not found
  if (!user) {
    return next(new ErrorHandler(`User not found with ID: ${id}`, 404));
  }


  res.status(200).json({
    success:true,
    user
  });
});


//delete user 
exports.deleteUser = catchAsyncError(async(req,res,next) => {
  
    const user = await User.findByIdAndDelete(req.params.id);
  
    if (!user) {
      return next(new Error('User not found')); 
    }

    res.status(200).json({
      success:true,
      message:"User delete successfully"
    });
});