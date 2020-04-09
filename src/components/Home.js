import React from "react";
import { Link } from "@reach/router";

const Home = () => (
  <div className="container">
    <Link to="/dashboard">
      <button>Dashboard</button>
    </Link>
    <Link to="/play">
      <button>Play</button>
    </Link>
  </div>
);

export default Home;
