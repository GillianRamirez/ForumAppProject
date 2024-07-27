import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditReplies() {
  const { id } = useParams();
  const [reply, setReplies] = useState("");
  const [questionId, setQuestionId] = useState(null);
  const [userId, setUserId] = useState(localStorage.getItem("user_id") || "");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/edit-replies/${id}`)
      .then((res) => {
        setReplies(res.data.reply);
        setQuestionId(res.data.question_id);
        setUserId(res.data.user_id); // Set the user ID from the fetched data
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/edit-replies", {
        reply_id: id,
        reply: reply,
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
            value={reply}
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
