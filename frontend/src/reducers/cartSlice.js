import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name : "cart",
  initialState : {
    cartItems: [],
    status: 'idle',
  },
  reducers : {
    cartItems(state, action){
      state.cartItems = action.payload;
      state.status = 'succeeded';
    }
    ,
    addToCart(state, action) {
      const item = action.payload;
      const existingItem = state.cartItems.find(cartItem => cartItem.productId === item.productId);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.cartItems.push(item);
      }
      state.status = 'succeeded';
    },
    removeFromCart(state, action) {
      const productId = action.payload;
      state.cartItems = state.cartItems.filter(cartItem => cartItem.productId !== productId);
      state.status = 'succeeded';
    },
  }
})


export const { cartItems, addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;