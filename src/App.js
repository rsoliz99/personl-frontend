// App.js – Routes for production and /demo split using DemoRoutes
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EducatorLoginPage from './pages/EducatorLoginPage';
import EducatorSignupPage from './pages/EducatorSignupPage';
import EducatorDashboard from './pages/EducatorDashboard';
import EducatorRequestPage from './pages/EducatorRequestPage';
import DistrictLoginPage from './pages/DistrictLoginPage';
import DistrictSignupPage from './pages/DistrictSignupPage';
import DistrictDashboard from './pages/DistrictDashboard';
import EducatorForgotPasswordPage from './pages/EducatorForgotPasswordPage';
import DistrictForgotPasswordPage from './pages/DistrictForgotPasswordPage';
import DemoRoutes from './DemoRoutes';

function AppRoutes() {
  const location = useLocation();

  return location.pathname.startsWith("/demo") ? (
    <DemoRoutes />
  ) : (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/educator/login" element={<EducatorLoginPage />} />
      <Route path="/educator/create" element={<EducatorSignupPage />} />
      <Route path="/educator/dashboard" element={<EducatorDashboard />} />
      <Route path="/educator/request" element={<EducatorRequestPage />} />
      <Route path="/district/login" element={<DistrictLoginPage />} />
      <Route path="/district/signup" element={<DistrictSignupPage />} />
      <Route path="/district/dashboard" element={<DistrictDashboard />} />
      <Route path="/educator/forgot-password" element={<EducatorForgotPasswordPage />} />
      <Route path="/district/forgot-password" element={<DistrictForgotPasswordPage />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
