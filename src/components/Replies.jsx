import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Replies() {
  const { question_id } = useParams();
  const navigate = useNavigate();

  const [question, setQuestion] = useState(null);
  const [values, setValues] = useState({
    answer: "",
    question_id: question_id,
    user_id: localStorage.getItem("user_id") || "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:4000/question/${question_id}`)
      .then((res) => {
        setQuestion(res.data);
      })
      .catch((err) => console.error(err));
  }, [question_id]);

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post("http://localhost:4000/Replies", values)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.error(err));
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }

  return (
    <div className="reply-container">
      <h1>Answer Question:</h1>
      {question ? (
        <>
          <h2>{question.question_title}</h2>
          <p>{question.question}</p>
        </>
      ) : (
        <p>Loading question...</p>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="reply">
            Answer:
            <br />
            <textarea
              name="reply"
              id="reply"
              className="reply-input"
              value={values.answer}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <br />
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
}

export default Replies;
