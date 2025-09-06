import React, { useContext, useState } from "react";
import { Link } from "react-router";
import QuestContext from "./QuestContext";
import NpcBob from "./NpcBob";
import { acceptUserQuest } from "../api/index";

function SingleQuest() {
  const { quest } = useContext(QuestContext);
  // console.log(quest.messages); //messages is an Array

  const [messageIndex, setMessageIndex] = useState(0);
  const [say, setSay] = useState("Hey there, fellow traveler.");

  const nextButton = () => {
    //helper function uses updater callback of setMessageIndex to immediately use its messageIndex value
    function nextMessage() {
      setMessageIndex((currentIndex) => currentIndex + 1);
      setSay(quest.messages[messageIndex]);
    }

    // show "Chat... button" if messageIndex is < messages.length
    const jsx =
      quest.messages !== undefined && messageIndex < quest.messages?.length ? (
        <button onClick={() => nextMessage()}>Chat ...</button>
      ) : null;
    return jsx;
  };

  const acceptQuestButton = () => {
    // helper function
    async function acceptQuest(quest_id) {
      const data = await acceptUserQuest(quest_id);
      console.log("this is acceptQuestButtonFunction: ", data);
    }

    // show "accept quest button" if messageIndex is >= messages.length
    const jsx =
      quest.messages !== undefined && messageIndex >= quest.messages?.length ? (
        <div>
          <Link to={`/location/${quest.location}/quests`}>
            <button>No, return to City Quests</button>
          </Link>
          {/* <Link to={`/quests/${quest.id}/upload`}> */}
          {console.log("this is quest.id @LINK: ", quest.id)}
          <button onClick={() => acceptQuest(quest.id)}>
            Yes, Accept Quest
          </button>
          {/* </Link> */}
        </div>
      ) : null;
    return jsx;
  };

  return (
    <div>
      <h1>{quest.title}</h1>
      <NpcBob say={say} />
      {nextButton()}
      {acceptQuestButton()}
    </div>
  );
}

export default SingleQuest;
