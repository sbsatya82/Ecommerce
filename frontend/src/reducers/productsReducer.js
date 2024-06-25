import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const initialState = {
  products: [],
  status: 'idle',
  error: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  
  async (keyword='') => {
    try {
      const response = await axios.get(`/api/v1/products?keyword=${keyword}`);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);



const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getProducts(state, action) {},
    getProduct(state, action) {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  },
});
export default productsSlice.reducer;