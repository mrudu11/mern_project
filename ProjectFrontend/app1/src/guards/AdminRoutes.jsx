import { Navigate } from "react-router";

export default function AdminRoute({ children }) {
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");

  if (!token) {
    return <Navigate to="/" />; // not logged in
  }

  if (role !== "admin") {
    return <Navigate to="/home" />; // student logged in
  }

  return children; // admin allowed
}
