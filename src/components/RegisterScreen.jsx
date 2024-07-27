import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function RegisterScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);

  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!agree) {
      alert("You must agree to the Terms and Conditions and Privacy Policy!");
      return;
    }

    try {
      await axios.post("http://localhost:4000/signup", {
        username,
        email,
        password,
      });
      navigate("/", { state: { message: "Account created successfully!" } });
    } catch (e) {
      alert("Signup failed!");
      console.log(e);
    }
  }

  return (
    <>
      <div className="signup-container">
        <h1>Signup</h1>
        <form action="POST" onSubmit={submit}>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            id="usernameInput"
            required
          />{" "}
          <br />
          <br />
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            id="emailInput"
            required
          />{" "}
          <br />
          <br />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            id="passwordInput"
            required
          />{" "}
          <br />
          <br />
          <input
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            id="confirmPasswordInput"
            required
          />{" "}
          <br />
          <br />
          <input
            type="checkbox"
            id="agreeCheckbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            required
          />
          <label htmlFor="agreeCheckbox">
            {" "}
            I agree to the Terms and Conditions and Privacy Policy
          </label>{" "}
          <br />
          <br />
          <button type="submit">Signup</button> <br />
          <br />
          Already have an account? &nbsp;
          <button>
            <Link to="/login">Login</Link>
          </button>
        </form>
      </div>
    </>
  );
}

export default RegisterScreen;
