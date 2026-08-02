import React from "react";
import { Link } from "react-router-dom";
import "./CategoryBar.css";

const CategoryBar = ({ categories }) => {
  //console.log(categories);
  return (
    <>
      <div className="category--sidebar">
        <p className="category--text">Explore</p>

        <ul className="category--list">
          {categories.map((category) => (
            <li key={category.id} className="category--item">
              <Link to={`/product-category/${category.slug}`}>
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CategoryBar;
