import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import { fetchQuestsByLocation } from "../api/index";

function CityQuests() {
  const [cityQuests, setCityQuests] = useState([]);

  //access URL param
  const param = useParams();
  //   console.log(param.city);

  useEffect(() => {
    async function getCityQuests() {
      const data = await fetchQuestsByLocation(param.city.toLowerCase());
      console.log(data);
      setCityQuests(data);
    }
    getCityQuests();
  }, []);

  function mapCityQuests() {
    return cityQuests.map((quest, idx) => {
      return (
        <div key={idx}>
          <span>{quest.title}</span>
          <button>See Details</button>
          <span>REWARDS: </span>
          <img
            src={`/assets/badges/badge_${quest.badge_id}.png`}
            alt="badge image"
            width="50px"
          />
        </div>
      );
    });
  }

  return (
    <div>
      <h2>{param.city} Quests</h2>
      {cityQuests && <div>{mapCityQuests()}</div>}
    </div>
  );
}

export default CityQuests;
