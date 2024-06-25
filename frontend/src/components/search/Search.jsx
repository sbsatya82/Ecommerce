import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Search.css'

const Search = () => {
  const history = useNavigate();
  const [keyword, setKeyword] = useState('');
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    console.log(keyword);
    if (keyword.trim()) {
      history(`/products/${keyword}`);
      window.location.href=``;
    }else {
      history(`/products`);
    }
  }

  return (
    <>
      <form className='searchBox' onSubmit={searchSubmitHandler}>
        <input 
          type='text'
          placeholder='@Search'
          onChange={(e) => setKeyword(e.target.value)} />
        <input type='submit' value='Search'/>
      </form>
    </>
  )
}

export default Search
