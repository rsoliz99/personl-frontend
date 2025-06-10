// EducatorSignupPage.jsx – Sandbox Demo Mode with Pre-Fill and Single Password Fields
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import SandboxBanner from "../components/SandboxBanner";

export default function EducatorSignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [allDistricts, setAllDistricts] = useState([]);
  const [uniqueStates, setUniqueStates] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/districts.json")
      .then((res) => res.json())
      .then((data) => {
        const entries = Object.entries(data);
        const flattened = entries.flatMap(([state, districts]) =>
          districts.map((name) => ({ name, state }))
        );
        setAllDistricts(flattened);
        setUniqueStates(entries.map(([state]) => state));
      })
      .catch((err) => console.error("Error loading districts:", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !state || !district) {
      setError("All fields are required.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const newEducatorUser = { name, email, password, district, state };
    localStorage.setItem("educatorUser", JSON.stringify(newEducatorUser));
    navigate("/educator/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("districtUser");
    navigate("/");
  };

  const filteredDistricts = allDistricts.filter((d) => d.state === state);

  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#003594] p-4">
      <SandboxBanner />
      <header className="px-6 py-4 flex justify-between items-center">
        <Link to="/">
          <img src="/personl-logo.png" alt="PersonL Logo" className="h-10" />
        </Link>
        <button
          onClick={handleLogout}
          className="text-sm text-[#003594] font-semibold border border-[#003594] px-3 py-1 rounded hover:bg-[#003594] hover:text-white"
        >
          Logout
        </button>
      </header>
      <div className="flex justify-center">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
          <h1 className="text-3xl font-bold mb-6">Educator Sign Up</h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <button
              type="button"
              onClick={() => {
                setName("Demo Teacher");
                setEmail("demo@demo.com");
                setPassword("password123");
                setConfirmPassword("password123");
                setState("TX");
                setDistrict("Seminole ISD");
              }}
              className="w-full bg-gray-200 text-sm text-[#003594] py-1 rounded hover:bg-gray-300"
            >
              Fill With Demo Credentials
            </button>

            <input
              type="text"
              placeholder="Full Name"
              className="w-full border border-gray-300 rounded px-4 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded px-4 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Create Password"
              className="w-full border border-gray-300 rounded px-4 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full border border-gray-300 rounded px-4 py-2"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2"
            >
              <option value="">Select a state</option>
              {uniqueStates.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              disabled={!state}
              className="w-full border border-gray-300 rounded px-4 py-2"
            >
              <option value="">Select a district</option>
              {filteredDistricts.map((d, i) => (
                <option key={i} value={d.name}>{d.name}</option>
              ))}
            </select>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-[#003594] text-white font-semibold py-2 rounded"
            >
              Sign Up
            </button>
          </form>
          <div className="mt-4 text-sm text-gray-600">
            Already have an account? {" "}
            <Link to="/educator/login" className="text-blue-600 hover:underline">
              Log in here
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
