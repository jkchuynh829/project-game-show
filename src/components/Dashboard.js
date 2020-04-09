import React, { useContext, useState, useEffect } from "react";
import GameContext from "./GameContext";
import {
  questionsWithIds,
  deleteQuestion,
  postQuestion
} from "../firebase/utils";

const Dashboard = () => {
  const [questions, setQuestions] = useContext(GameContext);
  const [newQuestion, updateInput] = useState("");
  const [answer, updateAnswer] = useState(true);

  async function createQuestion(e) {
    e.preventDefault();

    try {
      const result = await postQuestion({
        question: newQuestion,
        answer: answer || answer === "true",
        createdAt: new Date()
      });

      const doc = await result.get();

      setQuestions([...questions, questionsWithIds(doc)]);

      // Reset form
      updateInput("");
      updateAnswer(true);
    } catch (err) {
      console.error(err);
    }
  }

  async function removeQuestion(id) {
    try {
      await deleteQuestion(id);
      setQuestions(questions.filter(q => q.id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {}, []);

  return (
    <div className="container">
      <h2>Questions</h2>
      <form onSubmit={createQuestion}>
        <label htmlFor="question">
          Question:
          <input
            id="question"
            value={newQuestion}
            placeholder="New question..."
            onChange={e => updateInput(e.target.value)}
          />
        </label>
        <label htmlFor="answer">
          Answer:
          <select
            value={answer}
            onChange={e => updateAnswer(e.target.value)}
            onBlur={e => updateAnswer(e.target.value)}
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </label>
        <button>Add Question</button>
      </form>
      <ul>
        {questions.length > 0 ? (
          questions.map(({ id, question, answer }) => (
            <li key={id}>
              <p>{question}</p>
              <p>({answer ? "True" : "False"})</p>
              <button onClick={() => removeQuestion(id)}>Delete</button>
            </li>
          ))
        ) : (
          <li>...</li>
        )}
      </ul>
    </div>
  );
};

export default Dashboard;
