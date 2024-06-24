import React from "react";

const Nav = () => {
  const signOut = () => {
    alert("User signed out!");
    localStorage.removeItem("_id");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h2>Topic</h2>

      <div className="navbarRight">
        <button onClick={signOut}>Sign out</button>
      </div>
    </nav>
  );
};

export default Nav;
