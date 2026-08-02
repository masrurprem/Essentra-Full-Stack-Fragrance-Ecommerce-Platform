import React from "react";
import { Link } from "react-router-dom";
import { MdAddShoppingCart } from "react-icons/md";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  return (
    <>
      <Link to={`/product/${product.slug}`} className="product--card">
        <div className="product--image">
          <img
            src={`http://localhost:4000/uploads/img/products/${product.imageUrl}`}
            alt={product.name}
          />
        </div>
        <div className="product--info">
          <p className="product--name">{product.name}</p>
          <p className="product--bio">{product.shortDescription}</p>
        </div>
        <div className="product--pricing">
          <p className="price">৳{Number(product.price).toFixed(2)}</p>
          <button className="cart--button">
            <MdAddShoppingCart size={24} />
          </button>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;
