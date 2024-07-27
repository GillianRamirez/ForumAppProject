import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditReplies() {
  const { id } = useParams();
  const [replies, setReplies] = useState("");
  const [questionId, setQuestionId] = useState(null);
  const [userId, setUserId] = useState(localStorage.getItem("user_id") || "");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/edit-replies/${id}`)
      .then((res) => {
        setReplies(res.data.answer);
        setQuestionId(res.data.question_id);
        setUserId(res.data.user_id); // Set the user ID from the fetched data
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/edit-replies", {
        replies_id: id,
        replies: answer,
        question_id: questionId,
        user_id: userId,
      })
      .then((res) => {
        console.log(res.data);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="edit-replies-container">
      <h1>Edit Answer</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Answer:</label>
          <input
            type="text"
            value={replies}
            onChange={(e) => setReplies(e.target.value)}
          />
        </div>
        <br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default EditReplies;
