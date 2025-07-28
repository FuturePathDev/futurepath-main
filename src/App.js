import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Public Pages
import SignInPage from "./pages/SignInPage";
import ConfirmPage from "./pages/ConfirmPage";
import ProfileUpdatePage from "./pages/ProfileUpdatePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";

// Student Components
import DashboardPage from "./pages/DashboardPage";
import StudentDashboard from "./StudentDashboard";

// Parent Components
import ParentDashboard from "./components/ParentDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import RequireAuth from "./components/RequireAuth";

// Admin Components
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminUsers from "./components/admin/AdminUsers";
import AdminAnalytics from "./components/admin/AdminAnalytics";

// Tools
import FafsaTracker from "./components/tools/FafsaTracker";
import ScholarshipSearch from "./components/tools/ScholarshipSearch";
import AcademicGoals from "./components/tools/AcademicGoals";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<SignInPage />} />
        <Route path="/confirm" element={<ConfirmPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/update-profile" element={<ProfileUpdatePage />} />

        {/* Student Routes */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />

        {/* Parent Routes */}
        <Route
          path="/parent-dashboard"
          element={
            <ProtectedRoute>
              <ParentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/parent"
          element={
            <RequireAuth>
              <ParentDashboard />
            </RequireAuth>
          }
        />

        {/* Admin Routes */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route
          path="/admin"
          element={
            <RequireAuth adminOnly={true}>
              <AdminDashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/users"
          element={
            <RequireAuth adminOnly={true}>
              <AdminUsers />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/analytics"
          element={
            <RequireAuth adminOnly={true}>
              <AdminAnalytics />
            </RequireAuth>
          }
        />

        {/* Tools */}
        <Route path="/tools/fafsa" element={<FafsaTracker />} />
        <Route path="/tools/scholarships" element={<ScholarshipSearch />} />
        <Route path="/tools/goals" element={<AcademicGoals />} />
      </Routes>
    </Router>
  );
}

export default App;
