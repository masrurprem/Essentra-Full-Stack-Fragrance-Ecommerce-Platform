import React from "react";
import ProductContainer from "../components/product/ProductContainer";
import { getCategories, getProducts } from "../services/homeApi";
import { useLoaderData } from "react-router-dom";
import SortDropdown from "../components/common/sortDropdown";
import Filter from "../components/common/Filter";
import "./CollectionPage.css";

const CollectionPage = () => {
  const { allProducts, allCategories } = useLoaderData();
  return (
    <>
      <div className="container">
        <Filter categories={allCategories} />
        <ProductContainer
          headerString="Collection"
          products={allProducts}
          action={<SortDropdown />}
        />
      </div>
    </>
  );
};

export async function loader({ request }) {
  const url = new URL(request.url);
  const queryParamsObj = Object.fromEntries(url.searchParams);

  const [productRes, categoryRes] = await Promise.all([
    getProducts(queryParamsObj),
    getCategories(),
  ]);

  return { allProducts: productRes.data, allCategories: categoryRes.data };
}

export default CollectionPage;

//////////////////////////////////////////////////////////////////////////////////

// const CollectionPage = () => {
//   const { allProducts } = useLoaderData();
//   return (
//     <>
//       <div className="container">
//         <div className="collection-layout">
//           <Filter />

//           <ProductContainer
//             headerString="Collection"
//             products={allProducts}
//             action={<SortDropdown />}
//           />
//         </div>
//       </div>
//     </>
//   );
// };
