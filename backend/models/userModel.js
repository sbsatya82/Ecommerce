const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true, "Please enter your name"],
    maxLength:[30, "Name cannot be exceed 30 characters"],
    minLength:[4, "Name should be more than 4 characters"],
  },
  email:{
    type:String,
    required:[true, "Please enter your email"],
    unique:true,
    validate:[validator.isEmail,"Please enter a valid email"]
  },
  password:{
    type:String,
    required:[true, "Please enter your password"],
    minLength:[6, "Password should be more than 6 characters"],
    select:false
  },
  avatar:{
    public_id:{
      type:String,
      required:true
    },
    url:{
      type:String,
      required:true
    }
  },
  role:{
    type:String,
    default:"user"
  },
  resetPasswordToken:String,
  resetPasswordExpire:Date,

},{timestamps:true});

userSchema.pre("save",async function(next){
  if(!this.isModified("password")){
    next();
  }
  this.password = await bcrypt.hash(this.password,10);
});

//JWT TOKEN

userSchema.methods.getJWTToken = function(){
  return jwt.sign({id:this._id},process.env.JWT_SECRET,{
    expiresIn: process.env.JWT_EXPIRE
  });
}

//compare password
userSchema.methods.comparePassword =async function(enterPassword){
  return await bcrypt.compare(enterPassword,this.password)
}
//Generating password reset token

userSchema.methods.getResetPasswordToken = function(){
  const resetToken = crypto.randomBytes(20).toString("hex");

  //hashing and adding restToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 15*60*1000;
  return resetToken;
}
module.exports = mongoose.model("User", userSchema);