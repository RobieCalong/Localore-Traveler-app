import React, { useState, useEffect } from "react";
import QuestContext from "./QuestContext";

function QuestProvider({ children }) {
  const [quest, setQuest] = useState(() => {
    // initial value for 'quest' is from localstorage, otherwise default value is {}
    const stored = localStorage.getItem("currentQuest");
    // stored is string datatype so its parsed into object
    return stored ? JSON.parse(stored) : {};
  });

  useEffect(() => {
    const stored = localStorage.getItem("currentQuest");
    if (stored) {
      const parsed = JSON.parse(stored);
      setQuest(parsed);
    }
  }, []);

  return (
    <QuestContext.Provider value={{ quest, setQuest }}>
      {children}
    </QuestContext.Provider>
  );
}

export default QuestProvider;
