import React, { useState, useEffect } from "react";

function FetchLevel({ level }) {
  const [levelData, setLevelData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/levels/${level}`)
      .then((response) => response.json())
      .then((data) => setLevelData(data))
      .catch((error) =>
        console.error("Error fetching level data:", error)
      );
  }, [level]);

  return (
    <div>
      {levelData ? (
        <div>
          <h2>Level {levelData.id}: {levelData.name}</h2>
        </div>
      ) : (
        <p>Loading level data...</p>
      )}
    </div>
  );
}

export default FetchLevel;