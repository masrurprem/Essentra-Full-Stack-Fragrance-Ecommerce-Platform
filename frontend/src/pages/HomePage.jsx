import React, { useState, useEffect } from "react";
import "./HomePage.css";
import HeroSection from "../components/home/HeroSection";
import FeaturedIn from "../components/utils/FeaturedIn";
import Epilogue from "../components/utils/Epilogue";
import ProductContainer from "../components/product/ProductContainer";
import { getProducts } from "../services/homeApi";
import { useLoaderData } from "react-router-dom";

const HomePage = () => {
  const products = useLoaderData();

  return (
    <>
      <div className="homepage--layout">
        <HeroSection />
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
  const products = await getProducts();
  return products.data;
}

export default HomePage;
