  const mongoose = require('mongoose');

  const cartModel = new mongoose.Schema({
    cartItems:[{
      product:{
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true
      },
      quantity:{
        type:Number,
        default:1
      }
    }],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true
    },
  },{timestamps:true});

  module.exports = mongoose.model("Cart", cartModel);