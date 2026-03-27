"use client";

import { useState } from "react";

const navItems = [
  { id: "dashboard", icon: "📊", label: "Dashboard" },
  { id: "portfolio", icon: "💼", label: "Portfolio" },
  { id: "copilot", icon: "🤖", label: "AI Copilot" },
];

export function Sidebar() {
  const [active, setActive] = useState("dashboard");

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">⟠</div>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`sidebar-nav-item ${active === item.id ? "active" : ""}`}
            title={item.label}
          >
            <span className="sidebar-nav-icon">{item.icon}</span>
            <span className="sidebar-nav-label">{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="sidebar-footer">
        <button className="sidebar-nav-item" title="Settings">
          <span className="sidebar-nav-icon">⚙️</span>
          <span className="sidebar-nav-label">Settings</span>
        </button>
      </div>
    </aside>
  );
}
