// App.js – Includes sandbox routing support for /demo/* via DemoRoutes
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EducatorLoginPage from "./pages/EducatorLoginPage";
import EducatorSignupPage from "./pages/EducatorSignupPage";
import EducatorDashboard from "./pages/EducatorDashboard";
import DistrictLoginPage from "./pages/DistrictLoginPage";
import DistrictSignupPage from "./pages/DistrictSignupPage";
import DistrictDashboard from "./pages/DistrictDashboard";
import NotFoundPage from "./pages/NotFoundPage";
import DemoRoutes from "./DemoRoutes";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Sandbox routes */}
        <Route path="/demo/*" element={<DemoRoutes />} />

        {/* Main site routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/educator/login" element={<EducatorLoginPage />} />
        <Route path="/educator/signup" element={<EducatorSignupPage />} />
        <Route path="/educator/dashboard" element={<EducatorDashboard />} />
        <Route path="/district/login" element={<DistrictLoginPage />} />
        <Route path="/district/signup" element={<DistrictSignupPage />} />
        <Route path="/district/dashboard" element={<DistrictDashboard />} />

        {/* Catch-all */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}
