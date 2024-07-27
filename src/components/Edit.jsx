import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [dataLoaded, setDataLoaded] = useState(false);
  const [values, setValues] = useState({
    question_id: "",
    category_id: "",
    question_title: "",
    question: "",
    user_id: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:4000/edit/${id}`)
      .then((res) => {
        setValues({
          ...values,
          question_id: res.data[0].question_id,
          category_id: res.data[0].category_id,
          question_title: res.data[0].question_title,
          question: res.data[0].question,
          user_id: res.data[0].user_id,
        });
        setDataLoaded(true);
      })
      .catch((err) => console.error("err: " + err));
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post(`http://localhost:4000/edit/`, values)
      .then((res) => {
        console.log(res);
        const previousPath = location.state?.from || "/";
        navigate(previousPath);
      })
      .catch((err) => console.error(err));
  }

  return (
    <>
      {dataLoaded ? (
        <div className="edit-container">
          <h1>Edit Question:</h1>

          <form action="" method="POST" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="id">
                Title:
                <input
                  type="text"
                  name="question_title"
                  id="question_title"
                  value={values.question_title}
                  onChange={(e) =>
                    setValues({ ...values, question_title: e.target.value })
                  }
                />
              </label>
            </div>
            <br />
            <div>
              <label htmlFor="id">
                Question:
                <input
                  type="text"
                  name="question"
                  id="question"
                  value={values.question}
                  onChange={(e) =>
                    setValues({ ...values, question: e.target.value })
                  }
                />
              </label>
            </div>
            <br />

            <div>
              <input type="submit" value="Submit" />
            </div>
          </form>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default Edit;
