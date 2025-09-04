import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("doctorToken");

  if (!token) {
    return <Navigate to="/doctor/login" replace />;
  }

  return children;
}