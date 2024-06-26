import { Outlet } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import {useDispatch, useSelector} from 'react-redux';
import { useEffect, useState } from 'react';
import Loader from './components/loader/Loader';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { login } from './reducers/userSlice';
import { loadCart } from './action/action';

const Layout = () => {
  const [loading,setLoading] = useState(true);
  const dispatch = useDispatch();
  const {user} = useSelector((state)=> state.user);

  useEffect(()=>{
    const fetchData = async()=>{
      try {
        const {data} = await axios.get(`/api/v1/me`);
        console.log(data);
        if(data.success ===true){
          const loggedInUser = data.user;
          dispatch(login(loggedInUser));
          await loadCart(dispatch);
          setLoading(false);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    fetchData();
  },[Navigate])

  if(loading){
    return(<> 
      <Loader/>
    </>)
  }

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
