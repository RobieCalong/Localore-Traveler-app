import "./App.css";
import { Routes, Route } from "react-router";

import Navigation from "./components/Navigation";
import Homepage from "./components/Homepage";
import Map from "./components/Map";
import CityQuests from "./components/CityQuests";
import SingleQuest from "./components/SingleQuest";
import UploadProof from "./components/UploadProof";
import QuestProvider from "./components/QuestProvider";

function App() {
  return (
    <>
      <QuestProvider>
        <Navigation />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/map" element={<Map />} />

          <Route path="/location/:city/quests" element={<CityQuests />} />
          <Route path="/quests/:id" element={<SingleQuest />} />
          <Route path="/quests/:id/upload" element={<UploadProof />} />
        </Routes>
      </QuestProvider>
    </>
  );
}

export default App;
