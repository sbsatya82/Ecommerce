import {configureStore} from '@reduxjs/toolkit'
import productsReducer from '../reducers/productsReducer';
import userSlice from '../reducers/userSlice';
import cartSlice from '../reducers/cartSlice';


export const store = configureStore({
  reducer: {
    products: productsReducer,
    user: userSlice,
    cart: cartSlice
  },
})
