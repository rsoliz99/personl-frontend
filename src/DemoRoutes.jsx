// DemoRoutes.jsx – Defines routes for sandbox environment
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EducatorLoginPage from "./pages/EducatorLoginPage";
import EducatorSignupPage from "./pages/EducatorSignupPage";
import EducatorDashboard from "./pages/EducatorDashboard";
import EducatorRequestPage from "./pages/EducatorRequestPage";
import DistrictLoginPage from "./pages/DistrictLoginPage";
import DistrictSignupPage from "./pages/DistrictSignupPage";
import DistrictDashboard from "./pages/DistrictDashboard";
import EducatorForgotPasswordPage from "./pages/EducatorForgotPasswordPage";
import DistrictForgotPasswordPage from "./pages/DistrictForgotPasswordPage";

export default function DemoRoutes() {
  return (
    <Routes>
      <Route path="/demo" element={<HomePage />} />
      <Route path="/demo/educator/login" element={<EducatorLoginPage />} />
      <Route path="/demo/educator/create" element={<EducatorSignupPage />} />
      <Route path="/demo/educator/dashboard" element={<EducatorDashboard />} />
      <Route path="/demo/educator/request" element={<EducatorRequestPage />} />
      <Route path="/demo/district/login" element={<DistrictLoginPage />} />
      <Route path="/demo/district/signup" element={<DistrictSignupPage />} />
      <Route path="/demo/district/dashboard" element={<DistrictDashboard />} />
      <Route path="/demo/educator/forgot-password" element={<EducatorForgotPasswordPage />} />
      <Route path="/demo/district/forgot-password" element={<DistrictForgotPasswordPage />} />
    </Routes>
  );
}
