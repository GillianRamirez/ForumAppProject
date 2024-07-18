import React from "react";

const LogoutButton = ({ onLogout }) => {
  axios
    .post("/api/logout")
    .then((response) => {
      // Handle successful logout
      window.localStorage.removeItem("authToken"); // Remove authToken from localStorage
      window.location.href = "/login"; // Redirect to login page
    })
    .catch((error) => {
      console.error("Logout error:", error);
    });
  return (
    <button onClick={onLogout} className="logoutBtn">
      Logout
    </button>
  );
};

export default LogoutButton;
