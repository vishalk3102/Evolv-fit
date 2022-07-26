import React from "react";
import Dashboard from "./Components/Dashboard";
import { Route, Routes } from "react-router-dom";
import Workout from "./Components/Workout";
import Nutrition from "./Components/Nutrition";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/userid/workout" element={<Workout />} />
        <Route path="/userid/nutrition" element={<Nutrition />} />
      </Routes>
    </>
  );
};

export default App;
