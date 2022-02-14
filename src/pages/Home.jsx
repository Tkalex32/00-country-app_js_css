import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../components/card/Card";
import Search from "../components/search/Search";
import "./home.css";

const Home = () => {
  const [countries, setCountries] = useState([]);

  useEffect(async () => {
    const response = await axios.get("https://restcountries.com/v2/all");
    setCountries(response.data.slice(0, 20));
  }, []);

  return (
    <div className="container">
      <Search />
      <div className="cards">
        {countries.map((country, i) => (
          <Card key={i} country={country} />
        ))}
      </div>
    </div>
  );
};

export default Home;
