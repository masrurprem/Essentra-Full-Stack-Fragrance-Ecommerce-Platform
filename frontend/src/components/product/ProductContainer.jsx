import React from "react";
import ProductCard from "./productCard";
import "./ProductContainer.css";

const ProductContainer = ({ headerString, products = [], action }) => {
  return (
    <>
      <div className="container">
        <div className="product--container--title">
          <h1>{headerString}</h1>
          {action}
        </div>
        <div className="products--container">
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
