import React from "react";
import { FaMinus, FaPlus, FaCheck } from "react-icons/fa";
import "./ProductDetails.css";
import productImage from "../../assets/images/prod2.png";
import ProductContainer from "./ProductContainer";

const ProductDetails = () => {
  return (
    <>
      <div className="container">
        <div className="product--details--top">
          <div className="product--details--image">
            <img src={productImage} alt="product image" />
          </div>
          <div className="product--description">
            <div className="product--shorts">
              <p>The Premium Oud Sultan</p>
              <p>Attar, Men's</p>
              <p className="price--product">৳550</p>
            </div>
            {/* cart */}
            <div className="product--cart">
              <div className="button--quantity">
                <button>
                  <FaMinus />
                </button>
                <span>10</span>

                <button>
                  <FaPlus />
                </button>
              </div>
              <div className="button--quantity button--add--to--cart">
                <button>
                  <FaPlus />
                  Add to Cart
                </button>
              </div>
            </div>
            <hr />
            <div className="exchange--policy">
              <h3>Easy Returns & Exchange</h3>
              <ul className="exchange--policy--list">
                <li>
                  <FaCheck /> <span>Tell us within 5 days</span>
                </li>
                <li>
                  <FaCheck /> <span>Free return shipping</span>
                </li>
                <li>
                  <FaCheck /> <span>Instant refund on receipt</span>
                </li>
              </ul>
            </div>
            <hr />
            <div className="product--note">
              <p className="product--note--para">
                Sultan Oud Premium Perfume for Men delivers a rich and
                sophisticated fragrance crafted with premium oud notes. Designed
                for the modern gentleman, it offers a long-lasting scent that
                leaves a bold and memorable impression for every occasion.
              </p>
              <div className="note--bottom">
                <p>Detailed Specification:</p>
                <ul className="product--note--list">
                  <li>Wearable Seasons: Spring, Summer</li>
                  <li>
                    Suitable Occasions: Casual outings, Formal events,
                    Professional settings
                  </li>
                  <li>Fragrance Family: Woody, Oriental, Oud </li>
                  <li>Longevity: Long-lasting fragrance (8–12 hours*)</li>
                  <li>
                    Ideal For: Daily wear, Evening events, Special occasions
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="product--details--bottom">
          <div className=" container review--container">
            No Product Reviews Yet!
          </div>
          <ProductContainer headerString="You May Also Like" />
          <ProductContainer headerString="People Also Bought" />
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
