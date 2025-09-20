import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Map.css";
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
          <span className="city-name">{city.location}</span>
          <Link to={`/location/${city.location}/quests`}>
            <img
              src={`/assets/maps/${city.location}_map.png`}
              alt={city.location}
            />
          </Link>
        </div>
      );
    });
  }

  return (
    <>
      <div className="map-gradient"></div>
      <div>
          <h2 className="map-header">Venture Forth</h2>
          <div className="map-separator" />
        {locations && <div className="flex-container">{mapLocations()}</div>}
      </div>
    </>
  );
}

export default Map;
