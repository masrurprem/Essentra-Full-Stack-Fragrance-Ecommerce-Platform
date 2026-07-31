import React from "react";
import "./FeaturedIn.css";
import alHaramain from "../../assets/images/al-haramain.png";
import dior from "../../assets/images/dior.png";
import versace from "../../assets/images/versace.png";
import hugo from "../../assets/images/hugo.png";
import rasasi from "../../assets/images/rasasi.png";

const FeaturedIn = () => {
  return (
    <>
      <section className="section--featured">
        <div className="container">
          <h2 className="featured--heading">Featured Brands</h2>
          <div className="featured--logos">
            <img src={alHaramain} alt="al haramain" />
            <img src={dior} alt="dior" />
            <img src={hugo} alt="hugo" />
            <img src={rasasi} alt="rasasi" />
            <img src={versace} alt="versace" />
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturedIn;
