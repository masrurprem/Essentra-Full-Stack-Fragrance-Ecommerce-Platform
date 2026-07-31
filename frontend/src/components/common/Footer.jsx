import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import brandLogo from "../../assets/images/logo5.png";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer--up">
          <div className="footer--brand--section">
            <Link to="/">
              <img src={brandLogo} alt="brand logo" className="footer--image" />
            </Link>
            <p className="footer--text">
              Every fragrance tells a story—crafted with elegance, inspired by
              individuality, and designed to leave a lasting impression.
            </p>
          </div>
          <div className="footer--link--section">
            <div className="link--container">
              <h2>Useful Links</h2>
              <ul className="link--list">
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/blogs">Blogs</Link>
                </li>
                <li>
                  <Link to="/careers">Careers</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </div>
            {/* list-2 */}
            <div className="link--container">
              <h2>Quick Links</h2>
              <ul className="link--list">
                <li>
                  <Link to="/track-order">Track Order</Link>
                </li>
                <li>
                  <Link to="/return-refund">Return & Refund</Link>
                </li>
                <li>
                  <Link to="/privacy-policy">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/terms-and-conditions">Terms & Conditions</Link>
                </li>
              </ul>
            </div>
            {/* list-3 */}
            <div className="link--container">
              <h2>Customer Support</h2>
              <ul className="link--list">
                <li>
                  <Link to="/faq">FAQ</Link>
                </li>
                <li>
                  <Link to="/help-center">Help Center</Link>
                </li>
                <li>
                  <Link to="/complaint-box">Complaint Box</Link>
                </li>
                <li>
                  <Link to="/customize-package">Customize Package</Link>
                </li>
              </ul>
            </div>
            {/* list-4 */}
            <div className="link--container">
              <h2>Categories</h2>
              <ul className="link--list">
                <li>
                  <Link to="#">Premium</Link>
                </li>
                <li>
                  <Link to="#">Gift Box</Link>
                </li>
                <li>
                  <Link to="#">New Arrivals</Link>
                </li>
                <li>
                  <Link to="#">Most Popular</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer--down">
          <p className="copyright--text">&copy; 2026 All Rights Reserved...</p>
          <div className="social--container">
            <div className="social--container">
              <a href="#" aria-label="Facebook">
                <FaFacebookF />
              </a>

              <a href="#" aria-label="Twitter">
                <FaTwitter />
              </a>

              <a href="#" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>

              <a href="#" aria-label="Instagram">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
