import "./App.css";
import { Routes, Route } from "react-router-dom";

import Navigation from "./components/Navigation";
import Homepage from "./components/Homepage";
import Map from "./components/Map";
import CityQuests from "./components/CityQuests";
import SingleQuest from "./components/SingleQuest";
import UploadProof from "./components/UploadProof";
import Complete from "./components/Complete";
import QuestProvider from "./components/QuestProvider";
import Login from "./components/Login";
import Register from "./components/Register";
import UserHomepage from "./components/UserHomepage";

function App() {
  return (
    <>
      <QuestProvider>
        <Navigation />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/map" element={<Map />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userhomepage/:userId" element={<UserHomepage />} />
          <Route path="/location/:city/quests" element={<CityQuests />} />
          <Route path="/quests/:id" element={<SingleQuest />} />
          <Route path="/quests/:id/upload" element={<UploadProof />} />
          <Route path="/quests/:id/complete" element={<Complete />} />
        </Routes>
      </QuestProvider>
    </>
  );
}

export default App;
