import React from "react";
import { C } from "../../constants/colors";

interface SidebarProps {
  active: string;
  onNav: (page: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const SB_ITEMS = [
  { id: "dashboard",   icon: "🏠", label: "Dashboard",       section: "Main"     },
  { id: "resume",      icon: "📄", label: "Resume Analyzer", section: null       },
  { id: "ats",         icon: "🎯", label: "ATS Score",       section: null       },
  { id: "prep",        icon: "🧠", label: "Interview Prep",  section: null       },
  { id: "dsa",         icon: "💻", label: "DSA Practice",    section: "Practice" },
  { id: "performance", icon: "📊", label: "Performance",     section: null       },
  { id: "chatbot",     icon: "🤖", label: "AI Chatbot",      section: "AI"       },
];

const Sidebar: React.FC<SidebarProps> = ({ active, onNav }) => {
  let prevSection = "";

  return (
    <>
      <aside
        className="sidebar"
        style={{
          width: 220,
          minHeight: "calc(100vh - 60px)",
          background: "rgba(7,8,16,0.6)",
          backdropFilter: "blur(20px)",
          borderRight: `1px solid ${C.border}`,
          padding: "20px 10px",
          display: "flex", flexDirection: "column",
          position: "sticky", top: 60,
          height: "calc(100vh - 60px)",
          overflowY: "auto",
          flexShrink: 0,
        }}
      >
        {SB_ITEMS.map(item => {
          const showSection = item.section && item.section !== prevSection;
          if (item.section) prevSection = item.section;
          const isActive = active === item.id;

          return (
            <div key={item.id}>
              {showSection && (
                <div style={{
                  fontSize: 9.5, fontWeight: 700,
                  letterSpacing: 2, color: C.muted,
                  textTransform: "uppercase",
                  padding: "16px 12px 6px",
                }}>
                  {item.section}
                </div>
              )}
              <button
                onClick={() => onNav(item.id)}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "10px 12px", borderRadius: 12,
                  width: "100%", marginBottom: 2,
                  background: isActive
                    ? "linear-gradient(135deg, rgba(108,142,245,0.15), rgba(167,139,250,0.1))"
                    : "transparent",
                  border: isActive
                    ? "1px solid rgba(108,142,245,0.22)"
                    : "1px solid transparent",
                  color: isActive ? C.text : C.text2,
                  fontSize: 13, fontWeight: isActive ? 600 : 400,
                  cursor: "pointer", transition: "all 0.18s",
                  textAlign: "left", fontFamily: "inherit",
                }}
              >
                <div style={{
                  width: 30, height: 30, borderRadius: 9,
                  background: isActive
                    ? "linear-gradient(135deg, rgba(108,142,245,0.25), rgba(167,139,250,0.2))"
                    : "rgba(255,255,255,0.05)",
                  display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 14,
                  boxShadow: isActive ? "0 4px 12px rgba(108,142,245,0.2)" : "none",
                  transition: "all 0.18s", flexShrink: 0,
                }}>
                  {item.icon}
                </div>
                <span style={{ flex: 1 }}>{item.label}</span>
                {isActive && (
                  <div style={{
                    width: 6, height: 6, borderRadius: "50%",
                    background: C.accent,
                    boxShadow: `0 0 8px ${C.accent}`,
                  }} />
                )}
              </button>
            </div>
          );
        })}

        <div style={{ marginTop: "auto", paddingTop: 20 }}>
          <div style={{
            background: "linear-gradient(135deg, rgba(108,142,245,0.08), rgba(167,139,250,0.06))",
            border: "1px solid rgba(108,142,245,0.15)",
            borderRadius: 14, padding: 16, textAlign: "center",
          }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>🚀</div>
            <div style={{
              fontSize: 12, fontWeight: 600, marginBottom: 4,
            }}>
              Start Your Journey
            </div>
            <div style={{ fontSize: 11, color: C.text2, lineHeight: 1.5 }}>
              Upload resume to get your personalized prep plan
            </div>
          </div>
        </div>
      </aside>

      {/* Bottom Nav for Mobile */}
      <nav
        className="bottom-nav"
        style={{
          display: "none",
          position: "fixed", bottom: 0, left: 0, right: 0,
          zIndex: 200,
          background: "rgba(7,8,16,0.95)",
          backdropFilter: "blur(20px)",
          borderTop: `1px solid ${C.border}`,
          padding: "8px 4px",
        }}
      >
        {SB_ITEMS.map(item => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNav(item.id)}
              style={{
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                gap: 3, flex: 1, padding: "6px 2px",
                background: "transparent", border: "none",
                cursor: "pointer", borderRadius: 10,
                transition: "all 0.18s",
              }}
            >
              <div style={{
                width: 32, height: 32, borderRadius: 9,
                background: isActive
                  ? "rgba(108,142,245,0.15)"
                  : "transparent",
                display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: 16,
                transition: "all 0.18s",
              }}>
                {item.icon}
              </div>
              <span style={{
                fontSize: 9, fontWeight: isActive ? 700 : 400,
                color: isActive ? C.accent : C.text2,
                fontFamily: "inherit",
              }}>
                {item.label.split(" ")[0]}
              </span>
            </button>
          );
        })}
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .sidebar { display: none !important; }
          .bottom-nav {
            display: flex !important;
            overflow-x: auto;
          }
        }
      `}</style>
    </>
  );
};

export default Sidebar;