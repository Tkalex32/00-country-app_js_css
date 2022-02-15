import React from "react";
import { MdSearch } from "react-icons/md";

const searchInput = () => {
  return (
    <div className="search">
      <MdSearch className="search-icon" />
      <input
        className="search-input"
        type="search-text"
        placeholder="Search for a country"
      />
    </div>
  );
};

export default searchInput;
