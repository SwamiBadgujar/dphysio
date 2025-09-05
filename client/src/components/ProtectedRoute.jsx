// client/src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  // Check token in localStorage
  const token = localStorage.getItem("doctorToken");

  if (!token) {
    return <Navigate to="/doctor/login" replace />;
  }

  return children;
}