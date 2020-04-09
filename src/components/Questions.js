import React, { useContext, useState } from "react";
import GameContext from "./GameContext";

const Questions = () => {
  const [questions] = useContext(GameContext);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const answerQuestion = answer => {
    if (answer === questions[questionIndex].answer) {
      setScore(score + 1);
    }

    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    }
  };

  return (
    <div className="container">
      <h2>Questions</h2>
      <h3>Score:{score}</h3>
      {questions[questionIndex] && <p>{questions[questionIndex].question}</p>}
      <button onClick={() => answerQuestion(true)}>True</button>
      <button onClick={() => answerQuestion(false)}>False</button>
    </div>
  );
};

export default Questions;
