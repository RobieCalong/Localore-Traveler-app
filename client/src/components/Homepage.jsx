import React from "react";
import FetchLevel from "./FetchLevel";

function Homepage() {
  return (
    <div>
      <h1>Homepage: Welcome to Localore</h1>
      <FetchLevel level={1} />
    </div>
  );
}

export default Homepage;
