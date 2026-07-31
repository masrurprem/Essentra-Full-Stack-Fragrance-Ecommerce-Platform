import React from "react";
import { FaArrowRight } from "react-icons/fa";
import ProductCard from "./productCard";
import "./ProductContainer.css";

const ProductContainer = (props) => {
  return (
    <>
      <div className="container">
        <div className="product--container--title">
          <h1>{props.headerString}</h1>
          <button>
            Browse More Collection <FaArrowRight />
          </button>
        </div>
        <div className="products--container">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          {/* second row
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard /> */}
        </div>
      </div>
    </>
  );
};

export default ProductContainer;
