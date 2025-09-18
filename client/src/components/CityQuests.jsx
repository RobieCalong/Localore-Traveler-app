import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { fetchQuestsByLocation } from "../api/index";
import QuestContext from "./QuestContext";

import "../styles/CityQuests.css";

function CityQuests() {
  const [cityQuests, setCityQuests] = useState([]);

  const { setQuest } = useContext(QuestContext);
  let navigateUrl = useNavigate();

  const param = useParams();
  // console.log(param.city); //access URL param

  useEffect(() => {
    async function getCityQuests() {
      const data = await fetchQuestsByLocation(param.city.toLowerCase());
      // console.log(data);    //data = all quests from city
      setCityQuests(data);
    }
    getCityQuests();
  }, []);

  // when user clicks 'See Details', quest goes in QuestContext by way of localStorage
  function onClickSetQuest(quest) {
    localStorage.setItem("currentQuest", JSON.stringify(quest, null, 2));
    // react route to <SingleQuest />
    navigateUrl(`/quests/${quest.id}`);
    setQuest(quest);
  }

  function mapCityQuests() {
    return cityQuests.map((quest, idx) => {
      return (
        <div key={idx} className="quest-card">
          <p className="component-text quest-title">{quest.title}</p>
          <div>
            <button
              onClick={() => onClickSetQuest(quest)}
              className="see-details-btn"
            >
              See Details
            </button>
          </div>
          <p className="component-text">REWARD:</p>
          <div>
            <img
              src={`/assets/badges/badge_${quest.badge_id}.png`}
              alt="badge image"
              width="50px"
            />
          </div>
        </div>
      );
    });
  }

  return (
    <div>
      <h2 className="component-title">{param.city} Quests</h2>
      {cityQuests && (
        <div className="city-quests-container">{mapCityQuests()}</div>
      )}
    </div>
  );
}

export default CityQuests;
