import React, { useEffect } from 'react'
import MetaData from './MetaData'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../../reducers/userSlice';
import Hero from './Hero';
import CategorySection from './CategorySection';
import NewArrivals from './NewArrivals';
import PromoBanner from './PromoBanner';
import Featured from './Featured';

const Home = ()=> {
  const dispatch = useDispatch();
  useEffect(()=>{
    const fetchData = async()=>{
      try {
        const {data} = await axios.get('/api/v1/me');
        console.log(data);
        if(data.success ===true){
          const loggedInUser = data.user;
          dispatch(login(loggedInUser));
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  },[])
  return (
    <>
      <Hero/>
      <CategorySection/>
      <NewArrivals/>
      <PromoBanner/>
      <Featured/>
    </>
  )
}

export default Home
