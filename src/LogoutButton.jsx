import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

const LogoutButton = ({ onLogout }) => {
  const handleLogout = () => {
    axios
      .post("/api/logout")
      .then((response) => {
        // Handle successful logout
        window.localStorage.removeItem("authToken");
        onLogout();
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  return <button onClick={handleLogout}>Logout</button>;
};

LogoutButton.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default LogoutButton;
