import React, { useState } from "react";
import Nav from "./Nav";

const Dashboard = () => {
  const [thread, setThread] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ thread });
    setThread("");
  };
  return (
    <>
      <Nav />
      <main className="home">
        <h2 className="homeTitle">Create a Thread</h2>
        <form className="homeForm" onSubmit={handleSubmit}>
          <div className="home__container">
            <label htmlFor="thread">
              Paint The Picture: An Art Media Q&A Forum
            </label>
            <input
              type="text"
              name="thread"
              required
              value={thread}
              onChange={(e) => setThread(e.target.value)}
            />
          </div>
          <button className="homeBtn">CREATE THREAD</button>
        </form>
      </main>
    </>
  );
};

export default Dashboard;
