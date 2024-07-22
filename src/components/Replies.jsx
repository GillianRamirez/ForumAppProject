import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Replies = () => {
  const { id } = useParams();
  const [reply, setReply] = useState("");
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    fetch(`/api/threads/${id}/replies`)
      .then((response) => response.json())
      .then((data) => setReplies(data))
      .catch((error) => console.error("Error fetching replies:", error));
  }, [id]);

  const handleSubmitReply = (e) => {
    e.preventDefault();
    console.log({ reply });
    setReply("");
  };

  return (
    <main className="replies">
      <form className="modal__content" onSubmit={handleSubmitReply}>
        <label htmlFor="reply">Reply to the thread</label>
        <textarea
          rows={5}
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          type="text"
          name="reply"
          className="modalInput"
        />
        <button className="modalBtn">SEND</button>
      </form>
      <h2 className="repliesTitle">Replies</h2>
      <ul>
        {replies.map((reply) => (
          <li key={reply.id}>
            <p>{reply.content}</p>
            <small>
              by {reply.username} on{" "}
              {new Date(reply.created_at).toLocaleString()}
            </small>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Replies;
