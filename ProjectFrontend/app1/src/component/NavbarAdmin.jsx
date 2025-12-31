import React from 'react'
import { Link } from 'react-router-dom'

function NavbarAdmin() {
  
  return (
    <nav className="navbar navbar-expand-lg bg-primary navbar-dark">
      <div className="container-fluid">

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link" to="#">
                Dashboard
              </Link>
            </li>

        
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle btn btn-link text-white"
                data-bs-toggle="dropdown"
              >
                Courses
              </button>

              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/addCourse">
                    Add Course
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/home">
                    Update Course
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle btn btn-link text-white"
                data-bs-toggle="dropdown"
              >
                Videos
              </button>

              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/admin/videos">
                    Get All Videos
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/admin/videos">
                    Add Video
                  </Link>
                </li>
              </ul>
            </li>

             <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle btn btn-link text-white"
                data-bs-toggle="dropdown"
              >
               Students
              </button>

              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/getallstudent">
                    Get All students
                  </Link>
                </li>
              </ul>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavbarAdmin
