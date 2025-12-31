import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = sessionStorage.getItem("name");
    const storedRole = sessionStorage.getItem("role");

    if (storedName) setName(storedName);
    if (storedRole) setRole(storedRole);
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">

        {/* LEFT SIDE */}
        <Link className="navbar-brand" to="/">
          Student Portal
        </Link>

        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to="/home">Home</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/about">About</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/mycourses">My Courses</Link>
          </li>
        </ul>

        {/* RIGHT SIDE */}
        <ul className="navbar-nav ms-auto">
          <li className="nav-item dropdown">
            <button
              className="nav-link dropdown-toggle btn btn-link text-white"
              data-bs-toggle="dropdown"
            >
              {role ? role : "Account"}
            </button>

            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <span className="dropdown-item-text">
                  {name ? `Hi, ${name}` : "Welcome"}
                </span>
              </li>
              <li><hr className="dropdown-divider" /></li>

              <li>
                <Link className="dropdown-item" to="/updateprofile">
                  Update Profile
                </Link>
              </li>

              <li>
                <Link className="dropdown-item" to="/changepassword">
                  Change Password
                </Link>
              </li>

              <li>
                <button className="dropdown-item" onClick={handleLogout}>
                  Log Out
                </button>
              </li>
            </ul>
          </li>
        </ul>

      </div>
    </nav>
  );
}

export default Navbar;
