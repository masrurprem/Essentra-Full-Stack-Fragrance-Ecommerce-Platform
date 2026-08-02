import React, { useState, useEffect } from "react";
import "./HomePage.css";
import HeroSection from "../components/home/HeroSection";
import FeaturedIn from "../components/utils/FeaturedIn";
import Epilogue from "../components/utils/Epilogue";
import ProductContainer from "../components/product/ProductContainer";
import { getProducts, getCategories } from "../services/homeApi";
import { useLoaderData } from "react-router-dom";

const HomePage = () => {
  const { products, categories } = useLoaderData();

  return (
    <>
      <div className="homepage--layout">
        <HeroSection categories={categories} />
        <FeaturedIn />
        <ProductContainer
          headerString="Featured Products"
          products={products}
        />
        <ProductContainer headerString="New Arrivals" products={products} />
        <Epilogue />
      </div>
    </>
  );
};
// product loader
export async function loader() {
  const [productRes, categoryRes] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return { products: productRes.data, categories: categoryRes.data };
}

export default HomePage;
