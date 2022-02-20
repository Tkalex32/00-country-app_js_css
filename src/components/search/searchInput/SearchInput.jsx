import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../context/appContext";
import { MdSearch } from "react-icons/md";

const searchInput = () => {
  const { filtered, dispatch } = useContext(Context);
  const [localFiltered, setLocalFiltered] = useState([]);
  const [inputText, setInputText] = useState("");
  const [inputCountry, setInputCountry] = useState([]);

  useEffect(() => {
    const setLocal = () => {
      setLocalFiltered(filtered);
      setInputText("");
    };
    setLocal();
  }, [filtered]);

  useEffect(() => {
    const res = localFiltered.filter((c) =>
      c.name.common.toLowerCase().includes(inputText)
    );
    setInputCountry(res);
  }, [inputText]);

  useEffect(() => {
    dispatch({
      type: "ADD_SEARCHFILTERED",
      payload: inputCountry,
    });
  }, [inputCountry]);

  return (
    <div className="search">
      <MdSearch className="search-icon" />
      <input
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="search-input"
        type="search-text"
        placeholder="Search for a country..."
      />
    </div>
  );
};

export default searchInput;
