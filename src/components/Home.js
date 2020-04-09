import React, { useEffect, useState } from "react";
import { Link } from "@reach/router";
import { css } from "@emotion/core";
import HighScore from "./HighScore";
import { getLeaderboard, questionsWithIds } from "../firebase/utils";

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
  margin: 50px 0;
`;

const buttonStyle = css`
  background-color: #4caf50;
  width: 150px;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-bottom: 15px;
  transition: background 100ms 0ms ease-in, color 100ms 0ms ease-in;

  :hover {
    background: blue;
    color: white;
    transition: background 100ms 25ms ease-in, color 100ms 25ms ease-in;
  }
`;

const listStyle = css`
  margin: 0;
  padding: 0;
  width: 350px;
`;

const Home = () => {
  const [highScores, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const { docs } = await getLeaderboard();
        const leaderboard = docs.map(questionsWithIds);
        setLeaderboard(leaderboard);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="container" css={containerStyle}>
      <Link to="/project-game-show/dashboard">
        <button css={buttonStyle}>Dashboard</button>
      </Link>
      <Link to="/project-game-show/play">
        <button css={buttonStyle}>Play</button>
      </Link>
      <h2 css={headerStyle}>Leaderboard</h2>
      <ul css={listStyle}>
        {highScores.map(contestant => (
          <HighScore key={contestant.id} {...contestant} />
        ))}
      </ul>
    </div>
  );
};

export default Home;
