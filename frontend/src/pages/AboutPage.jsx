import React from "react";
import AboutTop from "../components/about/AboutTop";
import AboutBottom from "../components/about/AboutBottom";
import FeaturedIn from "../components/utils/FeaturedIn";

const AboutPage = () => {
  return (
    <>
      <div className="about--layout">
        <AboutTop />
        <FeaturedIn />
        <AboutBottom />
      </div>
    </>
  );
};

export default AboutPage;
