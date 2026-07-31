import React from "react";
import "./CategoryBar.css";

const CategoryBar = () => {
  return (
    <>
      <div className="category--sidebar">
        <p className="category--text">Explore</p>

        <ul className="category--list">
          <li className="category--item">
            <a href="">Atomizer</a>
          </li>
          <li className="category--item">
            <a href="">For Him</a>
          </li>
          <li className="category--item">
            <a href="">For Her</a>
          </li>
          <li className="category--item">
            <a href="">Attar</a>
          </li>
          <li className="category--item">
            <a href="">Cool Water</a>
          </li>
          <li className="category--item">
            <a href="">Summer</a>
          </li>
        </ul>
      </div>
      ;
    </>
  );
};

export default CategoryBar;
