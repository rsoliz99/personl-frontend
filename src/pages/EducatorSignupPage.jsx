import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { parseSafeJSON } from "../utils/auth"; // Adjust if located elsewhere

const certificateFormats = {
  TX: /^\d{7}$/, // TEA ID - 7 digits
  CA: /^\d{7}$/, // California - 7 digits
  PA: /^\d{6}$/, // PPID - 6 digits
  // Add more as needed
};

export default function EducatorSignupPage() {
  const navigate = useNavigate();

  const [educator, setEducator] = useState(() =>
    parseSafeJSON(localStorage.getItem("educatorUser"), {
      name: "",
      email: "",
      certificate: "",
      lastDistrict: { name: "", state: "" },
    })
  );

  const [state, setState] = useState(() => educator.lastDistrict?.state || "");
  const [district, setDistrict] = useState(() => educator.lastDistrict?.name || "");
  const [allDistricts, setAllDistricts] = useState([]);
  const [uniqueStates, setUniqueStates] = useState([]);
  const [filteredDistricts, setFilteredDistricts] = useState([]);
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
      .catch((err) => {
        console.error("Error loading districts:", err);
      });
  }, []);

  useEffect(() => {
    const filtered = allDistricts.filter((d) => d.state === state);
    setFilteredDistricts(filtered);
  }, [state, allDistricts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEducator({ ...educator, [name]: value });
  };

  const handleLogout = () => {
    localStorage.removeItem("educatorUser");
    navigate("/educator/login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!educator.name || !educator.email || !educator.certificate || !state || !district) {
      setError("Please fill out all fields and select a district.");
      return;
    }

    const pattern = certificateFormats[state];
    if (pattern && !pattern.test(educator.certificate)) {
      setError(`Invalid certificate number format for ${state}.`);
      return;
    }

    const updatedEducator = {
      ...educator,
      lastDistrict: { name: district, state },
    };

    localStorage.setItem("educatorUser", JSON.stringify(updatedEducator));
    navigate("/educator/dashboard");
  };

  return (
    <main className="min-h-screen bg-white p-6">
      <div className="flex items-center justify-between mb-6">
        <img
          src="/personl-logo.png"
          alt="PersonL Logo"
          className="h-10 cursor-pointer"
          onClick={() => navigate("/")}
        />
        <button
          onClick={handleLogout}
          className="text-sm text-[#003594] font-semibold border border-[#003594] px-3 py-1 rounded hover:bg-[#003594] hover:text-white"
        >
          Logout
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white border p-6 rounded max-w-xl mx-auto space-y-4"
      >
        <h1 className="text-2xl font-bold text-[#003594] text-center">Educator Sign Up</h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 border border-red-300 rounded">
            {error}
          </div>
        )}

        <div>
          <label className="block font-semibold">Name:</label>
          <input
            type="text"
            name="name"
            value={educator.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Email:</label>
          <input
            type="email"
            name="email"
            value={educator.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">State:</label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">Select a state</option>
            {uniqueStates.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold">Certificate Number:</label>
          <input
            type="text"
            name="certificate"
            value={educator.certificate}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Most Recent District:</label>
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="w-full border p-2 rounded"
            disabled={!state}
          >
            <option value="">Select a district</option>
            {filteredDistricts.map((d, i) => (
              <option key={i} value={d.name}>{d.name}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-[#003594] text-white font-semibold py-2 rounded hover:bg-blue-800"
        >
          Create Account
        </button>
      </form>
    </main>
  );
}
