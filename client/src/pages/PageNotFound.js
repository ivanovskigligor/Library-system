import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (

    <div className="container-fluid d-flex flex-column align-items-center justify-content-center background text-white py-5">
      <h1 className="text-white">Page Not Found</h1>
      <h2 className="text-white">Are you looking for:</h2>
      <div className="d-grid gap-3">
        <Link class="btn btn-primary btn-lg mr-3" to="/">Home</Link>

        <Link className="btn btn-primary btn-lg mr-3" to="/login">Login</Link>
        <Link className="btn btn-primary btn-lg ml-3" to="/register">Register</Link>
      </div>
    </div>
  );
}

export default PageNotFound;