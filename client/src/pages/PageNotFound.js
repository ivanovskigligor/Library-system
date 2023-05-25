import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div  className="p-3 mb-2">
      <h1>Page Not Found</h1>
            <h2>Are you looking for:</h2>
            <Link class="btn btn-link" to="/">Home</Link>
                <Link class="btn btn-link" to="/login">Login</Link>
                <Link class="btn btn-link" to="/register">Register</Link>

    </div>
  );
}

export default PageNotFound;