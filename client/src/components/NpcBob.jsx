import "../styles/NpcBob.css";
// import npcBobImage from "..assets/explorer.png"
import NpcBubbleText from "./NpcBubbleText";

function NpcBob({ say }) {
  return (
    <div>
      <div className="box-model">
        <NpcBubbleText say={say} />
        <img src={`/assets/explorer.png`} alt="npc-bob" width="260px" />
      </div>
    </div>
  );
}

export default NpcBob;
