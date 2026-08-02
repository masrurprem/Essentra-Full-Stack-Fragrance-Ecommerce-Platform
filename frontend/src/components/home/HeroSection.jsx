import React from "react";
import HeroCarousel from "./HeroCarousel";
import CategoryBar from "./CategoryBar";
import "./HeroSection.css";

const HeroSection = ({ categories }) => {
  return (
    <>
      <section className="hero--section">
        <div className="container hero--layout">
          <CategoryBar categories={categories} />
          <HeroCarousel />
        </div>
      </section>
    </>
  );
};

export default HeroSection;
