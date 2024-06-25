import React from 'react';


const PromoBanner = () => {
  const currentYear = new Date().getFullYear(); // Get the current year

  return (
    <section className="section banner">
      <div className="left">
        <span className="trend">Trend Design</span>
        <h1>New Collection {currentYear}</h1>
        <p>New Arrival <span className="color">Sale 50% OFF</span> Limited Time Offer</p>
        <a href="#" className="btn btn-1">Discover Now</a>
      </div>
      <div className="right">
        <img src="./images/banner.png" alt="New Collection" />
      </div>
    </section>
  );
};

export default PromoBanner;
