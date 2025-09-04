import "./App.css";
import { Routes, Route } from "react-router";

import Homepage from "./components/Homepage";
import Navigation from "./components/Navigation";
import Map from "./components/Map";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </>
  );
}

export default App;
