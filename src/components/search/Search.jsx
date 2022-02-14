import React from "react";
import SearchFilter from "./searchFilter/SearchFilter";
import SearchInput from "./searchInput/SearchInput";
import "./search.css";

const Search = () => {
  return (
    <div className="search-bar">
      <SearchInput />
      <SearchFilter />
    </div>
  );
};

export default Search;
