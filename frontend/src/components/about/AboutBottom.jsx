import React from "react";
import "./AboutBottom.css";
import { FaCheck } from "react-icons/fa";

const AboutBottom = () => {
  return (
    <>
      <div className="about--bottom--container">
        <div className="about--bottom">
          <h2>Why Choose Essentra?</h2>
          <div className="about--bottom--text">
            <p>
              At Essentra, we are committed to delivering an exceptional
              fragrance experience. Every perfume in our collection is selected
              with care to ensure quality, authenticity, and customer
              satisfaction.
            </p>
            <ul>
              <li>
                <span>
                  <FaCheck />
                </span>
                100% genuine and authentic fragrances
              </li>
              <li>
                <span>
                  <FaCheck />
                </span>
                Long-lasting scents with excellent performance
              </li>
              <li>
                <span>
                  <FaCheck />
                </span>
                Carefully curated collections for every occasion
              </li>
              <li>
                <span>
                  <FaCheck />
                </span>
                Affordable luxury without compromising quality
              </li>
            </ul>
            <p>
              Our goal is simple—to help you discover fragrances that reflect
              your personality and leave a lasting impression.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutBottom;
