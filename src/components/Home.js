import React from "react";
import { Link } from "@reach/router";

const Home = () => (
  <div className="container">
    <Link to="/project-game-show/dashboard">
      <button>Dashboard</button>
    </Link>
    <Link to="/project-game-show/play">
      <button>Play</button>
    </Link>
  </div>
);

export default Home;
