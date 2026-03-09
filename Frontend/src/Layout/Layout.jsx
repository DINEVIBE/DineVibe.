// Layout.jsx
import { Outlet, Navigate, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Search,
  Heart,
  Utensils,
  Calendar,
  TrendingUp,
  Users,
  ShieldCheck,
  Briefcase,
  Settings,
  LogOut,
  DollarSign,
  Ticket,
  Activity,
  Eye,
  ScrollText
} from "lucide-react";
import "../styles/dashboard.css";

export default function Layout() {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");
  const role = localStorage.getItem("role") || "user";
  const userEmail = localStorage.getItem("user_email") || "";
  const userName = localStorage.getItem("user_name") || "test";

  if (!token) return <Navigate to="/login" replace />;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // ✅ Role-Based Sidebar Configuration
  const menuConfigs = {
    user: [
      { path: "/home/dashboard", label: "Home", icon: LayoutDashboard },
      { path: "/home/user/discover", label: "Discover", icon: Search },
      { path: "/home/user/saved", label: "Saved", icon: Heart, badge: "4" },
      { path: "/home/user/preferences", label: "Preferences", icon: Settings }
    ],
    restaurant_owner: [
      { path: "/home/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { path: "/home/owner/menu", label: "Menu Management", icon: Utensils },
      { path: "/home/owner/reservations", label: "Reservations", icon: Calendar },
      { path: "/home/owner/analytics", label: "Analytics", icon: TrendingUp }
    ],

    // ✅ UPDATED: admin menu now includes Impersonate + Audit Trail
    admin: [
      { path: "/home/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { path: "/home/admin/users", label: "User Management", icon: Users },
      { path: "/home/admin/compliance", label: "Compliance", icon: ShieldCheck, badge: "5" },
      { path: "/home/admin/impersonate", label: "Impersonate", icon: Eye },
      { path: "/home/admin/audit", label: "Audit Trail", icon: ScrollText }
      // If you still need system settings, add it back:
      // { path: "/home/admin/settings", label: "System Settings", icon: Settings },
    ],

    creator: [
      { path: "/home/dashboard", label: "Portfolio", icon: LayoutDashboard },
      { path: "/home/creator/gigs", label: "Gig History", icon: Briefcase },
      { path: "/home/creator/engagement", label: "Engagement", icon: TrendingUp },
      { path: "/home/creator/revenue", label: "Revenue", icon: DollarSign },
      { path: "/home/creator/verification", label: "Verification", icon: ShieldCheck }
    ],

    // ✅ staff menu includes Tickets + Activity Logs
    staff: [
      { path: "/home/dashboard", label: "My Tasks", icon: Briefcase },
      { path: "/home/staff/schedule", label: "Shift Schedule", icon: Calendar },
      { path: "/home/staff/tickets", label: "Tickets", icon: Ticket, badge: "2" },
      { path: "/home/staff/activity", label: "Activity Logs", icon: Activity }
    ]
  };

  const currentMenu = menuConfigs[role] || menuConfigs.user;

  return (
    <div className="modern-layout">
      {/* ── SIDEBAR ── */}
      <aside className="modern-sidebar">
        <div className="sidebar-top-group">
          <div className="sidebar-logo-container">
            <div className="logo-brand-icon">D</div>
            <div className="logo-text-group">
              <h1 className="brand-name-sidebar">DineVibe</h1>
              <p className="role-badge-text">{role.replace("_", " ").toUpperCase()}</p>
            </div>
          </div>

          <nav className="sidebar-nav-links">
            {currentMenu.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) => `sidebar-nav-item ${isActive ? "active" : ""}`}
              >
                <item.icon size={20} className="nav-icon" />
                <span className="nav-label">{item.label}</span>
                {item.badge && <span className="nav-count-badge">{item.badge}</span>}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="sidebar-footer-group">
          <div className="user-profile-mini-card">
            <div className="avatar-circle-sm">{userName.charAt(0).toUpperCase()}</div>
            <div className="user-mini-meta">
              <p className="mini-user-name">{userName}</p>
              <p className="mini-user-email">{userEmail}</p>
            </div>
          </div>

          <button onClick={handleLogout} className="logout-sidebar-btn">
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      <main className="main-area">
        <div className="content-area">
          {userEmail === "test@dinevibe.com" && (
            <div className="simulation-banner">
              <div className="flex items-center gap-2">
                <div className="sim-indicator-dot"></div>
                <span>
                  Currently Simulating: <strong>{role.toUpperCase()}</strong>
                </span>
              </div>
              <button onClick={() => navigate("/select-role")} className="btn-switch-persona">
                Switch Persona
              </button>
            </div>
          )}

          <Outlet />
        </div>
      </main>
    </div>
  );
}