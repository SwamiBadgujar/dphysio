import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // for redirect
import axios from "axios";

export default function DoctorLogin({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false); // ✅ remember me state
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // On mount, check if credentials are saved
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

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5002/api/doctor/login", {
        email,
        password,
      });

      if (res.data.token) {
        // Save token in localStorage
        localStorage.setItem("doctorToken", res.data.token);
        setToken(res.data.token);

        // ✅ Save credentials if remember is checked
        if (remember) {
          localStorage.setItem("doctorEmail", email);
          localStorage.setItem("doctorPassword", password);
        } else {
          localStorage.removeItem("doctorEmail");
          localStorage.removeItem("doctorPassword");
        }

        // Redirect to doctor dashboard
        navigate("/doctor");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.error || "Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
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
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}