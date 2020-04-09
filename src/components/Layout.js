import React, { useContext, useEffect } from "react";
import { Link } from "@reach/router";
import { css } from "@emotion/core";
import GameContext from "./GameContext";
import { getQuestions, questionsWithIds } from "../firebase/utils";

const containerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 30px;
`;

const headerStyle = css`
  font-size: 24px;
  margin-bottom: 20px;
  color: black;
`;

const Layout = ({ children }) => {
  const [questions, setQuestions] = useContext(GameContext);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { docs } = await getQuestions();
        const questions = docs.map(questionsWithIds);
        setQuestions(questions);
      } catch (err) {
        console.error(err);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div css={containerStyle}>
      <Link to="/project-game-show">
        <h1 css={headerStyle}>Fast Facts</h1>
      </Link>
      {children}
    </div>
  );
};

export default Layout;
