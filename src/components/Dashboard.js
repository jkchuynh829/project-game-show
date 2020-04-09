import React, { useContext, useState, useEffect } from "react";
import { css } from "@emotion/core";
import GameContext from "./GameContext";
import DashboardQuestion from "./DashboardQuestion";
import {
  questionsWithIds,
  deleteQuestion,
  postQuestion
} from "../firebase/utils";

const containerStyle = css`
  display: flex;
  width: 960px;
  padding: 0;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const headerStyle = css`
  font-size: 20px;
  margin-bottom: 30px;
`;

const formStyle = css`
  width: 100%;
  margin-bottom: 50px;
`;

const inputStyle = css`
  border: none;
  font-size: 24px;
  border-bottom: 2px solid #ececec;
  outline: none;
  width: 100%;
  margin-bottom: 15px;

  ::placeholder {
    font-family: "Fira Code", monospace;
  }
`;

const listStyle = css`
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
`;

const Dashboard = () => {
  const [questions, setQuestions] = useContext(GameContext);
  const [newQuestion, updateInput] = useState("");
  const [answer, updateAnswer] = useState(true);

  async function createQuestion(e) {
    e.preventDefault();

    try {
      const result = await postQuestion({
        question: newQuestion,
        answer: answer === "true" || answer === true,
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
    <div css={containerStyle}>
      <h2 css={headerStyle}>Dashboard</h2>
      <form css={formStyle} onSubmit={createQuestion}>
        <label htmlFor="question">
          <input
            id="question"
            css={inputStyle}
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
      <ul css={listStyle}>
        {questions.length > 0 ? (
          questions.map(question => (
            <DashboardQuestion
              key={question.id}
              {...question}
              removeQuestion={removeQuestion}
            />
          ))
        ) : (
          <li>...</li>
        )}
      </ul>
    </div>
  );
};

export default Dashboard;
