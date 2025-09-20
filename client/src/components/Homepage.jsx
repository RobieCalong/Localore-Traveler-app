import React from "react";
import "../styles/Homepage.css";

function Homepage() {
  return (
    <>
      <div className="homepage-gradient"></div>
      <div className="homepage-container">
        <svg width="400" height="120" className="homepage-title-svg">
          <defs>
            <path id="arcPath" d="M 50 100 A 150 50 0 0 1 350 100" />
          </defs>
          <text fontFamily="Cinzel Decorative, cursive" fontSize="64" fill="#fff">
            <textPath href="#arcPath" startOffset="50%" textAnchor="middle">
              Localore
            </textPath>
          </text>
        </svg>
        <img
          src="/assets/Homepage/cartoon_world.png"
          alt="Cartoon World"
          className="homepage-image"
        />
        <p className="homepage-tagline">Discover cities. Complete quests. Earn rewards.</p>
      </div>
    </>
  );
}

export default Homepage;
