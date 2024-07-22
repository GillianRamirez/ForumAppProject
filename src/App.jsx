import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/RegisterScreen";
import Login from "./components/LoginScreen";
import Dashboard from "./components/Dashboard";
import Replies from "./components/Replies";
import ErrorBoundary from "./components/ErrorBoundary";

const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/:id/replies" element={<Replies />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
