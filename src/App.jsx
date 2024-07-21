import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/RegisterScreen";
import Login from "./components/LoginScreen";
import Dashboard from "./components/Dashboard";
import Replies from "./components/Replies";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/:id/replies" element={<Replies />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
