import React from "react";
import "./HomePage.css";
import HeroSection from "../components/home/HeroSection";
import FeaturedIn from "../components/utils/FeaturedIn";
import Epilogue from "../components/utils/Epilogue";
import ProductContainer from "../components/product/ProductContainer";

const HomePage = () => {
  return (
    <>
      <div className="homepage--layout">
        <HeroSection />
        <FeaturedIn />
        <ProductContainer headerString="New Arrivals" />
        <Epilogue />
      </div>
    </>
  );
};

export default HomePage;
