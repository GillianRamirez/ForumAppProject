import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "/src/context/AuthContext.jsx";
import React from "react";

function Nav() {
  const isLoggedIn = !!localStorage.getItem("token"); // Assuming token is stored in localStorage
  const navigate = useNavigate();
  const { isAuthenticated, setAuthenticated } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username"); // Clear the username
    localStorage.removeItem("user_id");
    setAuthenticated(false);
    navigate("/");
  };

  return (
    <div className="sidebar-container">
      <ul>
        <div className="sidebar-item">
          <Link to="/dashboard">
            <li>Home</li>
          </Link>
        </div>

        <div className="sidebar-item">
          <Link to="/TraditionalMedia">
            <li>Traditional Media</li>
          </Link>
        </div>

        <div className="sidebar-item">
          <Link to="/DigitalMedia">
            <li>Digital Media</li>
          </Link>
        </div>

        <div className="sidebar-item">
          {isAuthenticated ? (
            <>
              <button onClick={handleLogout} className="btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/">Login</Link> or{" "}
              <Link to="/RegisterScreen">Signup</Link>
            </>
          )}
        </div>
      </ul>
    </div>
  );
}

export default Nav;
