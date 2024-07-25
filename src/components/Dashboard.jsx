import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [threads, setThreads] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [thread, setThread] = useState("");
  const [question, setQuestion] = useState({
    title: "",
    content: "",
    thread_id: 1,
  });

  useEffect(() => {
    fetchThreads();
    fetchQuestions();
  }, []);

  const fetchThreads = async () => {
    try {
      const response = await axios.get("/api/threads");
      setThreads(response.data);
    } catch (error) {
      console.error("Error fetching threads:", error);
    }
  };

  const fetchQuestions = async () => {
    try {
      const response = await axios.get("/api/questions");
      setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleSubmitThread = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/threads", { title: thread });
      setThread("");
      fetchThreads();
    } catch (error) {
      console.error("Error creating thread:", error);
    }
  };

  const handleSubmitQuestion = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/questions", question);
      setQuestion({ title: "", content: "", thread_id: 1 });
      fetchQuestions();
    } catch (error) {
      console.error("Error creating question:", error);
    }
  };

  return (
    <>
      <Nav />
      <main className="home">
        <h2 className="homeTitle">Create a Thread</h2>
        <form className="homeForm" onSubmit={handleSubmitThread}>
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

        <h2 className="homeTitle">Create a Question</h2>
        <form className="homeForm" onSubmit={handleSubmitQuestion}>
          <div className="home__container">
            <label htmlFor="title">Question Title</label>
            <input
              type="text"
              name="title"
              required
              value={question.title}
              onChange={(e) =>
                setQuestion({ ...question, title: e.target.value })
              }
            />
          </div>
          <div className="home__container">
            <label htmlFor="content">Question Content</label>
            <textarea
              name="content"
              required
              value={question.content}
              onChange={(e) =>
                setQuestion({ ...question, content: e.target.value })
              }
            />
          </div>
          <button className="homeBtn">CREATE QUESTION</button>
        </form>

        <h2 className="homeTitle">Existing Threads</h2>
        <ul>
          {threads.map((thread) => (
            <li key={thread.id}>
              <Link to={`/${thread.id}/replies`}>
                <h3>{thread.title}</h3>
                <p>{thread.content}</p>
                <small>
                  by {thread.username} on{" "}
                  {new Date(thread.created_at).toLocaleString()}
                </small>
              </Link>
            </li>
          ))}
        </ul>

        <h2 className="homeTitle">Existing Questions</h2>
        <ul>
          {questions.map((question) => (
            <li key={question.id}>
              <h3>{question.title}</h3>
              <p>{question.content}</p>
              <small>
                by {question.username} in {question.thread_id} on{" "}
                {new Date(question.created_at).toLocaleString()}
              </small>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default Dashboard;
