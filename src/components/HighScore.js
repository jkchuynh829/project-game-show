import React from "react";
import { css } from "@emotion/core";

const listItemStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const nameStyle = css`
  font-size: 24px;
`;

const scoreStyle = css`
  font-size: 24px;
`;

const HighScore = ({ name, score }) => (
  <li css={listItemStyle}>
    <div css={nameStyle}>{name}</div>
    <div css={scoreStyle}>{score}</div>
  </li>
);

export default HighScore;
