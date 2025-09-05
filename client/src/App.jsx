import "./App.css";
import { Routes, Route } from "react-router";

import Navigation from "./components/Navigation";
import Homepage from "./components/Homepage";
import Map from "./components/Map";
import CityQuests from "./components/CityQuests";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/map" element={<Map />} />

        <Route path="/location/:city/quests" element={<CityQuests />} />
      </Routes>
    </>
  );
}

export default App;
