import React from "react";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="container">
      <h2> NotFound</h2>
      {/* sample page */}
      <p>The page you are looking for does not exist.</p>
      <Link to="/" style={{ textDecoration: "none", color: "lightcoral" }}>
        Go Back to Home
      </Link>
    </div>
  );
};
