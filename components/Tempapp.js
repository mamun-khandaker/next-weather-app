import React, { useEffect, useState } from "react";

const Tempapp = () => {
  const [search, setSearch] = useState("Dhaka");
  const [city, setCity] = useState(null);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      setError(false);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=a0dfce10c63107f25ccb7fe294dd50e5&units=metric`
      );

      const data = await response.json();
      setCity(data);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1 className="title-main">Weather app</h1>

      <div className="input-city">
        <input
          type="search"
          className="input-box"
          placeholder="Enter city name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {search.length < 1 ? (
          <button disabled className="button">
            Search
          </button>
        ) : (
          <button onClick={fetchData} className="button">
            Search
          </button>
        )}
      </div>

      {city?.cod === "404" || search === "" ? (
        <p>City not found</p>
      ) : (
        <>
          {/* <div className="city-name">
            {search} <span className="country">{city?.sys?.country}</span>
          </div> */}
          <div className="city-name">
            {city?.name} <span className="country">{city?.sys?.country}</span>
          </div>
          <div className="city-temp">{city?.main?.temp}&#xb0; Celsius</div>

          <div className="min-max-temp">
            <div>
              Humidity:{" "}
              <span className="city-temp">{city?.main?.humidity}%</span>
            </div>

            <div>
              Wind: <span className="city-temp">{city?.wind?.speed} km/h</span>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Tempapp;
