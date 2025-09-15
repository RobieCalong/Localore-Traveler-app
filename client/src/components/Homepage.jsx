import React from "react";
import "../styles/Homepage.css";

function Homepage() {


  return (
    <div className="homepage-container">
      <h1 className="homepage-title">Localore</h1>
      <img
        src="/assets/Homepage/cartoon_world.png"
        alt="Cartoon World"
        className="homepage-image"
      />
      <p className="homepage-tagline">Discover cities. Complete quests. Earn rewards.</p>
    </div>
  );
}

export default Homepage;
