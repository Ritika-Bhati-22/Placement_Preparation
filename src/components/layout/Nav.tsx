import React, { useState } from "react";
import { C } from "../../constants/colors";

interface NavProps {
  active: string;
  onNav: (page: string) => void;
}

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
      display: "flex", alignItems: "center",
      justifyContent: "space-between",
      padding: "0 32px", height: 60,
      background: "rgba(7,8,16,0.88)",
      backdropFilter: "blur(28px) saturate(1.6)",
      borderBottom: `1px solid ${C.border}`,
    }}>
      {/* Logo */}
      <div style={{
        fontFamily: "'Outfit', sans-serif",
        fontWeight: 800, fontSize: 19,
        letterSpacing: -0.5,
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: 10,
          background: "linear-gradient(135deg, #6C8EF5, #A78BFA)",
          display: "flex", alignItems: "center",
          justifyContent: "center", fontSize: 16,
          boxShadow: "0 4px 14px rgba(108,142,245,0.35)",
        }}>
          🎯
        </div>
        <span style={{
          background: "linear-gradient(130deg, #F1F5FF 30%, #A78BFA)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          Placement Prep
        </span>
      </div>

      {/* Nav Links */}
      <div style={{
        display: "flex", gap: 2,
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${C.border}`,
        borderRadius: 12, padding: 4,
      }}>
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            onClick={() => onNav(item.id)}
            style={{
              background: active === item.id
                ? "linear-gradient(135deg, rgba(108,142,245,0.2), rgba(167,139,250,0.15))"
                : "transparent",
              border: active === item.id
                ? "1px solid rgba(108,142,245,0.25)"
                : "1px solid transparent",
              borderRadius: 8,
              padding: "6px 13px",
              color: active === item.id ? C.text : C.text2,
              fontSize: 12.5, fontWeight: active === item.id ? 600 : 400,
              cursor: "pointer", transition: "all 0.18s",
              fontFamily: "inherit",
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* User */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          fontSize: 12, color: C.text2,
          background: "rgba(255,255,255,0.05)",
          border: `1px solid ${C.border}`,
          padding: "5px 12px", borderRadius: 20,
        }}>
          Student
        </div>
        <div style={{
          width: 34, height: 34, borderRadius: "50%",
          background: "linear-gradient(135deg, #6C8EF5, #A78BFA)",
          display: "flex", alignItems: "center",
          justifyContent: "center",
          fontWeight: 700, fontSize: 14, color: "white",
          boxShadow: "0 0 0 2px rgba(108,142,245,0.3), 0 4px 12px rgba(108,142,245,0.25)",
        }}>
          S
        </div>
      </div>
    </nav>
  );
};

export default Nav;