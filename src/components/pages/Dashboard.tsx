import React from "react";
import { C } from "../../constants/colors";
import Card from "../shared/Card";
import StatCard from "../shared/StatCard";
import ProgBar from "../shared/ProgBar";
import Button from "../shared/Button";

interface DashboardProps {
  onNav: (page: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNav }) => {
  const modules = [
    { label: "📄 Resume Analyzer",   pct: 74, color: C.accent,  page: "resume",      badge: "74%" },
    { label: "🎯 ATS Score Checker", pct: 60, color: C.accent4, page: "ats",         badge: "Checked" },
    { label: "🧠 Interview Prep",    pct: 45, color: C.accent2, page: "prep",        badge: "45%" },
    { label: "💻 DSA Practice",      pct: 24, color: C.accent3, page: "dsa",         badge: "47/200" },
    { label: "📊 My Performance",    pct: 40, color: C.accent6, page: "performance", badge: "2 Tests" },
    { label: "🤖 AI Chatbot",        pct: 55, color: C.accent7, page: "chatbot",     badge: "55%" },
  ];

  const activity = [
    { dot: C.accent3, text: "Solved 15 Python MCQs — scored <strong style='color:#EEF2FF'>87%</strong>",        time: "2 hours ago" },
    { dot: C.accent,  text: "Resume score improved <strong style='color:#EEF2FF'>66 → 74</strong>",             time: "2 days ago" },
    { dot: C.accent4, text: "ATS checked on Jobscan — <strong style='color:#EEF2FF'>68% match</strong>",        time: "3 days ago" },
    { dot: C.accent2, text: "Interview Prep — <strong style='color:#EEF2FF'>OOP topic</strong> completed",      time: "4 days ago" },
    { dot: C.accent5, text: "DSA — solved <strong style='color:#EEF2FF'>Binary Search</strong>",                time: "5 days ago" },
  ];

  return (
    <div className="fade-up">
      {/* Page Header */}
      <div style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 26, fontWeight: 700,
        letterSpacing: -0.8, marginBottom: 3,
      }}>
        Welcome back, Ritika 👋
      </div>
      <div style={{ color: C.text2, fontSize: 13, marginBottom: 22 }}>
        Your placement prep overview — 3 companies visiting next month
      </div>

      {/* Hero Band */}
      <div style={{
        background: "linear-gradient(135deg,rgba(91,141,246,0.09),rgba(139,92,246,0.06))",
        border: "1px solid rgba(91,141,246,0.18)",
        borderRadius: 18, padding: "28px 32px", marginBottom: 20,
        display: "flex", alignItems: "center",
        justifyContent: "space-between", gap: 20,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -60, right: -60,
          width: 220, height: 220,
          background: "radial-gradient(circle,rgba(91,141,246,0.12),transparent 70%)",
          borderRadius: "50%", pointerEvents: "none",
        }} />

        <div>
          <div style={{
            fontSize: 10.5, color: C.text2, fontWeight: 700,
            letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 6,
          }}>
            Overall Selection Probability
          </div>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 58, fontWeight: 700, letterSpacing: -3,
            background: `linear-gradient(130deg,${C.accent},${C.accent2})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1,
          }}>
            73%
          </div>
          <div style={{
            display: "flex", alignItems: "center",
            gap: 10, marginTop: 10, flexWrap: "wrap",
          }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              fontSize: 11, fontWeight: 600, padding: "3px 10px",
              borderRadius: 20,
              background: "rgba(16,217,140,0.1)", color: C.accent3,
              border: "1px solid rgba(16,217,140,0.2)",
            }}>
              ✅ Likely Selected
            </span>
            <span style={{ fontSize: 12, color: C.text2 }}>
              Improve communication to reach 85%+
            </span>
          </div>
          <div style={{ display: "flex", gap: 7, marginTop: 12, flexWrap: "wrap" }}>
            {["TCS", "Infosys", "Wipro"].map(c => (
              <span key={c} style={{
                fontSize: 11, padding: "3px 11px", borderRadius: 20,
                fontWeight: 600,
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${C.border}`, color: C.text2,
              }}>
                {c}
              </span>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8, flexShrink: 0 }}>
          <Button onClick={() => onNav("resume")}>📄 Analyze Resume</Button>
          <Button variant="secondary" onClick={() => onNav("prep")}>🧠 Start Prep</Button>
        </div>
      </div>

      {/* Stats */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: 13, marginBottom: 16,
      }}>
        <StatCard label="Resume Score"      value={74}    change="↑ +8 since last update" color="blue"   />
        <StatCard label="Questions Solved"  value={342}   change="↑ 12 today"             color="purple" />
        <StatCard label="Practice Accuracy" value="68%"   change="↑ +3% this week"        color="green"  />
        <StatCard label="DSA Solved"        value={47}    change="↑ 5 this week"           color="amber"  />
      </div>

      {/* Bottom Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

        {/* Module Progress */}
        <Card>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 14.5, fontWeight: 700,
            marginBottom: 2,
          }}>
            🗂 Module Progress
          </div>
          <div style={{ fontSize: 12, color: C.text2, marginBottom: 14 }}>
            Click any to jump in
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
            {modules.map(m => (
              <div
                key={m.label}
                onClick={() => onNav(m.page)}
                style={{ cursor: "pointer" }}
              >
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  fontSize: 12.5, marginBottom: 5, alignItems: "center",
                }}>
                  <span>{m.label}</span>
                  <span style={{
                    color: m.color, fontWeight: 700,
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}>
                    {m.badge}
                  </span>
                </div>
                <ProgBar value={m.pct} color={m.color} />
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activity */}
        <Card>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 14.5, fontWeight: 700, marginBottom: 2,
          }}>
            ⚡ Recent Activity
          </div>
          <div style={{ fontSize: 12, color: C.text2, marginBottom: 14 }}>
            Last 7 days
          </div>
          {activity.map((a, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: 10,
              padding: "10px 0",
              borderBottom: i < activity.length - 1
                ? "1px solid rgba(255,255,255,0.04)"
                : "none",
            }}>
              <div style={{
                width: 7, height: 7, borderRadius: "50%",
                background: a.dot,
                boxShadow: `0 0 6px ${a.dot}`,
                marginTop: 5, flexShrink: 0,
              }} />
              <div>
                <div
                  style={{ fontSize: 12.5, lineHeight: 1.5 }}
                  dangerouslySetInnerHTML={{ __html: a.text }}
                />
                <div style={{ fontSize: 10.5, color: C.muted, marginTop: 2 }}>
                  {a.time}
                </div>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;