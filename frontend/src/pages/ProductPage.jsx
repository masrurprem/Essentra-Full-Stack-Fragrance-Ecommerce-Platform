import React from "react";
import ProductContainer from "../components/product/ProductContainer";
import { getProducts } from "../services/homeApi";
import { useLoaderData } from "react-router-dom";
import ExploreButton from "../components/common/ExploreButton";

const ProductPage = () => {
  const { products, category } = useLoaderData();

  return (
    <div className="container">
      <ProductContainer
        headerString={category}
        products={products}
        action={<ExploreButton />}
      />
    </div>
  );
};

// product loader by selected category
export async function loader({ params }) {
  const { slug } = params;
  const productsByCategory = await getProducts({ category: slug });
  //console.log(productsByCategory.data[0]);
  //get category name

  const currentCat = productsByCategory.data[0].categories.find(
    (cat) => cat.slug === slug,
  );
  return { products: productsByCategory.data, category: currentCat.name };
}

export default ProductPage;
