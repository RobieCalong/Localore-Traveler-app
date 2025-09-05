import React, { useContext, useState } from "react";
import QuestContext from "./QuestContext";
import NpcBob from "./NpcBob";

function SingleQuest() {
  const [say, setSay] = useState("");

  const { quest } = useContext(QuestContext);

  return (
    <div>
      <h1>{quest.title}</h1>
      <NpcBob say={say} />
    </div>
  );
}

export default SingleQuest;
