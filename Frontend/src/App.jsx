import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

// ── Layout & Core ──────────────────────────────────────────────────────────
import Layout from "./Layout/Layout";
import Login from "./pages/Login";
import MFA from "./pages/MFA";
import InfluencerLogin from "./pages/InfluencerLogin";
import SetPassword from "./pages/SetPassword";
import RoleSelection from "./pages/RoleSelection";
import Settings from "./pages/Settings";

// ── Role Dashboards ──────────────────────────────────────────────────────────
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import RestaurantOwnerDashboard from "./pages/RestaurantOwnerDashboard";
import CreatorDashboard from "./pages/CreatorDashboard";

// ✅ Staff pages (named exports from StaffDashboard.jsx)
import StaffDashboard, {
  StaffSchedule,
  StaffTickets,
  StaffActivityLogs
} from "./pages/StaffDashboard";

// ── Pages ───────────────────────────────────────────────────────────────────
import RestaurantDetail from "./pages/RestaurantDetail";
import MenuManagement from "./pages/MenuManagement";
import Analytics from "./pages/Analytics";
import Reservations from "./pages/Reservations";

import "./styles/main.css";

function App() {
  const getToken = () => localStorage.getItem("access_token");

  const getRole = () => {
    const role = localStorage.getItem("role");
    return role ? role.toLowerCase().trim() : null;
  };

  const getUser = () => ({
    username: localStorage.getItem("user_name") || "Admin User",
    email: localStorage.getItem("user_email") || "test@dinevibe.com",
    role: getRole() || "admin"
  });

  // ── Protection Logic ──
  const ProtectedRoute = ({ children }) => {
    if (!getToken()) return <Navigate to="/login" replace />;
    return children;
  };

  const RoleProtectedRoute = ({ children, allowedRoles }) => {
    const token = getToken();
    const role = getRole();
    if (!token || !role) return <Navigate to="/login" replace />;
    const normalizedAllowed = allowedRoles.map((r) => r.toLowerCase());
    if (!normalizedAllowed.includes(role)) {
      return <Navigate to="/home/dashboard" replace />;
    }
    return children;
  };

  // ── Dynamic Root Switcher ──
  const RoleDashboard = () => {
    const role = getRole();
    const user = getUser();
    switch (role) {
      case "admin":
        return <AdminDashboard user={user} activeTab="overview" />;
      case "restaurant_owner":
        return <RestaurantOwnerDashboard user={user} activeTab="overview" />;
      case "creator":
        return <CreatorDashboard user={user} activeTab="portfolio" />;
      case "staff":
        return <StaffDashboard />;
      case "user":
      case "normal_user":
        return <UserDashboard user={user} activeTab="home" />;
      default:
        return <Navigate to="/login" replace />;
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={getToken() ? <Navigate to="/home/dashboard" replace /> : <Navigate to="/login" replace />}
        />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/mfa" element={<MFA />} />
        <Route path="/set-password" element={<SetPassword />} />
        <Route path="/influencer-login" element={<InfluencerLogin />} />
        <Route
          path="/select-role"
          element={
            <ProtectedRoute>
              <RoleSelection />
            </ProtectedRoute>
          }
        />

        {/* Protected Dashboard Layout */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<RoleDashboard />} />

          {/* ── ADMIN ROUTES ── */}
          <Route
            path="admin/users"
            element={
              <RoleProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard user={getUser()} activeTab="users" />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="admin/compliance"
            element={
              <RoleProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard user={getUser()} activeTab="compliance" />
              </RoleProtectedRoute>
            }
          />

          {/* ✅ ADDED: Regions / Impersonate / Audit Trail routes (to match sidebar) */}
          <Route
            path="admin/regions"
            element={
              <RoleProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard user={getUser()} activeTab="regions" />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="admin/impersonate"
            element={
              <RoleProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard user={getUser()} activeTab="impersonate" />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="admin/audit"
            element={
              <RoleProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard user={getUser()} activeTab="audit" />
              </RoleProtectedRoute>
            }
          />

          {/* ── USER ROUTES ── */}
          <Route
            path="user/saved"
            element={
              <RoleProtectedRoute allowedRoles={["user", "normal_user"]}>
                <UserDashboard user={getUser()} activeTab="saved" />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="user/preferences"
            element={
              <RoleProtectedRoute allowedRoles={["user", "normal_user"]}>
                <UserDashboard user={getUser()} activeTab="preferences" />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="user/discover"
            element={
              <RoleProtectedRoute allowedRoles={["user", "normal_user"]}>
                <UserDashboard user={getUser()} activeTab="home" />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="restaurant/:id"
            element={
              <RoleProtectedRoute allowedRoles={["user", "normal_user", "admin"]}>
                <RestaurantDetail />
              </RoleProtectedRoute>
            }
          />

          {/* ── RESTAURANT OWNER ROUTES ── */}
          <Route
            path="owner/menu"
            element={
              <RoleProtectedRoute allowedRoles={["restaurant_owner"]}>
                <MenuManagement />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="owner/reservations"
            element={
              <RoleProtectedRoute allowedRoles={["restaurant_owner"]}>
                <Reservations />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="owner/analytics"
            element={
              <RoleProtectedRoute allowedRoles={["restaurant_owner"]}>
                <Analytics />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="owner/reviews"
            element={
              <RoleProtectedRoute allowedRoles={["restaurant_owner"]}>
                <RestaurantOwnerDashboard user={getUser()} activeTab="reviews" />
              </RoleProtectedRoute>
            }
          />

          {/* ── CREATOR ROUTES ── */}
          <Route
            path="creator/gigs"
            element={
              <RoleProtectedRoute allowedRoles={["creator"]}>
                <CreatorDashboard user={getUser()} activeTab="gigs" />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="creator/engagement"
            element={
              <RoleProtectedRoute allowedRoles={["creator"]}>
                <CreatorDashboard user={getUser()} activeTab="engagement" />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="creator/revenue"
            element={
              <RoleProtectedRoute allowedRoles={["creator"]}>
                <CreatorDashboard user={getUser()} activeTab="revenue" />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="creator/verification"
            element={
              <RoleProtectedRoute allowedRoles={["creator"]}>
                <CreatorDashboard user={getUser()} activeTab="verification" />
              </RoleProtectedRoute>
            }
          />

          {/* ── STAFF ROUTES ── */}
          <Route
            path="staff"
            element={
              <RoleProtectedRoute allowedRoles={["staff"]}>
                <Navigate to="/home/dashboard" replace />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="staff/schedule"
            element={
              <RoleProtectedRoute allowedRoles={["staff"]}>
                <StaffSchedule />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="staff/tickets"
            element={
              <RoleProtectedRoute allowedRoles={["staff"]}>
                <StaffTickets />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="staff/activity"
            element={
              <RoleProtectedRoute allowedRoles={["staff"]}>
                <StaffActivityLogs />
              </RoleProtectedRoute>
            }
          />

          {/* Common */}
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
