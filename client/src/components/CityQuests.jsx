import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { fetchCompletedQuests, fetchQuestsByLocation } from "../api/index";
import QuestContext from "./QuestContext";

import "../styles/CityQuests.css";

function CityQuests() {
  const [cityQuests, setCityQuests] = useState([]);
  const [completedQuests, setCompletedQuests] = useState([]);

  const { setQuest } = useContext(QuestContext);
  const navigateUrl = useNavigate();

  const param = useParams();

  const BASE_URL = `https://localore-traveler-app-4rn3.onrender.com` || `http://localhost:3000`;

  // Redirect to login if not authenticated or token is invalid
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    async function checkAuth() {
      if (!token || !userId) {
        navigateUrl("/login");
        return;
      }
      // Try to fetch user info to validate token
      try {
        const res = await fetch(`${BASE_URL}/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          // Token is invalid or expired
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          navigateUrl("/login");
        }
      } catch (err) {
        // Network or other error
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigateUrl("/login");
      }
    }
    checkAuth();
  }, [navigateUrl]);
  // console.log(param.city); //access URL param

  //get all Quests in a City
  useEffect(() => {
    async function getCityQuests() {
      const data = await fetchQuestsByLocation(param.city.toLowerCase());
      // console.log(data);    //data = all quests from city
      setCityQuests(data);
    }
    getCityQuests();
  }, []);

  //get completed Quests in a City
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    async function getCompletedQuests() {
      const data = await fetchCompletedQuests(userId, token);
      setCompletedQuests(Array.isArray(data) ? data : []);
    }
    getCompletedQuests();
  }, []);

  // when user clicks 'See Details', quest goes in QuestContext by way of localStorage
  function onClickSetQuest(quest) {
    localStorage.setItem("currentQuest", JSON.stringify(quest, null, 2));
    // react route to <SingleQuest />
    navigateUrl(`/quests/${quest.id}`);
    setQuest(quest);
  }

  //checks if Quest is completed
  function isQuestCompleted(id) {
    const result = completedQuests.filter((quest) => quest.id === id);
    if (result.length > 0) return true;
    return false;
  }

  function mapCityQuests() {
    return cityQuests.map((quest, idx) => {
      return (
        <div key={idx} className="quest-card">
          <p className="component-text quest-title">{quest.title}</p>
          <div>
            {isQuestCompleted(quest.id) === true ? (
              <button className="completed-btn" disabled="true">Completed</button>
            ) : (
              <button
                onClick={() => onClickSetQuest(quest)}
                className="see-details-btn"
              >
                See Details
              </button>
            )}
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