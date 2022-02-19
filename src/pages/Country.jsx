import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/appContext";
import countriesApi from "../api/countriesApi";
import { FiArrowLeft } from "react-icons/fi";
import "./country.css";

const Country = () => {
  const { country, dispatch } = useContext(Context);
  const [borders, setBorders] = useState([]);
  const [borderCountries, setBorderCountries] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const setBordersState = () => {
      setBorders(country.borders);
    };
    setBordersState();
  }, [country]);

  useEffect(() => {
    const getBorderCountries = async () => {
      if (borders && borders.length !== 0) {
        const response = await countriesApi.getBorders(borders);
        setBorderCountries(response);
      }
    };
    getBorderCountries();
  }, [borders]);

  const saveCountry = (data) => {
    dispatch({
      type: "ADD_COUNTRY",
      payload: data,
    });
  };

  return (
    <>
      <div className="back-container">
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <div className="back-button">
            <FiArrowLeft />
            <span>Back</span>
          </div>
        </Link>
      </div>
      <div className="country-container">
        <div className="flag">
          <img src={country.flags.svg} alt="" />
        </div>
        <div className="info">
          <div className="info-data">
            <div className="title">
              <p className="c-name">{country.name.common}</p>
            </div>
            <div className="center">
              <div className="left">
                <p className="country-text">
                  Native name:{" "}
                  <span>
                    {Object.values(country.name.nativeName)[0].common}
                  </span>
                </p>
                <p className="country-text">
                  Population: <span>{country.population.toLocaleString()}</span>
                </p>
                <p className="country-text">
                  Region: <span>{country.region}</span>
                </p>
                <p className="country-text">
                  Sub region: <span>{country.subregion}</span>
                </p>
                <p className="country-text">
                  Capital: <span>{country.capital?.[0]}</span>
                </p>
              </div>
              <div className="right">
                <p className="country-text">
                  Top Level Domain: <span>{country.tld?.[0]}</span>
                </p>
                <p className="country-text">
                  Currencies:{" "}
                  <span>
                    {Object.values(country.currencies)[0].name} -{" "}
                    {Object.values(country.currencies)[0].symbol}
                  </span>
                </p>
                <p className="country-text">
                  Languages:{" "}
                  <span>
                    {Object.keys(country.languages).map((lang, i) => (
                      <span key={i} className="lang-name">
                        {country.languages[lang]}
                      </span>
                    ))}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="bottom">
            <div className="country-text border">Border Countries: </div>
            <div className="borders">
              {country.borders &&
                borderCountries.map((c, i) => (
                  <Link
                    key={i}
                    style={{ textDecoration: "none" }}
                    to={`/country/${c.cca3}`}
                    onClick={() => saveCountry(c)}
                  >
                    <span className="border-button">{c.name.common}</span>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Country;
