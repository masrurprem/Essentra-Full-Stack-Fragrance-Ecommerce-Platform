import React, { useState, useEffect } from "react";
import "./HomePage.css";
import HeroSection from "../components/home/HeroSection";
import FeaturedIn from "../components/utils/FeaturedIn";
import Epilogue from "../components/utils/Epilogue";
import ProductContainer from "../components/product/ProductContainer";
import { getProducts, getCategories } from "../services/homeApi";
import { useLoaderData } from "react-router-dom";
import ExploreButton from "../components/common/ExploreButton";

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
          action={<ExploreButton />}
        />
        <ProductContainer
          headerString="New Arrivals"
          products={products}
          action={<ExploreButton />}
        />
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
