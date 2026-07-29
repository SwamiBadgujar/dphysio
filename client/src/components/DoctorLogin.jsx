// client/src/components/DoctorLogin.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE from "../api";

export default function DoctorLogin({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Prefill saved credentials
  useEffect(() => {
    const savedEmail = localStorage.getItem("doctorEmail");
    const savedPassword = localStorage.getItem("doctorPassword");
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRemember(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Please enter both email and password");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(`${API_BASE}/doctor/login`, {
        email,
        password,
      });

      console.log("🔑 Login response:", res.data);

      if (res.data.token) {
        localStorage.setItem("doctorToken", res.data.token);
        setToken(res.data.token);

        if (remember) {
          localStorage.setItem("doctorEmail", email);
          localStorage.setItem("doctorPassword", password);
        } else {
          localStorage.removeItem("doctorEmail");
          localStorage.removeItem("doctorPassword");
        }

        // ✅ Navigate to the correct protected route
        navigate("/doctor");
      } else {
        setError("Login failed: no token received");
      }
    } catch (err) {
      console.error("❌ Login error:", err.response?.data || err.message);
      setError(err.response?.data?.error || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 pt-24">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Doctor Login</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-lg"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-2 px-4 py-2 border rounded-lg"
          required
        />

        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            id="remember"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="remember" className="text-sm text-gray-700">
            Remember Me
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white font-semibold ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 transition"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}