import "../styles/NpcBob.css";

function NpcBubbleText({ say }) {
  return (
    <div className="container">
      <img
        src={`/assets/text-bubble.png`}
        className="box-bubble"
        alt="text-bubble"
        width="300px"
      />
      {say ? <span className="box-text">{say}</span> : null}
    </div>
  );
}

export default NpcBubbleText;
