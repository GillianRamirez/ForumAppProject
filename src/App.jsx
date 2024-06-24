import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles.css";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import Dashboard from "./Dashboard";
import LogoutButton from "./LogoutButton";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard" element={<LogoutButton />} />
      </Routes>
    </Router>
  );
};

export default App;
