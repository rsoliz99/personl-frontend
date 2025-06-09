import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { parseSafeJSON } from "../utils/auth";

export default function DistrictReviewPage() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [districtUser, setDistrictUser] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    const user = parseSafeJSON(localStorage.getItem("districtUser"), null);
    if (!user) {
      navigate("/district/login");
    } else {
      setDistrictUser(user);
      loadRequests(user.district);
    }
  }, [navigate]);

  const loadRequests = (district) => {
    const allKeys = Object.keys(localStorage);
    const districtRequests = [];

    allKeys.forEach((key) => {
      if (key.startsWith("requests_")) {
        const requests = parseSafeJSON(localStorage.getItem(key), []);
        const educator = parseSafeJSON(localStorage.getItem("educatorUser_" + key.replace("requests_", "")), null);
        requests.forEach((req, index) => {
          if (req.toDistrict === district) {
            districtRequests.push({
              ...req,
              email: key.replace("requests_", ""),
              requestIndex: index,
              certificate: educator?.certificate || "N/A",
              educatorName: educator?.name || "Unknown"
            });
          }
        });
      }
    });

    setRequests(districtRequests);
  };

  const updateRequestStatus = (email, index, newStatus) => {
    const key = "requests_" + email;
    const allRequests = parseSafeJSON(localStorage.getItem(key), []);
    if (!allRequests[index]) return;

    allRequests[index].status = newStatus;
    allRequests[index].updated = new Date().toISOString();
    localStorage.setItem(key, JSON.stringify(allRequests));
    loadRequests(districtUser.district);
  };

  const deleteRequest = (email, index) => {
    const key = "requests_" + email;
    const allRequests = parseSafeJSON(localStorage.getItem(key), []);
    if (!allRequests[index]) return;

    allRequests.splice(index, 1);
    localStorage.setItem(key, JSON.stringify(allRequests));
    loadRequests(districtUser.district);
  };

  const filteredRequests = filterStatus === "All" ? requests : requests.filter(r => r.status === filterStatus);

  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#003594] p-4">
      <header className="px-6 py-4 flex justify-between items-center">
        <Link to="/district/dashboard">
          <img src="/personl-logo.png" alt="PersonL Logo" className="h-10" />
        </Link>
        <button
          onClick={() => {
            localStorage.removeItem("districtUser");
            navigate("/district/login");
          }}
          className="text-sm text-[#003594] font-semibold border border-[#003594] px-3 py-1 rounded hover:bg-[#003594] hover:text-white"
        >
          Logout
        </button>
      </header>

      <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Review Transfer Requests</h1>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border px-2 py-1 rounded text-sm"
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Denied">Denied</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {filteredRequests.length === 0 ? (
          <p>No requests found for your district.</p>
        ) : (
          <table className="w-full table-auto border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Cert #</th>
                <th className="border px-4 py-2">From</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Updated</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((r, i) => (
                <tr key={i}>
                  <td className="border px-4 py-2">{r.educatorName}</td>
                  <td className="border px-4 py-2">{r.email}</td>
                  <td className="border px-4 py-2">{r.certificate}</td>
                  <td className="border px-4 py-2">{r.from}</td>
                  <td className="border px-4 py-2">{new Date(r.date).toLocaleDateString()}</td>
                  <td className="border px-4 py-2">{r.status}</td>
                  <td className="border px-4 py-2">{r.updated ? new Date(r.updated).toLocaleDateString() : "-"}</td>
                  <td className="border px-4 py-2 space-y-1 space-x-1">
                    <div className="flex flex-wrap gap-1">
                      <button
                        onClick={() => updateRequestStatus(r.email, r.requestIndex, "Approved")}
                        className="bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateRequestStatus(r.email, r.requestIndex, "Denied")}
                        className="bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700"
                      >
                        Deny
                      </button>
                      <button
                        onClick={() => updateRequestStatus(r.email, r.requestIndex, "Completed")}
                        className="bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700"
                      >
                        Complete
                      </button>
                      <button
                        onClick={() => deleteRequest(r.email, r.requestIndex)}
                        className="bg-gray-600 text-white px-2 py-1 rounded text-xs hover:bg-gray-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
