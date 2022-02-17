import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/appContext";
import "./card.css";

const Card = ({ country }) => {
  const { dispatch } = useContext(Context);

  const saveCountry = () => {
    dispatch({
      type: "ADD_COUNTRY",
      payload: country,
    });
  };

  return (
    <Link
      style={{ textDecoration: "none" }}
      to={`/country/${country.cca3}`}
      onClick={() => saveCountry()}
      //state={{ from: country }}
    >
      <div className="card">
        <div className="card-header">
          <img src={country.flags.svg} alt="" />
        </div>
        <div className="card-info">
          <div className="country-name">{country.name.common}</div>
          <div className="country-text">
            Population: <span>{country.population.toLocaleString()}</span>
          </div>
          <div className="country-text">
            Region: <span>{country.region}</span>
          </div>
          <div className="country-text">
            Capital: <span>{country.capital}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
