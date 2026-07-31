import React from "react";
import { Link, NavLink } from "react-router-dom";
import brandLogo from "../../assets/images/newLogo2.png";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import "./Navbar.css";

const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        {/* navbar links */}
        <div className="navbar--left">
          <ul className="nav--links">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/collection">Collection</NavLink>
            </li>
            <li>
              <NavLink to="/about-us">About us</NavLink>
            </li>
            <li>
              <NavLink to="/contact-us">Contact us</NavLink>
            </li>
          </ul>
        </div>
        {/* navbar logo */}
        <div className="navbar--center">
          <Link to="/">
            <img className="nav--logo" src={brandLogo} alt="navbar logo" />
          </Link>
        </div>
        {/* navbar cart and user section */}
        <div className="navbar--right">
          <div className="search--container">
            <FiSearch className="search--icon" />
            <input
              type="search"
              placeholder="Search Products..."
              className="searchBar"
            />
          </div>
          <Link to="/cart" className="cart--icon">
            <FaShoppingCart />
            <span className="cart--count">9</span>
          </Link>
          <Link to="/" className="user--icon">
            <FaUser />
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
