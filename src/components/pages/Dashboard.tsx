import React from "react";
import { C } from "../../constants/colors";
import Button from "../shared/Button";

interface DashboardProps {
  onNav: (page: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNav }) => {
  const modules = [
    { icon: "📄", label: "Resume Analyzer",  desc: "Upload & analyze your resume",         page: "resume",      color: C.accent  },
    { icon: "🎯", label: "ATS Score",         desc: "Check ATS compatibility",              page: "ats",         color: C.accent4 },
    { icon: "🧠", label: "Interview Prep",    desc: "Topic wise preparation",               page: "prep",        color: C.accent2 },
    { icon: "💻", label: "DSA Practice",      desc: "Practice coding problems",             page: "dsa",         color: C.accent3 },
    { icon: "📊", label: "My Performance",    desc: "Track your test scores",               page: "performance", color: C.accent6 },
    { icon: "🤖", label: "AI Chatbot",        desc: "Ask placement doubts 24/7",            page: "chatbot",     color: C.accent7 },
  ];

  const tips = [
    { icon: "📄", text: "Upload your resume to get started" },
    { icon: "🎯", text: "Check ATS score against job descriptions" },
    { icon: "🧠", text: "Practice interview questions daily" },
    { icon: "💻", text: "Solve at least 2 DSA problems per day" },
  ];

  return (
    <div className="fade-up">
      {/* Hero */}
      <div style={{
        background: "linear-gradient(135deg, rgba(108,142,245,0.1), rgba(167,139,250,0.07))",
        border: "1px solid rgba(108,142,245,0.18)",
        borderRadius: 20, padding: "36px 40px",
        marginBottom: 24, position: "relative", overflow: "hidden",
      }}>
        {/* Glow */}
        <div style={{
          position: "absolute", top: -80, right: -80,
          width: 280, height: 280,
          background: "radial-gradient(circle, rgba(108,142,245,0.15), transparent 70%)",
          borderRadius: "50%", pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: -60, left: -60,
          width: 200, height: 200,
          background: "radial-gradient(circle, rgba(167,139,250,0.1), transparent 70%)",
          borderRadius: "50%", pointerEvents: "none",
        }} />

        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between", gap: 20,
        }}>
          <div>
            <div style={{
              fontSize: 11, fontWeight: 700,
              letterSpacing: 2, textTransform: "uppercase",
              color: C.accent, marginBottom: 10,
            }}>
              Welcome to
            </div>
            <div style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 34, fontWeight: 800,
              letterSpacing: -1, marginBottom: 10,
              lineHeight: 1.2,
            }}>
              Placement Preparation
              <br />
              <span style={{
                background: "linear-gradient(130deg, #6C8EF5, #A78BFA)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                Dashboard
              </span>
            </div>
            <div style={{
              fontSize: 14, color: C.text2,
              lineHeight: 1.6, maxWidth: 420,
            }}>
              Your complete placement preparation hub. Upload your resume
              to get a personalized prep plan and start your journey! 🚀
            </div>
          </div>

          <div style={{
            display: "flex", flexDirection: "column",
            gap: 10, flexShrink: 0,
          }}>
            <Button onClick={() => onNav("resume")}>
              📄 Upload Resume
            </Button>
            <Button variant="secondary" onClick={() => onNav("chatbot")}>
              🤖 Ask AI Chatbot
            </Button>
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      <div style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: 11, fontWeight: 700,
        letterSpacing: 2, textTransform: "uppercase",
        color: C.muted, marginBottom: 14,
      }}>
        All Modules
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 14, marginBottom: 24,
      }}>
        {modules.map(m => (
          <div
            key={m.page}
            onClick={() => onNav(m.page)}
            style={{
              background: C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: 16, padding: "22px",
              cursor: "pointer", transition: "all 0.2s",
              position: "relative", overflow: "hidden",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.border = `1px solid ${m.color}40`;
              (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
              (e.currentTarget as HTMLDivElement).style.boxShadow = `0 12px 32px rgba(0,0,0,0.3)`;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.border = `1px solid ${C.border}`;
              (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
            }}
          >
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 2,
              background: `linear-gradient(90deg, ${m.color}, transparent)`,
              borderRadius: "16px 16px 0 0",
            }} />
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: `${m.color}18`,
              border: `1px solid ${m.color}30`,
              display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: 20,
              marginBottom: 14,
              boxShadow: `0 4px 14px ${m.color}20`,
            }}>
              {m.icon}
            </div>
            <div style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 15, fontWeight: 700, marginBottom: 5,
            }}>
              {m.label}
            </div>
            <div style={{ fontSize: 12, color: C.text2, lineHeight: 1.5 }}>
              {m.desc}
            </div>
            <div style={{
              marginTop: 16, fontSize: 12,
              color: m.color, fontWeight: 600,
              display: "flex", alignItems: "center", gap: 4,
            }}>
              Open →
            </div>
          </div>
        ))}
      </div>

      {/* Tips */}
      <div style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: 11, fontWeight: 700,
        letterSpacing: 2, textTransform: "uppercase",
        color: C.muted, marginBottom: 14,
      }}>
        Getting Started Tips
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 12,
      }}>
        {tips.map((tip, i) => (
          <div key={i} style={{
            background: C.surface,
            border: `1px solid ${C.border}`,
            borderRadius: 14, padding: 16,
            display: "flex", alignItems: "flex-start", gap: 12,
          }}>
            <div style={{
              width: 34, height: 34, borderRadius: 9,
              background: "rgba(108,142,245,0.1)",
              border: "1px solid rgba(108,142,245,0.2)",
              display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: 16,
              flexShrink: 0,
            }}>
              {tip.icon}
            </div>
            <div style={{
              fontSize: 12, color: C.text2,
              lineHeight: 1.6, paddingTop: 2,
            }}>
              {tip.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;