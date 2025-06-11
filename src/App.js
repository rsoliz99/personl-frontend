// App.js – Includes /demo redirect to homepage
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EducatorLoginPage from "./pages/EducatorLoginPage";
import EducatorSignupPage from "./pages/EducatorSignupPage";
import EducatorDashboard from "./pages/EducatorDashboard";
import DistrictLoginPage from "./pages/DistrictLoginPage";
import DistrictSignupPage from "./pages/DistrictSignupPage";
import DistrictDashboard from "./pages/DistrictDashboard";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect /demo to homepage */}
        <Route path="/demo" element={<Navigate to="/" />} />

        {/* Core routes */}
        <Route path="/" element={<HomePage />} />

        {/* Educator Routes */}
        <Route path="/educator/login" element={<EducatorLoginPage />} />
        <Route path="/educator/signup" element={<EducatorSignupPage />} />
        <Route path="/educator/dashboard" element={<EducatorDashboard />} />

        {/* District Routes */}
        <Route path="/district/login" element={<DistrictLoginPage />} />
        <Route path="/district/signup" element={<DistrictSignupPage />} />
        <Route path="/district/dashboard" element={<DistrictDashboard />} />

        {/* Catch-all */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}
