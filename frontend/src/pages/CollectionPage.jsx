import React from "react";
import ProductContainer from "../components/product/ProductContainer";
import { getProducts } from "../services/homeApi";
import { useLoaderData } from "react-router-dom";
import SortDropdown from "../components/common/sortDropdown";

const CollectionPage = () => {
  const { allProducts } = useLoaderData();
  return (
    <div className="container">
      <ProductContainer
        headerString="Collection"
        products={allProducts}
        action={<SortDropdown />}
      />
    </div>
  );
};

export async function loader({ request }) {
  const url = new URL(request.url);
  const queryParamsObj = Object.fromEntries(url.searchParams);
  const productRes = await getProducts(queryParamsObj);
  return { allProducts: productRes.data };
}

export default CollectionPage;
