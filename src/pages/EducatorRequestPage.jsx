import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLocalEducator } from "../utils/auth";

export default function EducatorRequestPage() {
  const navigate = useNavigate();
  const educator = getLocalEducator();

  const [state, setState] = useState(educator?.lastDistrict?.state || "");
  const [district, setDistrict] = useState("");
  const [allDistricts, setAllDistricts] = useState([]);
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetch("/districts.json")
      .then((res) => res.json())
      .then((data) => {
        const entries = Object.entries(data);
        const flattened = entries.flatMap(([state, districts]) =>
          districts.map((name) => ({ name, state }))
        );
        setAllDistricts(flattened);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading districts:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = allDistricts.filter((d) => d.state === state);
    setFilteredDistricts(filtered);
  }, [state, allDistricts]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!state || !district) {
      setError("Please select both a state and a district.");
      return;
    }

    const allRequests = JSON.parse(localStorage.getItem("requests") || "[]");
    const newRequest = {
      from: {
        name: educator.name,
        email: educator.email,
        certificate: educator.certificate,
        district: educator.lastDistrict?.name,
        state: educator.lastDistrict?.state,
      },
      to: district,
      toState: state,
      requestedAt: new Date().toISOString(),
      status: "Pending",
    };

    allRequests.push(newRequest);
    localStorage.setItem("requests", JSON.stringify(allRequests));
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
          onClick={() => {
            localStorage.removeItem("educatorUser");
            navigate("/educator/login");
          }}
          className="text-sm text-[#003594] font-semibold border border-[#003594] px-3 py-1 rounded hover:bg-[#003594] hover:text-white"
        >
          Logout
        </button>
      </div>

      <div className="max-w-xl mx-auto bg-white border rounded p-6">
        <h1 className="text-2xl font-bold text-[#003594] mb-6 text-center">
          Submit File Transfer Request
        </h1>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 border border-red-300 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold">To State:</label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full border p-2 rounded"
              disabled={loading}
            >
              <option value="">Select a state</option>
              {[...new Set(allDistricts.map((d) => d.state))].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold">To District:</label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full border p-2 rounded"
              disabled={!state || loading}
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
            Submit Request
          </button>
        </form>
      </div>
    </main>
  );
}
