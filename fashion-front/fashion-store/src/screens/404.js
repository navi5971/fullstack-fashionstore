import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div
      className="container"
      style={{ maxWidth: "none", height: "100%", alignContent: "center" }}
    >
      <Typography variant="h4">NotFound</Typography>
      {/* sample page */}
      <p>The page you are looking for does not exist.</p>
      <Link to="/" style={{ textDecoration: "none", color: "lightcoral" }}>
        Go Back to Home
      </Link>
    </div>
  );
};
