import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { fetchAllLocations } from "../api/index";

function Map() {
  const [locations, setLocations] = useState();

  // fetch map from database
  useEffect(() => {
    async function getMap() {
      const data = await fetchAllLocations();
      setLocations(data);
    }
    getMap();
  }, []);

  // map the array of locations
  function mapLocations() {
    return locations.map((city, idx) => {
      return (
        <div key={idx} className="flex-item">
          <Link to={`/location/${city.location}/quests`}>
            <img
              src={`/assets/maps/${city.location}_map.png`}
              alt={`city name is ${city.location}`}
              width="200px"
              className="box-model"
            />
          </Link>
          <p>City: {city.location}</p>
        </div>
      );
    });
  }

  return (
    <div>
      <h2>Venture Forth</h2>
      {locations && <div className="flex-container">{mapLocations()}</div>}
    </div>
  );
}

export default Map;
