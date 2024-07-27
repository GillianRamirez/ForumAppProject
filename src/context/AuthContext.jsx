import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext({
  isAuthenticated: false,
  username: "",
  user_id: null,
  setAuthenticated: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(
    !!localStorage.getItem("token"),
  );
  const [username, setUsername] = useState(
    localStorage.getItem("username") || "",
  );
  const [user_id, setUserId] = useState(
    localStorage.getItem("user_id") || null,
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("username");
    const id = localStorage.getItem("user_id");
    setAuthenticated(!!token);
    setUsername(user || "");
    setUserId(id || null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, username, user_id, setAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
