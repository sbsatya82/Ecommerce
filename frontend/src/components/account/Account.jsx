import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {logout} from '../../reducers/userSlice'
import '../account/Account.css';
import axios from 'axios';

function Account() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const history = useNavigate();

  useEffect(() => {
    if(!user){
      history('/login');
    }
  }, [user, history]);

  const handleLogout = async() => {
    dispatch(logout());
    try {
      const {data} = await axios.get('/api/v1/logout');
      console.log(data.message);
    } catch (error) {
      console.log(error);
    }
    history('/');
  };

  return (
    <div className='account-conteiner'>
      {(
        <h3>Welcome, {user.name && user.name.toUpperCase()}</h3>
      )}
      {user && user.role==='admin' && <Link to='/admin/dashboard' target="_blank">Dashboard</Link>}
      <Link to='/orders/me'>Orders</Link>
      
      <Link to='/wishlist'>Wishlist</Link>

      <Link to='/me'>Profile</Link>

      <Link to='/password/new'>Change Password</Link>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Account;