import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

const NoMatch: React.FC = () => {
  return (
    <div className="container">
      <h1 className="heading">404</h1>
      <p className="message">Page Not Found</p>
      <Link to="/" className="link">
        Go back to Home
      </Link>
    </div>
  );
};

export default NoMatch;
