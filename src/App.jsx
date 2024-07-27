import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterScreen from "./components/RegisterScreen";
import LoginScreen from "./components/LoginScreen";
import Dashboard from "./components/Dashboard";
import Replies from "./components/Replies";
import ErrorBoundary from "./components/ErrorBoundary";
import Nav from "./components/Nav";


const App = () => {
  const isAuthenticated = !!localStorage.getItem("_id");

  const ProtectedRoute = ({ element }) => {
    return isAuthenticated ? element : <LoginScreen />;
  };

  const NotFound = () => {
    return (
      <div>
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
      </div>
    );
  };

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={<Dashboard />} />}
          />
          <Route
            path="/:id/replies"
            element={<ProtectedRoute element={<Replies />} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
