import React, { useState } from "react";
import { C } from "../../constants/colors";

interface NavProps {
  active: string;
  onNav: (page: string) => void;
}

const NAV_ITEMS = [
  { id: "dashboard",   label: "Dashboard" },
  { id: "resume",      label: "Resume" },
  { id: "ats",         label: "ATS" },
  { id: "prep",        label: "Prep" },
  { id: "dsa",         label: "DSA" },
  { id: "performance", label: "Tests" },
  { id: "chatbot",     label: "AI Chat" },
];

const Nav: React.FC<NavProps> = ({ active, onNav }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px", height: 60,
        background: "rgba(7,8,16,0.92)",
        backdropFilter: "blur(28px) saturate(1.6)",
        borderBottom: `1px solid ${C.border}`,
      }}>
        {/* Logo */}
        <div style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 800, fontSize: 17,
          display: "flex", alignItems: "center", gap: 10,
          flexShrink: 0,
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: 10,
            background: "linear-gradient(135deg, #6C8EF5, #A78BFA)",
            display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: 16,
            boxShadow: "0 4px 14px rgba(108,142,245,0.35)",
            flexShrink: 0,
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

        {/* Desktop Nav */}
        <div style={{
          display: "flex", gap: 2,
          background: "rgba(255,255,255,0.03)",
          border: `1px solid ${C.border}`,
          borderRadius: 12, padding: 4,
        }}
          className="desktop-nav"
        >
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
                padding: "6px 12px",
                color: active === item.id ? C.text : C.text2,
                fontSize: 12, fontWeight: active === item.id ? 600 : 400,
                cursor: "pointer", transition: "all 0.18s",
                fontFamily: "inherit",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="hamburger"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: `1px solid ${C.border}`,
            borderRadius: 10, padding: "8px 10px",
            cursor: "pointer", color: C.text,
            fontSize: 18, display: "none",
          }}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: 60, left: 0, right: 0,
          zIndex: 199,
          background: "rgba(7,8,16,0.97)",
          backdropFilter: "blur(20px)",
          borderBottom: `1px solid ${C.border}`,
          padding: 16,
          display: "none",
        }}
          className="mobile-menu"
        >
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => { onNav(item.id); setMenuOpen(false); }}
              style={{
                display: "flex", alignItems: "center",
                width: "100%", padding: "12px 16px",
                marginBottom: 6, borderRadius: 12,
                background: active === item.id
                  ? "rgba(108,142,245,0.12)"
                  : "rgba(255,255,255,0.03)",
                border: `1px solid ${active === item.id
                  ? "rgba(108,142,245,0.25)"
                  : C.border}`,
                color: active === item.id ? C.text : C.text2,
                fontSize: 14, fontWeight: active === item.id ? 600 : 400,
                cursor: "pointer", fontFamily: "inherit",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
          .mobile-menu { display: block !important; }
        }
      `}</style>
    </>
  );
};

export default Nav;