import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterScreen from "./components/RegisterScreen";
import LoginScreen from "./components/LoginScreen";
import Dashboard from "./components/Dashboard";
import Replies from "./components/Replies";
import ErrorBoundary from "./components/ErrorBoundary";

const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/:id/replies" element={<Replies />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
