import React from "react";
import "./SortDropdown.css";
import { useSearchParams } from "react-router-dom";

const SortDropdown = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // selection event handler function
  const selectHandler = function (param) {
    setSearchParams((searchParams) => {
      searchParams.set("sortBy", param);
      return searchParams;
    });
  };
  return (
    <>
      <div className="dropdown">
        <label htmlFor="sort">Sort by </label>
        <select
          value={searchParams.get("sortBy") || "latest"}
          onChange={(e) => selectHandler(e.target.value)}
        >
          <option value="latest">latest</option>
          <option value="price-desc">price: high to low</option>
          <option value="price-asc">price: low to high</option>
        </select>
      </div>
    </>
  );
};

export default SortDropdown;
