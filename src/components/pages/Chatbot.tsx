import React, { useState, useRef, useEffect } from "react";
import type { C } from "../../constants/colors";
import { AI_RESPONSES } from "../../constants/aiResponses";
import { Message } from "../../types";
import Card from "../shared/Card";
import Chip from "../shared/Chip";
import Button from "../shared/Button";

// ── Chat Message ──────────────────────────────────────────────────────────
const ChatMsg: React.FC<{ msg: Message }> = ({ msg }) => (
  <div style={{
    display: "flex", gap: 9,
    alignItems: "flex-start",
    flexDirection: msg.type === "user" ? "row-reverse" : "row",
  }}>
    <div style={{
      width: 28, height: 28, borderRadius: 9, flexShrink: 0,
      background: msg.type === "user"
        ? "rgba(91,141,246,0.15)"
        : "rgba(139,92,246,0.15)",
      border: `1px solid ${msg.type === "user"
        ? "rgba(91,141,246,0.2)"
        : "rgba(139,92,246,0.2)"}`,
      display: "flex", alignItems: "center",
      justifyContent: "center", fontSize: 13,
    }}>
      {msg.type === "user" ? "R" : "🤖"}
    </div>
    <div
      style={{
        padding: "10px 13px", borderRadius: 13,
        fontSize: 12.5, lineHeight: 1.65, maxWidth: "86%",
        background: msg.type === "user"
          ? "rgba(91,141,246,0.1)"
          : "rgba(255,255,255,0.03)",
        border: `1px solid ${msg.type === "user"
          ? "rgba(91,141,246,0.18)"
          : C.border}`,
      }}
      dangerouslySetInnerHTML={{ __html: msg.text }}
    />
  </div>
);

// ── Main Page ─────────────────────────────────────────────────────────────
const Chatbot: React.FC = () => {
  const [msgs, setMsgs] = useState<Message[]>([
    {
      type: "ai",
      text: "Namaste Ritika! 👋 I'm your AI placement assistant. Ask me about:<br/><br/>🐍 Python, ML, SQL, DSA concepts<br/>💬 HR question answers<br/>🏢 Company patterns (TCS, Infosys, Wipro)<br/>📄 Resume & ATS tips<br/>💰 Salary negotiation<br/><br/>What's your placement doubt today?",
    },
    {
      type: "user",
      text: "What is TCS NQT pattern?",
    },
    {
      type: "ai",
      text: "<strong>TCS NQT Pattern:</strong><br/><br/><strong>Section 1 — Cognitive (65 min)</strong><br/>• Verbal (24 min) · Reasoning (30 min) · Numerical (30 min)<br/><br/><strong>Section 2 — Programming Logic (15 min)</strong><br/>• Flowcharts, pseudocode<br/><br/><strong>Section 3 — Coding (45 min)</strong><br/>• 2 problems · Any language<br/><br/>💡 Focus on speed in verbal + quant. Practice LeetCode Easy/Medium.",
    },
  ]);

  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const newMsgs: Message[] = [...msgs, { type: "user", text }];
    setMsgs(newMsgs);
    setInput("");

    setTimeout(() => {
      const lower = text.toLowerCase();
      let resp =
        "Great question! Based on your DS profile with Python, ML, and SQL skills, I'd suggest checking the Interview Prep section. Which specific company or concept would you like to know more about?";
      for (const key of Object.keys(AI_RESPONSES)) {
        if (lower.includes(key)) {
          resp = AI_RESPONSES[key];
          break;
        }
      }
      setMsgs(m => [...m, { type: "ai", text: resp }]);
    }, 650);
  };

  const quickQuestions = [
    'How to answer "tell me about yourself"?',
    "What is Infosys InfyTQ exam pattern?",
    "How to negotiate salary as fresher?",
    "What is overfitting in machine learning?",
    "Difference between SQL join types?",
    "How to prepare for Wipro NLTH?",
  ];

  const resumeChips: [string, string, string, string][] = [
    ["Python Interview Qs",   C.accent,  "rgba(91,141,246,0.2)",  "Common Python interview questions for data science"],
    ["ML Questions",          C.accent2, "rgba(139,92,246,0.2)",  "Machine learning algorithm interview questions"],
    ["SQL Questions",         C.accent7, "rgba(34,211,238,0.2)",  "Top SQL interview questions for data analyst"],
    ["Explain Projects",      C.accent3, "rgba(16,217,140,0.2)",  "How to explain Fake News Detection project in interview"],
    ["XGBoost Questions",     C.accent4, "rgba(245,158,11,0.2)",  "How to explain XGBoost in data science interview"],
  ];

  return (
    <div className="fade-up">
      {/* Header */}
      <div style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 26, fontWeight: 700,
        letterSpacing: -0.8, marginBottom: 3,
      }}>
        🤖 AI Placement Chatbot
      </div>
      <div style={{ color: C.text2, fontSize: 13, marginBottom: 22 }}>
        Ask anything — technical doubts, HR tips, company patterns — 24/7
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 300px",
        gap: 16, alignItems: "start",
      }}>
        {/* Chat Window */}
        <Card style={{
          height: 540,
          display: "flex",
          flexDirection: "column",
        }}>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 14.5, fontWeight: 700, marginBottom: 2,
          }}>
            💬 Chat with Placement Preparation AI
          </div>
          <div style={{ fontSize: 12, color: C.text2, marginBottom: 14 }}>
            Type your doubt and press Enter
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: "auto",
            display: "flex", flexDirection: "column",
            gap: 10, marginBottom: 12, paddingRight: 4,
          }}>
            {msgs.map((m, i) => (
              <ChatMsg key={i} msg={m} />
            ))}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div style={{ display: "flex", gap: 8 }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send(input)}
              placeholder="Type your doubt... (Enter to send)"
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${C.border}`,
                borderRadius: 10, padding: "9px 13px",
                color: C.text, fontSize: 13, outline: "none",
              }}
            />
            <Button onClick={() => send(input)}>Send →</Button>
          </div>
        </Card>

        {/* Right Panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Quick Questions */}
          <Card>
            <div style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 14.5, fontWeight: 700, marginBottom: 2,
            }}>
              ⚡ Quick Questions
            </div>
            <div style={{ fontSize: 12, color: C.text2, marginBottom: 14 }}>
              Click to instantly ask
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {quickQuestions.map(q => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: `1px solid ${C.border}`,
                    borderRadius: 9, padding: "8px 12px",
                    color: C.text2, fontSize: 12,
                    textAlign: "left", cursor: "pointer",
                    fontFamily: "inherit", transition: "all 0.15s",
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          </Card>

          {/* Resume Chips */}
          <Card>
            <div style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 14.5, fontWeight: 700, marginBottom: 2,
            }}>
              📌 From Your Resume
            </div>
            <div style={{ fontSize: 12, color: C.text2, marginBottom: 14 }}>
              Ask interview questions for your skills
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {resumeChips.map(([label, color, border, question]) => (
                <Chip
                  key={label}
                  color={color}
                  borderColor={border}
                  onClick={() => send(question)}
                >
                  {label}
                </Chip>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;