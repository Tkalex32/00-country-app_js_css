import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Context } from "../context/appContext";
import Card from "../components/card/Card";
import Search from "../components/search/Search";
import countriesApi from "../api/countriesApi";
import "./home.css";

const Home = () => {
  const { countries, dispatch } = useContext(Context);
  const [countriesLocal, setCountriesLocal] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [page, setPage] = useState(20);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getCountries = async () => {
      try {
        if (countries.length === 0) {
          const response = await countriesApi.getCountries();
          setCountriesLocal(response);
          fillContextCountries(response);
          setCountryList(response.slice(0, page));
          setIsLoading(false);
        } else {
          await setCountriesLocal(countries[0]);
          await setCountryList(countries[0].slice(0, page));
          setIsLoading(false);
        }
      } catch {
        console.log("error");
        setIsError(true);
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
    const newList = countriesLocal.slice(page - 20, page);
    setCountryList([...countryList, ...newList]);
  }, [page]);

  const fillContextCountries = (data) => {
    if ((Array.isArray(countries) && countries.length) === 0) {
      dispatch({
        type: "ADD_COUNTRIES",
        payload: data,
      });
    }
  };

  return (
    <div className="container">
      <Search />
      {isLoading ? (
        <div className="loading-wrapper">
          <div className="loading-inner"></div>
          <div className="loading-text pulsate">LOADING...</div>
        </div>
      ) : isError ? (
        <div className="error">Something went wrong!</div>
      ) : (
        <div className="cards">
          {countryList.map((country, i) => (
            <Card key={i} country={country} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
