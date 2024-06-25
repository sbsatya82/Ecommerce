import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import  { loadCart } from "../../action/action";
import { useDispatch, useSelector } from "react-redux";


const Header = () => {

  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const {cartItems} = useSelector(state => state.cart);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  loadCart();

  return (
    <header>
      {/* Top Navigation */}
      <div className="top-nav">
        <div className="container d-flex">
          <p>Order Online Or Call Us: (001) 2222-55555</p>
          <ul className="d-flex">
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/faq">FAQ</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="navigation">
        <div className="nav-center container d-flex">
          <div>
            <Link to="/" className="logo d-flex">
              <img
                src="/images/NSLogo.png"
                height="63px"
                alt="NathAndSonsLogo"
              />
              <h1 id="logoText">Nath&Sons</h1>
              <img src="/images/BagImg.png" height="63px" alt="" id="bagImg" />
            </Link>
          </div>
          <ul
            className={`navigation ${
              isOpen ? "nav-list d-flex open" : "nav-list d-flex"
            }`}
          >
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "text-primary-color" : ""}`
                }
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/Products"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "text-primary-color" : ""}`
                }
              >
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/terms"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "text-primary-color" : ""}`
                }
              >
                Terms
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "text-primary-color" : ""}`
                }
              >
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "text-primary-color" : ""}`
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>

          <div className="icons d-flex">
              <Link to= "/login" className="icon">
                <i className="bx bx-user"></i>
              </Link>

            <Link to="/search" className="icon">
              <i className="bx bx-search"></i>
            </Link>
            <div className="icon">
              <i className="bx bx-heart"></i>
              <span className="d-flex">0</span>
            </div>
            <Link to="/cart" className="icon">
              <i className="bx bx-cart"></i>
              <span className="d-flex">{cartItems.length}</span>
            </Link>
          </div>

          <div className="hamburger" onClick={toggleMenu}>
            <i className="bx bx-menu-alt-left"></i>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
