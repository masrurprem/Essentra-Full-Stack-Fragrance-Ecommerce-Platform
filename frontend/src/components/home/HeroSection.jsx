import React from "react";
import HeroCarousel from "./HeroCarousel";
import CategoryBar from "./CategoryBar";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <>
      <section className="hero--section">
        <div className="container hero--layout">
          <CategoryBar />
          <HeroCarousel />
        </div>
      </section>
    </>
  );
};

export default HeroSection;
