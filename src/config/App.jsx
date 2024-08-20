import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterScreen from "./components/RegisterScreen";
import LoginScreen from "./components/LoginScreen";
import Dashboard from "./components/Dashboard";
import Replies from "./components/Replies";
import TraditionalMedia from "./components/TraditionalMedia";
import DigitalMedia from "./components/DigitalMedia";
import ErrorBoundary from "./components/ErrorBoundary";
import Post from "./components/Post";
import DeletePost from "./components/DeletePost";
import Edit from "./components/Edit";
import EditReplies from "./components/EditReplies";
import DeleteReplies from "./components/DeleteReplies";

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
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/RegisterScreen" element={<RegisterScreen />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={<Dashboard />} />}
          />
          <Route
            path="/TraditionalMedia"
            element={<ProtectedRoute element={<TraditionalMedia />} />}
          />
          <Route
            path="/DigitalMedia"
            element={<ProtectedRoute element={<DigitalMedia />} />}
          />
          <Route path="/Post" element={<ProtectedRoute element={<Post />} />} />
          <Route
            path="/DeletePost"
            element={<ProtectedRoute element={<DeletePost />} />}
          />
          <Route path="/Edit" element={<ProtectedRoute element={<Edit />} />} />
          <Route
            path="/:id/replies"
            element={<ProtectedRoute element={<Replies />} />}
          />
          <Route
            path="/EditReplies"
            element={<ProtectedRoute element={<EditReplies />} />}
          />
          <Route
            path="/DeleteReplies"
            element={<ProtectedRoute element={<DeleteReplies />} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
