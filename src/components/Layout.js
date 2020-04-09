import React, { useContext, useEffect } from "react";
import { Link } from "@reach/router";
import GameContext from "./GameContext";
import { getQuestions, questionsWithIds } from "../firebase/utils";

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
    <div>
      <Link to="/">Fast Facts</Link>
      {children}
    </div>
  );
};

export default Layout;
