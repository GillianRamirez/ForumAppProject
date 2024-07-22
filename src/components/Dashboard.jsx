import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [threads, setThreads] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [thread, setThread] = useState("");
  const [question, setQuestion] = useState({
    title: "",
    content: "",
    category_id: 1,
  }); // Default category_id for simplicity

  useEffect(() => {
    fetch("/api/threads")
      .then((response) => response.json())
      .then((data) => setThreads(data))
      .catch((error) => console.error("Error fetching threads:", error));

    fetch("/api/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  const handleSubmitThread = (e) => {
    e.preventDefault();
    console.log({ thread });
    setThread("");
  };

  const handleSubmitQuestion = (e) => {
    e.preventDefault();
    console.log({ question });
    setQuestion({ title: "", content: "", category_id: 1 });
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
                by {question.username} in {question.category_name} on{" "}
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
