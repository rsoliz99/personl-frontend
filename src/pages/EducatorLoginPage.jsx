// EducatorLoginPage.jsx – Now supports login with localStorage credentials and SandboxBanner
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import SandboxBanner from "../components/SandboxBanner";

const isSandbox =
  window.location.pathname.startsWith("/demo") ||
  !window.location.hostname.includes("getpersonl.com");

export default function EducatorLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const storedUser = JSON.parse(localStorage.getItem("educatorUser"));

      if (
        storedUser &&
        storedUser.email === email &&
        storedUser.password === password
      ) {
        navigate("/educator/dashboard");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#003594] p-4">
      {isSandbox && <SandboxBanner />}
      <header className="px-6 py-4">
        <Link to="/">
          <img src="/personl-logo.png" alt="PersonL Logo" className="h-10" />
        </Link>
      </header>
      <div className="flex justify-center">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
          <h1 className="text-3xl font-bold mb-6">Educator Login</h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded px-4 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded px-4 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-[#003594] text-white font-semibold py-2 rounded"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <div className="mt-4 text-sm text-gray-600">
            <Link to="/educator/forgot-password" className="text-blue-600 hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            Don't have an account? {" "}
            <Link to="/educator/signup" className="text-blue-600 hover:underline">
              Create one
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
