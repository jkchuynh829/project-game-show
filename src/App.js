import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Router } from "@reach/router";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Questions from "./components/Questions";
import GameContext from "./components/GameContext";

const App = () => {
  const game = useState([]);
  return (
    <GameContext.Provider value={game}>
      <Layout>
        <Router>
          <Home path="/project-game-show" />
          <Dashboard path="/project-game-show/dashboard" />
          <Questions path="/project-game-show/play" />
        </Router>
      </Layout>
    </GameContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
