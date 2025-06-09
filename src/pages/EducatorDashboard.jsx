import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getLocalEducator } from "../utils/auth";

export default function EducatorDashboard() {
  const navigate = useNavigate();
  const [educator, setEducator] = useState(getLocalEducator());
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const allRequests = JSON.parse(localStorage.getItem("requests") || "[]");
    const outgoing = allRequests.filter(
      (req) => req.from?.name === educator?.name && req.from?.certificate === educator?.certificate
    );
    setRequests(outgoing);
  }, [educator?.name, educator?.certificate]);

  const handleLogout = () => {
    localStorage.removeItem("educatorUser");
    navigate("/educator/login");
  };

  const handleDelete = (index) => {
    const updatedRequests = [...requests];
    updatedRequests.splice(index, 1);
    const allRequests = JSON.parse(localStorage.getItem("requests") || "[]");
    const remainingRequests = allRequests.filter(
      (req) => !(req.from?.name === educator?.name && req.from?.certificate === educator?.certificate && req.to === requests[index].to && req.requestedAt === requests[index].requestedAt)
    );
    localStorage.setItem("requests", JSON.stringify(remainingRequests));
    setRequests(updatedRequests);
    setMessage("Request deleted successfully.");
  };

  return (
    <main className="min-h-screen bg-white p-6">
      <div className="flex items-center justify-between mb-6">
        <Link to="/">
          <img src="/personl-logo.png" alt="PersonL Logo" className="h-10" />
        </Link>
        <button
          onClick={handleLogout}
          className="text-sm text-[#003594] font-semibold border border-[#003594] px-3 py-1 rounded hover:bg-[#003594] hover:text-white"
        >
          Logout
        </button>
      </div>

      <h1 className="text-3xl font-bold text-[#003594] mb-6 text-center">Educator Dashboard</h1>

      <section className="bg-white border p-6 rounded mb-6 max-w-3xl mx-auto">
        <h2 className="text-xl font-bold text-[#003594] mb-4">Educator Info</h2>
        <p><strong>Name:</strong> {educator?.name || "N/A"}</p>
        <p><strong>Email:</strong> {educator?.email || "N/A"}</p>
        <p><strong>Certificate:</strong> {educator?.certificate || "N/A"}</p>
        <p>
          <strong>Most Recent District:</strong>{" "}
          {educator?.lastDistrict?.name || "N/A"}, {educator?.lastDistrict?.state || ""}
        </p>
      </section>

      <div className="max-w-3xl mx-auto mb-4 text-right">
        <button
          onClick={() => navigate("/educator/request")}
          className="bg-[#003594] text-white font-semibold py-2 px-4 rounded hover:bg-blue-800"
        >
          Submit New Request
        </button>
      </div>

      <section className="bg-white border p-6 rounded max-w-3xl mx-auto">
        <h2 className="text-xl font-bold text-[#003594] mb-4">Your Requests</h2>

        {message && (
          <div className="mb-4 p-2 bg-green-100 border border-green-300 text-green-800 rounded">
            {message}
          </div>
        )}

        {requests.length === 0 ? (
          <p className="text-gray-500">No file transfer requests submitted yet.</p>
        ) : (
          requests.map((req, idx) => (
            <div key={idx} className="mb-4 border rounded p-4">
              <p><strong>From:</strong> {req.from?.name || "Unknown"}</p>
              <p><strong>To:</strong> {req.to || "Unknown"}</p>
              <p><strong>Requested At:</strong> {req.requestedAt}</p>
              <p><strong>Status:</strong> {req.status}</p>
              <button
                onClick={() => handleDelete(idx)}
                className="mt-2 text-red-600 hover:underline text-sm"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </section>
    </main>
  );
}
