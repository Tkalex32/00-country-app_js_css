import React, { useContext } from "react";
import { Context } from "../../../context/appContext";

const SearchFilter = () => {
  const { countries, region, dispatch } = useContext(Context);

  const saveFiltered = (e) => {
    let filtered = [];
    if (e.target.value !== "all") {
      filtered = countries.filter((c) => c.region === e.target.value);
    } else {
      filtered = countries;
    }
    dispatch({
      type: "ADD_FILTERED",
      payload: filtered,
    });
    dispatch({
      type: "CHANGE_REGION",
      payload: e.target.value,
    });
  };

  return (
    <div className="filter">
      <select
        className="filter-select"
        name="region-select"
        onChange={saveFiltered}
        value={region}
      >
        <option value="init" hidden>
          Filter by Region
        </option>
        <option value="all">All</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </div>
  );
};

export default SearchFilter;
