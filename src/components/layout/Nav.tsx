import React from "react";
import { C } from "../../constants/colors";
import { NavProps } from "../../types";

const NAV_ITEMS = [
  { id: "dashboard",   label: "Dashboard" },
  { id: "resume",      label: "Resume" },
  { id: "ats",         label: "ATS Score" },
  { id: "prep",        label: "Interview Prep" },
  { id: "dsa",         label: "DSA" },
  { id: "performance", label: "Performance" },
  { id: "chatbot",     label: "AI Chatbot" },
];

const Nav: React.FC<NavProps> = ({ active, onNav }) => {
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 28px", height: 56,
      background: "rgba(4,7,15,0.85)",
      backdropFilter: "blur(24px) saturate(1.5)",
      borderBottom: `1px solid ${C.border}`,
    }}>
      {/* Logo */}
      <div style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 700, fontSize: 18, letterSpacing: -0.5,
        background: `linear-gradient(130deg, ${C.accent} 20%, ${C.accent2})`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <span style={{
          width: 8, height: 8, borderRadius: "50%",
          background: C.accent3,
          boxShadow: `0 0 10px ${C.accent3}`,
          display: "inline-block",
          WebkitTextFillColor: "unset",
          animation: "pulse 2s infinite",
        }} />
        Placement Preparation
      </div>

      {/* Nav Links */}
      <div style={{ display: "flex", gap: 2 }}>
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            onClick={() => onNav(item.id)}
            style={{
              background: active === item.id
                ? "rgba(91,141,246,0.12)"
                : "transparent",
              border: active === item.id
                ? "1px solid rgba(91,141,246,0.2)"
                : "1px solid transparent",
              borderRadius: 8,
              padding: "5px 11px",
              color: active === item.id ? C.text : C.text2,
              fontSize: 12.5, fontWeight: 500,
              cursor: "pointer", transition: "all 0.15s",
              fontFamily: "inherit",
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* User */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 13, color: C.text2 }}>Ritika</span>
        <div style={{
          width: 30, height: 30, borderRadius: "50%",
          background: `linear-gradient(135deg, ${C.accent}, ${C.accent2})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 700, fontSize: 13, color: "white",
          boxShadow: `0 0 0 2px rgba(91,141,246,0.3)`,
        }}>
          R
        </div>
      </div>
    </nav>
  );
};

export default Nav;