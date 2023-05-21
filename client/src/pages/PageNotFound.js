import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div>
      <h1>PageNotFound</h1>
            <h2>Are you looking for:</h2>
            <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>

    </div>
  );
}

export default PageNotFound;