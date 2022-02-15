import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../components/card/Card";
import Search from "../components/search/Search";
import countriesApi from "../api/countriesApi";
import "./home.css";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [page, setPage] = useState(20);

  useEffect(() => {
    const getCountries = async () => {
      try {
        const response = await countriesApi.getCountries();
        setCountries(response);
        setCountryList(response.slice(0, page));
      } catch {
        console.log("error");
      }
    };
    getCountries();
  }, []);

  useEffect(() => {
    const handleScrollEvent = async () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setPage((page) => page + 20);
      }
    };

    window.addEventListener("scroll", handleScrollEvent);

    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, []);

  useEffect(() => {
    const newList = countries.slice(page - 20, page);
    setCountryList([...countryList, ...newList]);
  }, [page]);

  return (
    <div className="container">
      <Search />
      <div className="cards">
        {countryList.map((country, i) => (
          <Card key={i} country={country} />
        ))}
      </div>
    </div>
  );
};

export default Home;
