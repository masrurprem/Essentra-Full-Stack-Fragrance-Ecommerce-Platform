import React from "react";
import { useState } from "react";
import "./Filter.css";
import { useSearchParams } from "react-router-dom";

const Filter = ({ categories }) => {
  const minValue = 0;
  const maxValue = 5000;
  const [price, setPrice] = useState(maxValue);
  const [category, setCategory] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  // Apply Filter Handler
  const filterHandler = () => {
    setSearchParams((params) => {
      if (category) {
        params.set("category", category);
      } else {
        params.delete("category");
      }
      if (price < maxValue) {
        params.set("max-price", price);
      } else {
        params.delete("max-price");
      }
      return params;
    });
  };
  return (
    <div className="filter--container">
      <div className="category--filter">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All categories</option>
          {categories.map((category) => {
            return (
              <option key={category.id} value={category.slug}>
                {category.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="price--filter">
        <h3>Price</h3>
        <input
          type="range"
          min={minValue}
          max={maxValue}
          step={100}
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="price--slider"
        />
        <div className="price--labels">
          <span>৳{minValue}</span>
          <span>৳{price}</span>
        </div>
        <button className="price--filter--button" onClick={filterHandler}>
          Apply Filter
        </button>
      </div>
    </div>
  );
};

export default Filter;
