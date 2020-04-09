import React, { useContext, useState } from "react";
import { Link } from "@reach/router";
import GameContext from "./GameContext";
import { css } from "@emotion/core";
import { postScore } from "../firebase/utils";

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

const questionStyle = css`
  font-size: 24px;
  margin: 50px;
  text-align: center;
`;

const buttonContainerStyle = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const buttonStyle = answer => css`
  border: 1px solid ${answer ? "green" : "red"};
  color: ${answer ? "green" : "red"};
  font-size: 18px;
  background: none;
  width: 200px;
  padding: 20px;
  margin: 20px;
  cursor: pointer;
  transition: background 100ms 25ms ease-in, color 100ms 25ms ease-in;
  outline: none;

  :hover {
    background: ${answer ? "green" : "red"};
    color: white;
  }
`;

const formStyle = css`
  width: 600px;
  margin: 50px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const inputStyle = css`
  border: none;
  font-size: 16px;
  border-bottom: 2px solid #ececec;
  outline: none;
  width: 300px;
  margin-bottom: 15px;

  ::placeholder {
    font-family: "Fira Code", monospace;
  }
`;

const Questions = () => {
  const [questions] = useContext(GameContext);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function saveScore(e) {
    e.preventDefault();

    try {
      const result = await postScore({ name, score });
      if (result) setSubmitted(true);
    } catch (err) {
      console.error(err);
    }
  }

  const answerQuestion = answer => {
    if (answer === questions[questionIndex].answer) {
      setScore(score + 1);
    }

    if (answeredCount === questions.length - 1) {
      setFinished(true);
      return;
    }

    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    }

    setAnsweredCount(answeredCount + 1);
  };

  const resetGame = () => {
    setQuestionIndex(0);
    setScore(0);
    setAnsweredCount(0);
    setFinished(false);
  };

  return (
    <div css={containerStyle}>
      <h2 css={headerStyle}>Questions</h2>
      <h3 css={headerStyle}>Score:{score}</h3>
      {finished && (
        <p css={questionStyle}>
          You got {score} out of {questions.length} correct!
        </p>
      )}
      {finished && (
        <button css={buttonStyle(true)} onClick={resetGame}>
          Reset
        </button>
      )}
      {finished && !submitted && (
        <form css={formStyle} onSubmit={saveScore}>
          <label htmlFor="question">
            <input
              id="question"
              css={inputStyle}
              value={name}
              placeholder="Type your name here..."
              onChange={e => setName(e.target.value)}
            />
          </label>
          <button css={buttonStyle(true)}>Save Your Score</button>
        </form>
      )}
      {finished && submitted && (
        <Link to="/project-game-show">View Leaderboard</Link>
      )}
      {questions[questionIndex] && !finished && (
        <p css={questionStyle}>{questions[questionIndex].question}</p>
      )}
      {!finished && (
        <div css={buttonContainerStyle}>
          <button css={buttonStyle(true)} onClick={() => answerQuestion(true)}>
            True
          </button>
          <button
            css={buttonStyle(false)}
            onClick={() => answerQuestion(false)}
          >
            False
          </button>
        </div>
      )}
    </div>
  );
};

export default Questions;
