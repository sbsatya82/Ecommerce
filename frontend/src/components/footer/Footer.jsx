import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation in React Router

const Footer = () => {
  return (
    <footer className='footer'>
    <div className="row">
      {/* Information Column */}
      <div className="col d-flex">
        <div className='inner-box'>
          <h4>INFORMATION</h4>
          <Link to="/about">About us</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/terms">Term & Conditions</Link>
          <Link to="/shipping">Shipping Guide</Link>
        </div>
      </div>

      {/* Useful Links Column */}
      <div className="col d-flex">
        <div className='inner-box'>
          <h4>USEFUL LINK</h4>
          <Link to="/store">Online Store</Link>
          <Link to="/services">Customer Services</Link>
          <Link to="/promotions">Promotion</Link>
          <Link to="/brands">Top Brands</Link>
        </div>
      </div>

      {/* Social Media Icons Column */}
      <div className="col d-flex">
        <div className=''>
          <span><i className="bx bxl-facebook-square"></i></span>
          <span><i className="bx bxl-instagram-alt"></i></span>
          <span><i className="bx bxl-github"></i></span>
          <span><i className="bx bxl-twitter"></i></span>
          <span><i className="bx bxl-pinterest"></i></span>
        </div>
      </div>
    </div>
    </footer>
  );
};

export default Footer;
