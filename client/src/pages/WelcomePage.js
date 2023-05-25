import React from "react";
import { Link } from "react-router-dom";

function WelcomePage() {
    return (
        <div className="container-fluid d-flex flex-column align-items-center justify-content-center background text-white py-5">
            <h1 className="mb-4 text-white">You must be logged in to continue</h1>
            <div className="d-grid gap-3">
                <Link className="btn btn-primary btn-lg mr-3" to="/login">Login</Link>
                <Link className="btn btn-primary btn-lg ml-3" to="/register">Register</Link>
            </div>
        </div>
    );
}

export default WelcomePage;