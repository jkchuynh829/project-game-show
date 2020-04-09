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
          <Home path="/" />
          <Dashboard path="/dashboard" />
          <Questions path="/play" />
        </Router>
      </Layout>
    </GameContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
