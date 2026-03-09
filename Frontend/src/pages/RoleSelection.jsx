import React from 'react';
import { useNavigate } from "react-router-dom";
import { User, Utensils, Star, Briefcase, ShieldCheck, Zap, X, Users } from "lucide-react";
import "../styles/RoleSelection.css"; // Ensure this path is correct

const roles = [
  { id: 'user', title: 'General User', icon: User, class: 'bg-user', desc: 'Discovery, preferences & social feed' },
  { id: 'owner', title: 'Restaurant Owner', icon: Utensils, class: 'bg-owner', desc: 'Business management & analytics' },
  { id: 'creator', title: 'Creator / Influencer', icon: Star, class: 'bg-creator', desc: 'Portfolio, gigs & monetization' },
  { id: 'staff', title: 'Staff Member', icon: Briefcase, class: 'bg-staff', desc: 'Operations, shifts & tasks' },
  { id: 'admin', title: 'System Admin', icon: ShieldCheck, class: 'bg-admin', desc: 'Governance, compliance & impersonation' },
];

export default function RoleSelection() {
  const navigate = useNavigate();

  const handleSelect = (roleId) => {
    // Map internal 'owner' id to the 'restaurant_owner' value used in App.jsx
    const finalRole = roleId === 'owner' ? 'restaurant_owner' : roleId;
    localStorage.setItem("role", finalRole);
    navigate("/home/dashboard");
  };

  return (
    <div className="role-modal-overlay">
      <div className="role-modal-card">
        
        <button className="role-close-btn">
          <X size={20} />
        </button>

        <div className="role-modal-content">
          {/* Brand Header */}
          <div className="role-header-brand">
            <div className="brand-icon-box">
              <Utensils size={20} fill="currentColor" />
            </div>
            <span className="brand-name">DineVibe</span>
          </div>

          {/* Main Title */}
          <div className="admin-sim-title">
            <div className="sim-icon-box">
              <ShieldCheck size={24} />
            </div>
            <div className="sim-text">
              <h1>Admin Simulation</h1>
              <p>Choose a role to simulate</p>
            </div>
          </div>

          {/* Alert Banner */}
          <div className="simulation-alert">
            <Zap size={16} fill="#eab308" stroke="#eab308" />
            <p>
              You are authenticated as <strong>test@dinevibe.com</strong>. Select any role below to load its dashboard for debugging & moderation.
            </p>
          </div>

          {/* Role List */}
          <div className="role-option-list">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => handleSelect(role.id)}
                className="role-option-btn"
              >
                <div className={`role-icon-container ${role.class}`}>
                  <role.icon size={22} />
                </div>
                <div className="role-details">
                  <h3>{role.title}</h3>
                  <p>{role.desc}</p>
                </div>
                <Users size={18} className="role-users-icon" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
