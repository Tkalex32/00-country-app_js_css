import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Context } from "../context/appContext";
import Card from "../components/card/Card";
import Search from "../components/search/Search";
import countriesApi from "../api/countriesApi";
import "./home.css";

const Home = () => {
  const { countries, filtered, dispatch } = useContext(Context);
  const [countriesLocal, setCountriesLocal] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [page, setPage] = useState(20);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getCountries = async () => {
      try {
        if (countries.length === 0 && Array.isArray(countries)) {
          const response = await countriesApi.getCountries();
          setCountriesLocal(response);
          fillContextCountries(response);
          setCountryList(response.slice(0, page));
          setIsLoading(false);
        } else if (filtered.length !== 0 && Array.isArray(filtered)) {
          await setCountriesLocal(filtered);
          setCountryList(filtered.slice(0, page));
          setIsLoading(false);
        } else {
          await setCountriesLocal(countries);
          setCountryList(countries.slice(0, page));
          setIsLoading(false);
        }
      } catch {
        console.log("error");
        setIsLoading(false);
        setIsError(true);
      }
    };
    getCountries();
  }, []);

  useEffect(() => {
    const changeToFiltered = () => {
      setCountriesLocal(filtered);
      setPage(20);
      setCountryList(filtered.slice(0, page));
    };
    changeToFiltered();
  }, [filtered]);

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
    const createNewList = () => {
      setCountryList(countriesLocal.slice(0, page));
    };
    createNewList();
  }, [page]);

  const fillContextCountries = (data) => {
    dispatch({
      type: "ADD_COUNTRIES",
      payload: data,
    });
    dispatch({
      type: "ADD_FILTERED",
      payload: data,
    });
  };

  return (
    <>
      <div className="search-container">
        <Search />
      </div>
      <div className="container">
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
    </>
  );
};

export default Home;
