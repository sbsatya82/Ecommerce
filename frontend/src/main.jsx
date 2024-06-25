// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Layout from './Layout';
import Login from './components/login/Login';
import SignUp from './components/singup/SignUp';
import Home from './components/home/Home';
import Contact from './components/contact/Contact';
import Products from './components/product/Products';
import ProductDetails from './components/product/ProductDetails';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import Search from './components/search/Search';
import Account from './components/account/Account.jsx';
import Profile from './components/profile/Profile.jsx';
import EditProfile from './components/profile/EditProfile.jsx';
import UpdatePassword from './components/profile/UpdatePassword.jsx';
import Cart from './components/cart/Cart.jsx';
import Shipping from './components/shipping/Shipping.jsx';
import ConfirmOrder from './components/shipping/ConfirmOrder.jsx';
import OrderSuccess from './components/shipping/OrderSuccess.jsx';
import OrderFailed from './components/shipping/OrderFailed.jsx';
import Orders from './components/order/Orders.jsx';
import OrderDetails from './components/order/OrderDetails.jsx';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './components/dashboard/Dashboard.jsx';
import AllProducts from './components/admin/allProducts/AllProducts.jsx';
import CreateProduct from './components/admin/allProducts/CreateProduct.jsx';

import UpdateProduct from './components/admin/allProducts/UpdateProduct.jsx';
import AdminOrders from './components/admin/order/AdminOrder.jsx';
import AdminOrderDetails from './components/admin/order/AdminOrderDetails.jsx';
import UserList from './components/admin/user/UserList.jsx';
import AboutUs from './components/about/AboutUs.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<AboutUs/>} />
        <Route path="products" element={<Products />} />
        <Route path="products/:keyword" element={<Products />} />
        <Route path="product/:productId" element={<ProductDetails />} />
        <Route path="search" element={<Search />} />
        <Route path="account" element={<Account />} />
        <Route path="me" element={<Profile />} />
        <Route path="me/update" element={<EditProfile />} />
        <Route path="password/update" element={<UpdatePassword />} />
        <Route path="cart" element={<Cart />} />
        <Route path="shipping" element={<Shipping />} />
        <Route path="confirm-order" element={<ConfirmOrder />} />
        <Route path="success" element={<OrderSuccess />} />
        <Route path="failuer" element={<OrderFailed />} />
        <Route path="orders/me" element={<Orders />} />
        <Route path="order/:orderId" element={<OrderDetails />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path='products/all' element={<AllProducts/>}/>
        <Route path='products/create' element={<CreateProduct/>}/>
        <Route path='product/:id' element={<UpdateProduct/>}/>
        <Route path='orders/all' element={<AdminOrders/>}/>
        <Route path='order/:orderId' element={<AdminOrderDetails/>}/>
        <Route path='users/all' element={<UserList/>}/>
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
