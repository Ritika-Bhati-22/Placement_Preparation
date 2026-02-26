import React from "react";
import { C } from "../../constants/colors";
import { SidebarProps } from "../../types";

const SB_ITEMS = [
  { id: "dashboard",   icon: "🏠", label: "Dashboard",       section: "Main" },
  { id: "resume",      icon: "📄", label: "Resume Analyzer", badge: "74",  badgeColor: C.accent3 },
  { id: "ats",         icon: "🎯", label: "ATS Score",       badge: "New", badgeColor: C.accent4 },
  { id: "prep",        icon: "🧠", label: "Interview Prep" },
  { id: "dsa",         icon: "💻", label: "DSA Practice",    badge: "50+", badgeColor: C.accent,  section: "Practice" },
  { id: "performance", icon: "📊", label: "My Performance" },
  { id: "chatbot",     icon: "🤖", label: "AI Chatbot",      dot: true,    section: "AI" },
];

const Sidebar: React.FC<SidebarProps> = ({ active, onNav }) => {
  let prevSection = "";

  return (
    <aside style={{
      width: 228,
      minHeight: "calc(100vh - 56px)",
      background: "rgba(8,13,26,0.65)",
      backdropFilter: "blur(20px)",
      borderRight: `1px solid ${C.border}`,
      padding: "14px 9px",
      display: "flex", flexDirection: "column", gap: 1,
      position: "sticky", top: 56,
      height: "calc(100vh - 56px)",
      overflowY: "auto",
    }}>
      {SB_ITEMS.map(item => {
        const showSection = item.section && item.section !== prevSection;
        if (item.section) prevSection = item.section;
        const isActive = active === item.id;

        return (
          <div key={item.id}>
            {showSection && (
              <div style={{
                fontSize: 9.5, fontWeight: 700,
                letterSpacing: 1.8, color: C.muted,
                textTransform: "uppercase",
                padding: "14px 10px 5px",
              }}>
                {item.section}
              </div>
            )}
            <button
              onClick={() => onNav(item.id)}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "8px 10px", borderRadius: 10, width: "100%",
                background: isActive ? "rgba(91,141,246,0.1)" : "transparent",
                border: isActive
                  ? "1px solid rgba(91,141,246,0.2)"
                  : "1px solid transparent",
                color: isActive ? C.accent : C.text2,
                fontSize: 13, fontWeight: 500,
                cursor: "pointer", transition: "all 0.15s",
                textAlign: "left", fontFamily: "inherit",
              }}
            >
              <div style={{
                width: 27, height: 27, borderRadius: 7, flexShrink: 0,
                background: isActive
                  ? "rgba(91,141,246,0.15)"
                  : "rgba(255,255,255,0.04)",
                display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: 13,
              }}>
                {item.icon}
              </div>

              <span style={{ flex: 1 }}>{item.label}</span>

              {item.badge && (
                <span style={{
                  fontSize: 10, padding: "2px 7px",
                  borderRadius: 20, fontWeight: 700,
                  background: `${item.badgeColor}18`,
                  color: item.badgeColor,
                }}>
                  {item.badge}
                </span>
              )}

              {item.dot && (
                <span style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: C.accent5,
                  boxShadow: `0 0 6px ${C.accent5}`,
                }} />
              )}
            </button>
          </div>
        );
      })}

      {/* Progress Card */}
      <div style={{ marginTop: "auto", paddingTop: 14 }}>
        <div style={{
          background: "rgba(91,141,246,0.06)",
          border: "1px solid rgba(91,141,246,0.14)",
          borderRadius: 12, padding: 14,
        }}>
          <div style={{
            fontSize: 12.5, fontWeight: 700, marginBottom: 3,
            fontFamily: "'Space Grotesk', sans-serif",
          }}>
            Placement Ready?
          </div>
          <div style={{
            fontSize: 10.5, color: C.text2,
            marginBottom: 10, lineHeight: 1.5,
          }}>
            Complete all modules to maximize your chances
          </div>
          <div style={{
            height: 6, background: "rgba(255,255,255,0.05)",
            borderRadius: 5, overflow: "hidden", marginBottom: 6,
          }}>
            <div style={{
              height: "100%", width: "58%",
              background: `linear-gradient(90deg, ${C.accent}, ${C.accent2})`,
              borderRadius: 5,
            }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 10.5, color: C.text2 }}>Progress</span>
            <span style={{ fontSize: 10.5, color: C.accent, fontWeight: 700 }}>58%</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;