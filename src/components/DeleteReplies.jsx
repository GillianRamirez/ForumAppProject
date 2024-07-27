import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function DeleteReplies() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .delete(`http://localhost:4000/delete-answer/${id}`)
      .then((res) => {
        console.log(res.data);
        navigate("/");
      })
      .catch((err) => console.log(err));
  }, [id, navigate]);

  return (
    <div>
      <h1>Deleting Answer...</h1>
    </div>
  );
}

export default DeleteReplies;
