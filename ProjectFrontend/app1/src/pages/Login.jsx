import React, { useContext, useState } from "react";
import Navbar from "../component/Navbar";
import { useNavigate } from "react-router";
import { loginUser } from "../services/studentServices";
import { toast } from "react-toastify";
import { Link } from "react-router";
import { loginContext } from "../App";

export default function Login() {
  const [email, setEmail] = useState("");
  const [passward, setPassword] = useState("");
  const navigate = useNavigate();

  const { loginStatus, setloginStatus } = useContext(loginContext);

  const signin = async (event) => {
    console.log("signin button clicked");
    console.log(email);
    console.log(passward);
    if (email === "") {
      toast.warn("Enter email");
    } else if (passward === "") {
      toast.warn("Enter passward");
    } else {
      const result = await loginUser(email, passward);
      console.log(result);
      if (result.status === "success") {
        toast.success("Successfully login :)");
        sessionStorage.setItem("token", result.data.token);
        sessionStorage.setItem("role", result.data.role); // ADD THIS
        setloginStatus(true);
        navigate("/home");
      } else {
        toast.error(result.error);
      }
    }
  };

  return (
    <div className="container w-50">
      <div className=" mt-3 mb-3">
        <label htmlFor="inputEmail" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="inputEmail"
          placeholder="Enter email"
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="inputPassword" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="inputPassword"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <button className="btn btn-success" onClick={signin}>
          Signin
        </button>
      </div>

      <div>
        Don't have an account? then to register{" "}
        <Link to="/register">Click Here</Link>
      </div>
    </div>
  );
}
