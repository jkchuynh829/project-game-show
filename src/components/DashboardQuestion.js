import React from "react";
import { css } from "@emotion/core";

const listItemStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const buttonStyle = css`
  padding: 5px;
  font-size: 12px;
  border-radius: 4px;
  background: none;
  outline: none;
  border: 1px solid red;
  color: red;
  transition: background 100ms 25ms ease, color 100ms 25ms ease;

  :hover {
    background: red;
    color: white;
  }
`;

const DashboardQuestion = ({ id, question, answer, removeQuestion }) => (
  <li css={listItemStyle} key={id}>
    <p>{question}</p>
    <p
      css={css`
        color: ${answer ? "green" : "red"}};
        margin: 0 15px;
      `}
    >
      ({answer ? "True" : "False"})
    </p>
    <button css={buttonStyle} onClick={() => removeQuestion(id)}>
      Delete
    </button>
  </li>
);

export default DashboardQuestion;
