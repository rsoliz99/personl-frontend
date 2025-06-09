// EducatorForgotPasswordPage.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function EducatorForgotPasswordPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#003594] p-4">
      <header className="px-6 py-4">
        <Link to="/">
          <img src="/personl-logo.png" alt="PersonL Logo" className="h-10" />
        </Link>
      </header>
      <div className="flex justify-center">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
          <h1 className="text-3xl font-bold mb-6">Educator Password Recovery</h1>
          <p className="text-gray-700">
            Feature coming soon. Please contact your previous district to reset your password.
          </p>
        </div>
      </div>
    </main>
  );
}