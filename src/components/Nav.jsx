import React from "react";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();

  const signOut = () => {
    alert("User signed out!");
    localStorage.removeItem("_id");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h2>Paint The Picture: An Art Media Q&A Forum</h2>
      <div className="navbarRight">
        <button onClick={signOut} aria-label="Sign out">
          Sign out
        </button>
      </div>
    </nav>
  );
};

export default Nav;
