import React from "react";
import { FaMinus, FaPlus, FaCheck } from "react-icons/fa";
import "./ProductDetails.css";
import ProductContainer from "./ProductContainer";
import { useLoaderData } from "react-router-dom";
import { getProductBySlug } from "../../services/homeApi";

const ProductDetails = () => {
  const product = useLoaderData();
  console.log(product);
  return (
    <>
      <div className="container">
        <div className="product--details--top">
          <div className="product--details--image">
            <img
              src={`http://localhost:4000/uploads/img/products/${product.imageUrl}`}
              alt={product.name}
            />
          </div>
          <div className="product--description">
            <div className="product--shorts">
              <p>{product.name}</p>
              <p className="text-[25px]">
                {product.categories.map((cat) => cat.name).join(", ")}
              </p>
              <p className="price--product">৳{product.price}</p>
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
              <p className="product--note--para">{product.description}</p>
              <div className="note--bottom">
                <p className="text-gray-600">Detailed Specification:</p>
                <ul className="product--note--list">
                  <li className="font-semibold text-red-500">
                    {" "}
                    To be Updated Very Soon.....
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

// product data(details) loader
export async function loader({ params }) {
  const productDetails = await getProductBySlug(params.slug);
  return productDetails.data;
}

export default ProductDetails;
