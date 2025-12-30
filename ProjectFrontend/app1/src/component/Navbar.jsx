import React from "react";
import { Link } from "react-router";

function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/home">
            Home
          </Link>
          {/* <Link className="nav-link"  to="/*">Login</Link> */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/*">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/register">
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/addCourse">
                  Add Course
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/getCourses">
                  All Course
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/getCourses">
                  All Course
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  aria-current="page"
                  to="/admin/videos"
                >
                  All Video
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
