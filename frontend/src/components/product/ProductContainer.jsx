import React from "react";
import { FaArrowRight } from "react-icons/fa";
import ProductCard from "./productCard";
import "./ProductContainer.css";

const ProductContainer = ({ headerString, products = [] }) => {
  return (
    <>
      <div className="container">
        <div className="product--container--title">
          <h1>{headerString}</h1>
          <button>
            Browse More Collection <FaArrowRight />
          </button>
        </div>
        <div className="products--container">
          {/* <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard /> */}
          {/* map products and show as cards */}
          {products.slice(0, 12).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductContainer;
