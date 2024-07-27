import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function Post() {
  const navigate = useNavigate();
  const location = useLocation();

  const [values, setValues] = useState({
    question_title: "",
    question: "",
    category_id: location.state?.category_id || "1",
    user_id: localStorage.getItem("user_id") || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:4000/post", values)
      .then((res) => {
        console.log(res);
        // Determine where to navigate based on the previous location
        const previousPath = location.state?.from || "/";
        navigate(previousPath);
      })
      .catch((err) => console.error(err));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <div className="post-container">
      <h1>Post Question:</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="question_title">Title:</label>
        <input
          type="text"
          name="question_title"
          id="question_title"
          value={values.question_title}
          onChange={handleInputChange}
        />
        <br />
        <label htmlFor="question">Question:</label>
        <textarea
          name="question"
          id="question"
          value={values.question}
          onChange={handleInputChange}
        />
        <br />
        <label htmlFor="category_id">Category:</label>
        <select
          name="category_id"
          id="category_id"
          value={values.category_id}
          onChange={handleInputChange}
        >
          <option value="1">Traditional Media</option>
          <option value="2">Digital Media</option>
        </select>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Post;
