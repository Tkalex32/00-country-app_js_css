import React from "react";
import { Link } from "react-router-dom";
import "./card.css";

const Card = ({ country }) => {
  return (
    <Link
      style={{ textDecoration: "none" }}
      to={`/country/${country.name.common}`}
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
