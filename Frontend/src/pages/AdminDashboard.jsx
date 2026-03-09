// pages/AdminDashboard.jsx
import { useMemo, useState } from "react";
import {
  Users,
  ShieldAlert,
  Globe,
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Search,
  Ban,
  RotateCcw,
  ChevronRight,
  TrendingUp,
  Activity
} from "lucide-react";

/* =========================
   Mock Data (same as yours)
========================= */
const userList = [
  { id: 1, name: "Alice Moreno", email: "alice@test.com", role: "user", trust: 92, status: "active", joined: "Jan 12, 2025" },
  { id: 2, name: "Bob Tanaka", email: "bob@tanaka.com", role: "restaurant_owner", trust: 88, status: "active", joined: "Feb 3, 2025" },
  { id: 3, name: "Clara Singh", email: "clara@creator.io", role: "creator", trust: 74, status: "suspended", joined: "Mar 17, 2025" },
  { id: 4, name: "Dev Patel", email: "dev@staff.net", role: "staff", trust: 65, status: "flagged", joined: "Apr 5, 2025" },
  { id: 5, name: "Eva Schneider", email: "eva@bistro.fr", role: "restaurant_owner", trust: 95, status: "active", joined: "Jan 28, 2025" }
];

const complianceItems = [
  { id: 1, type: "ID Verification", user: "Clara Singh", status: "pending", risk: "medium", time: "2h ago" },
  { id: 2, type: "User Report", user: "Dev Patel", status: "pending", risk: "high", time: "5h ago" },
  { id: 3, type: "Business License", user: "New Restaurant", status: "review", risk: "low", time: "1d ago" },
  { id: 4, type: "Content Violation", user: "Unknown User", status: "resolved", risk: "high", time: "2d ago" },
  { id: 5, type: "Age Verification", user: "New Creator", status: "pending", risk: "medium", time: "3h ago" }
];

const auditLog = [
  { id: 1, admin: "You", action: "Suspended user clara@creator.io", time: "1h ago", type: "warn" },
  { id: 2, admin: "You", action: "Approved business license #BL-091", time: "3h ago", type: "success" },
  { id: 3, admin: "System", action: "Auto-flagged trust score < 70", time: "5h ago", type: "info" },
  { id: 4, admin: "You", action: "Rolled back profile v3 → v2 for user #12", time: "1d ago", type: "info" },
  { id: 5, admin: "System", action: 'New region "Southeast Asia" added', time: "2d ago", type: "success" }
];


/* =========================
   Shared Styles / Helpers
========================= */
const pageTitle = {
  margin: 0,
  fontSize: 28,
  fontWeight: 900,
  color: "#0f172a",
  letterSpacing: "-0.02em"
};

const pageSubtitle = {
  marginTop: 6,
  fontSize: 14,
  fontWeight: 700,
  color: "#94a3b8"
};

const cardStyle = {
  background: "#fff",
  border: "1px solid #eef2f7",
  borderRadius: 20,
  boxShadow: "0 2px 0 rgba(15,23,42,0.03)"
};

const tableHeaderCell = {
  padding: "14px 18px",
  fontSize: 12,
  fontWeight: 900,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: "#94a3b8",
  textAlign: "left"
};

function roleLabel(role) {
  return String(role || "").replaceAll("_", " ");
}

function rolePillStyle() {
  return {
    display: "inline-flex",
    alignItems: "center",
    padding: "4px 10px",
    borderRadius: 999,
    background: "#f1f5f9",
    color: "#475569",
    fontSize: 12,
    fontWeight: 900,
    textTransform: "lowercase"
  };
}

function trustBarColor(trust) {
  // Matches screenshot: 92/88/95 green, 74/65 yellow (not red)
  return trust >= 80 ? "#00c853" : "#f4b400";
}

function statusPill(status) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "4px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 900,
    textTransform: "lowercase"
  };

  if (status === "active") return { ...base, background: "#dcfce7", color: "#16a34a" };
  if (status === "suspended") return { ...base, background: "#fee2e2", color: "#ef4444" };
  return { ...base, background: "#fef3c7", color: "#b45309" }; // flagged
}

function complianceStatusChip(status) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "4px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 900,
    textTransform: "lowercase"
  };

  if (status === "resolved") return { ...base, background: "#dcfce7", color: "#16a34a" };
  if (status === "pending") return { ...base, background: "#fef3c7", color: "#b45309" };
  return { ...base, background: "#dbeafe", color: "#2563eb" }; // review
}

function riskColors(risk) {
  if (risk === "high") return { bg: "#fee2e2", fg: "#ef4444" };
  if (risk === "medium") return { bg: "#fef3c7", fg: "#d97706" };
  return { bg: "#dcfce7", fg: "#16a34a" };
}

function auditDot(type) {
  if (type === "success") return "#22c55e";
  if (type === "warn") return "#ef4444";
  return "#60a5fa";
}

function statIconColors(color) {
  switch (color) {
    case "blue":
      return { bg: "#dbeafe", fg: "#3b82f6" };
    case "red":
      return { bg: "#fee2e2", fg: "#ef4444" };
    case "green":
      return { bg: "#dcfce7", fg: "#22c55e" };
    default:
      return { bg: "#ede9fe", fg: "#8b5cf6" }; // purple
  }
}

function ActionIconButton({ title, tone, children }) {
  const tones = {
    blue: { bg: "#eff6ff", fg: "#2563eb" },
    red: { bg: "#fee2e2", fg: "#ef4444" },
    green: { bg: "#dcfce7", fg: "#16a34a" }
  };
  const t = tones[tone] || tones.blue;

  return (
    <button
      title={title}
      style={{
        width: 34,
        height: 34,
        borderRadius: 10,
        border: "none",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: t.bg,
        color: t.fg
      }}
      onClick={() => {}}
      type="button"
    >
      {children}
    </button>
  );
}

/* =========================
   Component
========================= */
export default function AdminDashboard({ user, activeTab = "overview" }) {
  const [search, setSearch] = useState("");
  const [impersonateTarget, setImpersonateTarget] = useState("");

  const filteredUsers = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return userList;
    return userList.filter(
      (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  }, [search]);

  const compliancePendingCount = useMemo(
    () => complianceItems.filter((c) => c.status !== "resolved").length,
    []
  );

  /* ============================================================
     ✅ USER MANAGEMENT (UPDATED to match your screenshot)
  ============================================================ */
  if (activeTab === "users") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div>
          <h2 style={pageTitle}>User Management</h2>
          <p style={pageSubtitle}>Manage, suspend, and audit all platform users</p>
        </div>

        {/* Search Bar (full width) */}
        <div style={{ position: "relative", width: "100%" }}>
          <Search
            size={16}
            style={{
              position: "absolute",
              left: 14,
              top: "50%",
              transform: "translateY(-50%)",
              color: "#94a3b8"
            }}
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            style={{
              width: "100%",
              height: 44,
              borderRadius: 14,
              border: "1px solid #e2e8f0",
              background: "#fff",
              padding: "0 14px 0 40px",
              fontSize: 14,
              fontWeight: 700,
              outline: "none",
              boxSizing: "border-box"
            }}
          />
        </div>

        {/* Table Card */}
        <div style={{ ...cardStyle, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ background: "#f8fafc" }}>
              <tr>
                <th style={tableHeaderCell}>User</th>
                <th style={tableHeaderCell}>Role</th>
                <th style={tableHeaderCell}>Trust</th>
                <th style={tableHeaderCell}>Status</th>
                <th style={tableHeaderCell}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((u, idx) => {
                const trustColor = trustBarColor(u.trust);
                const avatarLetter = (u.name || "?").charAt(0).toUpperCase();

                return (
                  <tr
                    key={u.id}
                    style={{
                      borderTop: "1px solid #f1f5f9",
                      background: "#fff"
                    }}
                  >
                    {/* USER */}
                    <td style={{ padding: "16px 18px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div
                          style={{
                            width: 34,
                            height: 34,
                            borderRadius: 999,
                            background: "linear-gradient(135deg, #fb7185, #ef4444)",
                            color: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 900,
                            fontSize: 12,
                            flexShrink: 0
                          }}
                        >
                          {avatarLetter}
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontWeight: 900, color: "#0f172a", fontSize: 14 }}>
                            {u.name}
                          </div>
                          <div style={{ marginTop: 2, fontSize: 12, fontWeight: 700, color: "#94a3b8" }}>
                            {u.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* ROLE */}
                    <td style={{ padding: "16px 18px" }}>
                      <span style={rolePillStyle()}>{roleLabel(u.role)}</span>
                    </td>

                    {/* TRUST */}
                    <td style={{ padding: "16px 18px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div
                          style={{
                            width: 70,
                            height: 6,
                            borderRadius: 999,
                            background: "#e5e7eb",
                            overflow: "hidden"
                          }}
                        >
                          <div
                            style={{
                              width: `${Math.max(0, Math.min(100, u.trust))}%`,
                              height: "100%",
                              background: trustColor,
                              borderRadius: 999
                            }}
                          />
                        </div>
                        <div style={{ fontSize: 13, fontWeight: 900, color: "#0f172a" }}>
                          {u.trust}
                        </div>
                      </div>
                    </td>

                    {/* STATUS */}
                    <td style={{ padding: "16px 18px" }}>
                      <span style={statusPill(u.status)}>{u.status}</span>
                    </td>

                    {/* ACTIONS */}
                    <td style={{ padding: "16px 18px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <ActionIconButton title="View" tone="blue">
                          <Eye size={16} />
                        </ActionIconButton>

                        {u.status === "suspended" ? (
                          <ActionIconButton title="Restore" tone="green">
                            <RotateCcw size={16} />
                          </ActionIconButton>
                        ) : (
                          <ActionIconButton title="Suspend" tone="red">
                            <Ban size={16} />
                          </ActionIconButton>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  /* =========================
     COMPLIANCE
  ========================= */
  if (activeTab === "compliance") {
    return (
      <div style={{ width: "100%", maxWidth: 820, display: "flex", flexDirection: "column", gap: 18 }}>
        <div>
          <h2 style={pageTitle}>Compliance Queue</h2>
          <p style={pageSubtitle}>{compliancePendingCount} items need review</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {complianceItems.map((c) => {
            const rc = riskColors(c.risk);
            return (
              <div
                key={c.id}
                style={{
                  ...cardStyle,
                  padding: 18,
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 14
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 14,
                    background: rc.bg,
                    color: rc.fg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}
                >
                  <ShieldAlert size={20} />
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 900, color: "#0f172a", fontSize: 14 }}>{c.type}</div>
                  <div style={{ marginTop: 4, fontSize: 12, fontWeight: 700, color: "#94a3b8" }}>
                    User: {c.user} · {c.time}
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
                  <span style={complianceStatusChip(c.status)}>{c.status}</span>
                  {c.status !== "resolved" && (
                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        title="Approve"
                        style={{
                          width: 34,
                          height: 34,
                          borderRadius: 10,
                          border: "none",
                          background: "#dcfce7",
                          color: "#16a34a",
                          cursor: "pointer"
                        }}
                        type="button"
                      >
                        <CheckCircle size={18} />
                      </button>
                      <button
                        title="Reject"
                        style={{
                          width: 34,
                          height: 34,
                          borderRadius: 10,
                          border: "none",
                          background: "#fee2e2",
                          color: "#ef4444",
                          cursor: "pointer"
                        }}
                        type="button"
                      >
                        <XCircle size={18} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  /* =========================
     IMPERSONATE
  ========================= */
  if (activeTab === "impersonate") {
    return (
      <div style={{ width: "100%", maxWidth: 820, display: "flex", flexDirection: "column", gap: 18 }}>
        <div>
          <h2 style={pageTitle}>Impersonate User</h2>
          <p style={pageSubtitle}>Debug user sessions for support & auditing</p>
        </div>

        <div
          style={{
            background: "#fffbeb",
            border: "1px solid #fde68a",
            borderRadius: 20,
            padding: 16
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
            <AlertTriangle size={18} style={{ color: "#f59e0b", marginTop: 2 }} />
            <div>
              <div style={{ fontWeight: 900, color: "#92400e", fontSize: 14 }}>Impersonation is logged</div>
              <div style={{ marginTop: 4, fontSize: 12, fontWeight: 700, color: "#b45309" }}>
                All impersonation sessions are recorded in the audit trail.
              </div>
            </div>
          </div>
        </div>

        <div style={{ ...cardStyle, padding: 18 }}>
          <div style={{ fontSize: 12, fontWeight: 900, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            User Email or ID
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 10, alignItems: "center" }}>
            <div style={{ position: "relative", flex: 1 }}>
              <Search
                size={16}
                style={{
                  position: "absolute",
                  left: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#94a3b8"
                }}
              />
              <input
                value={impersonateTarget}
                onChange={(e) => setImpersonateTarget(e.target.value)}
                placeholder="user@example.com"
                style={{
                  width: "100%",
                  height: 44,
                  borderRadius: 14,
                  border: "1px solid #e2e8f0",
                  padding: "0 14px 0 38px",
                  fontSize: 14,
                  fontWeight: 700,
                  outline: "none",
                  boxSizing: "border-box"
                }}
              />
            </div>

            <button
              style={{
                height: 44,
                padding: "0 16px",
                borderRadius: 14,
                border: "none",
                background: "#ef4444",
                color: "#fff",
                fontWeight: 900,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 8
              }}
              onClick={() => {}}
              type="button"
            >
              <Eye size={16} /> Impersonate
            </button>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ fontSize: 12, fontWeight: 900, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Quick Access
          </div>

          {userList.map((u) => (
            <button
              key={u.id}
              onClick={() => setImpersonateTarget(u.email)}
              style={{
                ...cardStyle,
                padding: 14,
                textAlign: "left",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 12
              }}
              type="button"
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 999,
                  background: "linear-gradient(135deg, #fb7185, #ef4444)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 900,
                  fontSize: 12,
                  flexShrink: 0
                }}
              >
                {u.name.charAt(0)}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 900, color: "#0f172a" }}>{u.name}</div>
                <div style={{ marginTop: 2, fontSize: 12, fontWeight: 700, color: "#94a3b8" }}>{u.email}</div>
              </div>

              <ChevronRight size={18} style={{ color: "#cbd5e1" }} />
            </button>
          ))}
        </div>
      </div>
    );
  }

  /* =========================
     AUDIT
  ========================= */
  if (activeTab === "audit") {
    return (
      <div style={{ width: "100%", maxWidth: 820, display: "flex", flexDirection: "column", gap: 18 }}>
        <h2 style={pageTitle}>Audit Trail</h2>

        <div style={{ ...cardStyle, padding: 18 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {auditLog.map((l) => (
              <div key={l.id} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 999,
                    background: auditDot(l.type),
                    marginTop: 6,
                    flexShrink: 0
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 900, color: "#0f172a" }}>{l.action}</div>
                  <div style={{ marginTop: 4, fontSize: 12, fontWeight: 700, color: "#94a3b8" }}>
                    {l.admin} · {l.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }


  /* =========================
     OVERVIEW (default)
  ========================= */
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      {/* Big gradient header */}
      <div
        style={{
          borderRadius: 22,
          padding: 26,
          color: "#fff",
          background: "linear-gradient(135deg, #ef4444 0%, #e11d48 50%, #be123c 100%)",
          boxShadow: "0 18px 50px rgba(239,68,68,0.25)"
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 800, opacity: 0.85 }}>System Admin Dashboard</div>
        <div style={{ marginTop: 8, fontSize: 28, fontWeight: 900, letterSpacing: "-0.02em" }}>
          {user?.username || "Admin"}
        </div>
        <div style={{ marginTop: 6, fontSize: 14, fontWeight: 700, opacity: 0.85 }}>
          Full platform governance & compliance access
        </div>

        <div style={{ display: "flex", gap: 40, marginTop: 18, flexWrap: "wrap" }}>
          {[
            { v: "25.6K", l: "Total Users" },
            { v: "680", l: "Restaurants" },
            { v: "5", l: "Pending Reviews" }
          ].map((s) => (
            <div key={s.l}>
              <div style={{ fontSize: 22, fontWeight: 900, lineHeight: 1 }}>{s.v}</div>
              <div style={{ marginTop: 4, fontSize: 12, fontWeight: 800, opacity: 0.85 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16
        }}
      >
        {[
          { label: "Total Users", value: "25.6K", icon: Users, color: "blue" },
          { label: "Compliance Items", value: "5", icon: ShieldAlert, color: "red" },
          { label: "Platform Health", value: "99.8%", icon: Activity, color: "purple" }
        ].map(({ label, value, icon: Icon, color }) => {
          const c = statIconColors(color);
          return (
            <div key={label} style={{ ...cardStyle, padding: 18 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 14,
                  background: c.bg,
                  color: c.fg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 12
                }}
              >
                <Icon size={18} />
              </div>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#0f172a" }}>{value}</div>
              <div style={{ marginTop: 2, fontSize: 13, fontWeight: 700, color: "#64748b" }}>{label}</div>
            </div>
          );
        })}
      </div>

      {/* Two panels */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 18
        }}
      >
        {/* Compliance Queue preview */}
        <div style={{ ...cardStyle, padding: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <ShieldAlert size={18} style={{ color: "#fb7185" }} />
            <div style={{ fontWeight: 900, color: "#0f172a", fontSize: 16 }}>Compliance Queue</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {complianceItems.slice(0, 3).map((c) => (
              <div
                key={c.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "14px 0",
                  borderBottom: "1px solid #f1f5f9"
                }}
              >
                <AlertTriangle
                  size={16}
                  style={{
                    color: c.risk === "high" ? "#ef4444" : c.risk === "medium" ? "#f59e0b" : "#22c55e",
                    flexShrink: 0
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 900, color: "#0f172a" }}>{c.type}</div>
                  <div style={{ marginTop: 2, fontSize: 12, fontWeight: 700, color: "#94a3b8" }}>{c.user}</div>
                </div>
                <ChevronRight size={18} style={{ color: "#cbd5e1", flexShrink: 0 }} />
              </div>
            ))}
          </div>
        </div>

        {/* Platform Growth */}
        <div style={{ ...cardStyle, padding: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <TrendingUp size={18} style={{ color: "#fb7185" }} />
            <div style={{ fontWeight: 900, color: "#0f172a", fontSize: 16 }}>Platform Growth</div>
          </div>

          {[
            { label: "New Users (7d)", value: "+1,234", color: "green" },
            { label: "New Restaurants", value: "+23", color: "green" },
            { label: "Flagged Accounts", value: "4", color: "red" },
            { label: "Active Sessions", value: "3,847", color: "blue" }
          ].map((row) => (
            <div
              key={row.label}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 0",
                borderBottom: "1px solid #f1f5f9"
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 700, color: "#475569" }}>{row.label}</div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 900,
                  color: row.color === "green" ? "#16a34a" : row.color === "red" ? "#ef4444" : "#2563eb"
                }}
              >
                {row.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
