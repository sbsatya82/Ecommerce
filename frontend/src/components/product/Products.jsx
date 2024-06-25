import React from 'react'

import ProductList from './ProductList';



function Products() {

  return (
    
      <section className="section all-products" id="products">
        <div className="top container">
          <h1>All Products</h1>
          <form>
            <select>
              <option value="1">Defualt Sorting</option>
              <option value="2">Sort By Price</option>
              <option value="3">Sort By Popularity</option>
              <option value="4">Sort By Sale</option>
              <option value="5">Sort By Rating</option>
            </select>
            <span><i className="bx bx-chevron-down"></i></span>
          </form>
        </div>
        <ProductList />
        
    </section>
  )
}

export default Products
