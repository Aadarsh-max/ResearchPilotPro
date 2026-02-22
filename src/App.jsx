import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import HomePage from "./pages/Home/HomePage";
import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";
import ResearchView from "./pages/Research/ResearchView";
import Profile from "./pages/Profile/Profile";
import Workspace from "./pages/Workspace/Workspace";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/researchview" element={<ResearchView />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/workspace" element={<Workspace />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;