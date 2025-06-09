import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function ChangePasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !currentPassword || !newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    const userType = email.endsWith("@district.com") ? "districtUser" : "educatorUser";
    const storedUser = JSON.parse(localStorage.getItem(userType));

    if (!storedUser || storedUser.email !== email || storedUser.password !== currentPassword) {
      setError("Invalid credentials.");
      return;
    }

    const updatedUser = { ...storedUser, password: newPassword };
    localStorage.setItem(userType, JSON.stringify(updatedUser));
    setSuccess("Password successfully updated!");
    setTimeout(() => {
      navigate(userType === "districtUser" ? "/district/dashboard" : "/educator/dashboard");
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#003594] p-4">
      <header className="px-6 py-4 flex justify-between items-center">
        <Link to="/">
          <img src="/personl-logo.png" alt="PersonL Logo" className="h-10" />
        </Link>
        <button
          onClick={() => navigate(email.endsWith("@district.com") ? "/district/login" : "/educator/login")}
          className="text-sm text-[#003594] font-semibold border border-[#003594] px-3 py-1 rounded hover:bg-[#003594] hover:text-white"
        >
          Logout
        </button>
      </header>
      <div className="flex justify-center">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
          <h1 className="text-2xl font-bold mb-6">Change Password</h1>
          {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
          {success && <p className="text-green-600 text-sm mb-2">{success}</p>}
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
              placeholder="Current Password"
              className="w-full border border-gray-300 rounded px-4 py-2"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="New Password"
              className="w-full border border-gray-300 rounded px-4 py-2"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              className="w-full border border-gray-300 rounded px-4 py-2"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="submit"
              className="w-full bg-[#003594] text-white font-semibold py-2 rounded"
            >
              Update Password
            </button>
          </form>
          <div className="mt-4 text-sm text-gray-600">
            <Link
              to={email.endsWith("@district.com") ? "/district/login" : "/educator/login"}
              className="text-blue-600 hover:underline"
            >
              Back to Login
            </Link>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            <Link
              to="/"
              className="text-blue-600 hover:underline"
            >
              Return to Homepage
            </Link>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            <Link
              to="/educator/request"
              className="text-blue-600 hover:underline"
            >
              Go to Transfer Request Page
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
