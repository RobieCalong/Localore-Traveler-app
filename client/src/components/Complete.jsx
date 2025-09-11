import React, { useContext } from "react";
import QuestContext from "./QuestContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Complete() {
  const { quest } = useContext(QuestContext);

  return (
    <div>
      <h2>Quest Complete</h2>
      <img src="/assets/explorer.png" alt="npc-bob" width="200px" />
      <p>Congrats fellow traveler here is your reward: </p>
      <img
        src={`/assets/badges/badge_${quest.badge_id}.png`}
        alt={`reward-badge_${quest.badge_id}`}
        width="200px"
      />
      <div>
        <Link to="/map">
          <button>Back to the Map</button>
        </Link>
      </div>
    </div>
  );
}

export default Complete;
