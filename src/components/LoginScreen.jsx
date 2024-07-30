import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "/src/context/AuthContext.jsx"; // Import useAuth hook

function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setAuthenticated } = useAuth(); // Call useAuth hook inside the component body

  async function submit(e) {
    e.preventDefault();

    try {
      const response = axios
        .post("http://localhost:4000/login", {
          username,
          password,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", username); // Store the username
      localStorage.setItem("user_id", response.data.user_id);
      setAuthenticated(true); // Update isAuthenticated state
      navigate("/dashboard", {
        state: { message: "Login successful!", username },
      });
    } catch (e) {
      alert("Login failed");
      console.log(e);
    }
  }

  return (
    <>
      <div className="login-container">
        <h1>Login</h1>

        <form className="login-form" action="POST">
          <input
            type="text"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="Username"
            id="usernameInput"
          />{" "}
          <br />
          <br />
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
            id="passwordInput"
          />{" "}
          <br />
          <br />
          <button onClick={submit} className="btn">
            Login
          </button>
          <br />
          <br />
          Don't have an account? &nbsp;
          <button className="btn">
            <Link to="/RegisterScreen">Signup</Link>
          </button>
        </form>
      </div>
    </>
  );
}

export default LoginScreen;
