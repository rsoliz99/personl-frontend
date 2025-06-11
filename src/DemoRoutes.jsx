// DemoRoutes.jsx – Handles all /demo/* routes including homepage
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EducatorLoginPage from "./pages/EducatorLoginPage";
import EducatorSignupPage from "./pages/EducatorSignupPage";
import EducatorDashboard from "./pages/EducatorDashboard";
import DistrictLoginPage from "./pages/DistrictLoginPage";
import DistrictSignupPage from "./pages/DistrictSignupPage";
import DistrictDashboard from "./pages/DistrictDashboard";
import NotFoundPage from "./pages/NotFoundPage";

export default function DemoRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} /> {/* Handles /demo */}
      <Route path="/educator/login" element={<EducatorLoginPage />} />
      <Route path="/educator/signup" element={<EducatorSignupPage />} />
      <Route path="/educator/dashboard" element={<EducatorDashboard />} />
      <Route path="/district/login" element={<DistrictLoginPage />} />
      <Route path="/district/signup" element={<DistrictSignupPage />} />
      <Route path="/district/dashboard" element={<DistrictDashboard />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
