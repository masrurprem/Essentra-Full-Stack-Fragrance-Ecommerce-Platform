import React from "react";
import { Link } from "react-router-dom";
import { MdAddShoppingCart } from "react-icons/md";
import "./ProductCard.css";
import productImage from "../../assets/images/product1.png";

const ProductCard = () => {
  return (
    <>
      <Link to="#" className="product--card">
        <div className="product--image">
          <img src={productImage} alt="product image" />
        </div>
        <div className="product--info">
          <p className="product--name">Product Name</p>
          <p className="product--bio">
            A sandal wood long-lasting men's perfume
          </p>
        </div>
        <div className="product--pricing">
          <p className="price">৳550</p>
          <button className="cart--button">
            <MdAddShoppingCart size={24} />
          </button>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;
