import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLocalDistrict } from "../utils/auth";

export default function DistrictRequestsPage() {
  const navigate = useNavigate();
  const district = getLocalDistrict();
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const allRequests = JSON.parse(localStorage.getItem("requests") || "[]");
    const incoming = allRequests.filter(
      (req) => req.to === district?.name && req.toState === district?.state
    );
    setRequests(incoming);
  }, [district?.name, district?.state]);

  const updateStatus = (index, newStatus) => {
    const updated = [...requests];
    updated[index].status = newStatus;
    setRequests(updated);

    const allRequests = JSON.parse(localStorage.getItem("requests") || "[]");
    const updatedAll = allRequests.map((r) => {
      if (
        r.from?.name === requests[index].from?.name &&
        r.from?.email === requests[index].from?.email &&
        r.to === requests[index].to &&
        r.toState === requests[index].toState &&
        r.requestedAt === requests[index].requestedAt
      ) {
        return { ...r, status: newStatus };
      }
      return r;
    });
    localStorage.setItem("requests", JSON.stringify(updatedAll));
    setMessage(`Request ${newStatus.toLowerCase()} successfully.`);
  };

  const handleLogout = () => {
    localStorage.removeItem("districtUser");
    navigate("/district/login");
  };

  const copyEmail = (email) => {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
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

      <h1 className="text-3xl font-bold text-[#003594] mb-6 text-center">
        Incoming Transfer Requests
      </h1>

      {message && (
        <div className="max-w-4xl mx-auto mb-4 bg-green-100 border border-green-300 text-green-800 p-2 rounded">
          {message}
        </div>
      )}

      {copied && (
        <div className="max-w-4xl mx-auto mb-4 bg-blue-100 border border-blue-300 text-blue-800 p-2 rounded text-center">
          Email copied to clipboard.
        </div>
      )}

      <div className="max-w-4xl mx-auto space-y-4">
        {requests.length === 0 ? (
          <p className="text-gray-500">No incoming requests.</p>
        ) : (
          requests.map((req, idx) => (
            <div key={idx} className="border rounded p-4">
              <p>
                <strong>Educator:</strong> {req.from?.name} ({req.from?.email})
                <button
                  onClick={() => copyEmail(req.from?.email)}
                  className="ml-2 text-sm text-blue-600 hover:underline"
                >
                  Copy Email
                </button>
              </p>
              <p>
                <strong>From District:</strong> {req.from?.district}, {req.from?.state}
              </p>
              <p>
                <strong>Submitted:</strong> {new Date(req.requestedAt).toLocaleDateString()}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span className="text-yellow-600">{req.status}</span>
              </p>
              <div className="mt-2 space-x-2">
                <button
                  onClick={() => updateStatus(idx, "Approved")}
                  className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  Approve
                </button>
                <button
                  onClick={() => updateStatus(idx, "Denied")}
                  className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Deny
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
