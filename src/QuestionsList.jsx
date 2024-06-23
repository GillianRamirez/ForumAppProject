import React from "react";

const QuestionsList = ({ questions }) => {
  return (
    <div className="questionsList">
      <h2 className="questionsListTitle">Questions</h2>
      <ul className="questionItems">
        {questions.map((question) => (
          <li key={question.id} className="questionItem">
            <h3>{question.title}</h3>
            <p>{question.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionsList;
