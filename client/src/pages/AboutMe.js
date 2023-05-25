import React from "react";
import { Link } from "react-router-dom";

function AboutMe() {
    return (
        <div>
            <div class="bg-light">
                <div class="container py-5">
                    <div class="row h-100 align-items-center py-5">
                        <div class="col-lg-6">
                            <h1 class="display-4">About us page</h1>
                            <p class="lead text-muted mb-0">This is a project for the subject Systems 3. The project was made with Mysql, Express, React, Node, Bootrstrap.</p>
                            
                        </div>
                        <div class="col-lg-6 d-none d-lg-block"><img src="https://bootstrapious.com/i/snippets/sn-about/illus.png" alt="" class="img-fluid"/></div>
                    </div>
                </div>
            </div>

            
        </div>
    );
}

export default AboutMe;