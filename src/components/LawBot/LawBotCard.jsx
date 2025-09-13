import React, { useState } from "react";
import "../../../styles/LawBot.css";

function LawBotCard({ title, summary, image, detail }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="law-card" onCli ck={() => setExpanded(!expanded)}>
      <img src={image} alt={title} className="law-img" />
      <h2>{title}</h2>
      <p>{summary}</p>
      {expanded && <div className="law-detail"><p>{detail}</p></div>}
      <span className="tap-to-expand">{expanded ? "Tap to Collapse ⬆" : "Tap to Learn More ⬇"}</span>
    </div>
  );
}

export default LawBotCard;
