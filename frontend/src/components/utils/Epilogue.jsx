import React from "react";
import "./Epilogue.css";
import perfume3 from "../../assets/images/perfume3.png";
import perfume4 from "../../assets/images/perfume4.png";

const Epilogue = () => {
  return (
    <>
      <section className="section--epilogue" id="epilogue">
        <div className="container grid grid--2--cols grid--align--v">
          {/* Number-1 */}
          {/* container for texts */}
          <div className="step--text">
            <h3 className="heading--tertiary">
              Discover Fragrances That Define You
            </h3>
            <p className="step--description">
              Every fragrance tells a story, and every story begins with a
              memorable scent. Whether you're preparing for a special
              celebration, heading to an important meeting, or enjoying a casual
              evening with friends, the right perfume becomes a part of your
              identity. A carefully selected fragrance not only enhances your
              presence but also leaves a lasting impression wherever you go.
            </p>
          </div>
          {/* container for step image */}
          <div className="step--image--box">
            <img
              src={perfume3}
              alt="perfume-image"
              className="step--image--1"
            />
          </div>

          {/* number-2 */}

          {/* container for step image */}
          <div className="step--image--box">
            <img
              src={perfume4}
              alt="perfume-image"
              className="step--image--2"
            />
          </div>
          {/* container for texts */}
          <div className="step--text">
            <h3 className="heading--tertiary">
              Experience the Art of Fragrance
            </h3>
            <p className="step--description">
              From luxurious oud and rich amber to fresh citrus, delicate
              florals, warm vanilla, and timeless musk, our collection is
              designed to suit every personality and occasion helping you
              express confidence, style, and individuality.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Epilogue;
