import React, { useState, useRef, useEffect } from "react";
import { C } from "../../constants/colors";
import { AI_RESPONSES } from "../../constants/aiResponses";
import  type { Message } from "../../types";
import Button from "../shared/Button";

const ChatMsg: React.FC<{ msg: Message }> = ({ msg }) => (
  <div style={{
    display: "flex", gap: 10,
    alignItems: "flex-start",
    flexDirection: msg.type === "user" ? "row-reverse" : "row",
    marginBottom: 12,
  }}>
    <div style={{
      width: 32, height: 32, borderRadius: 10,
      flexShrink: 0,
      background: msg.type === "user"
        ? "linear-gradient(135deg, rgba(108,142,245,0.2), rgba(167,139,250,0.15))"
        : "linear-gradient(135deg, rgba(167,139,250,0.2), rgba(108,142,245,0.15))",
      border: `1px solid ${msg.type === "user"
        ? "rgba(108,142,245,0.25)"
        : "rgba(167,139,250,0.25)"}`,
      display: "flex", alignItems: "center",
      justifyContent: "center", fontSize: 14,
      fontWeight: 700, color: C.accent,
    }}>
      {msg.type === "user" ? "U" : "🤖"}
    </div>
    <div
      style={{
        padding: "12px 16px", borderRadius: 14,
        fontSize: 13, lineHeight: 1.7, maxWidth: "84%",
        background: msg.type === "user"
          ? "linear-gradient(135deg, rgba(108,142,245,0.12), rgba(167,139,250,0.08))"
          : "rgba(255,255,255,0.035)",
        border: `1px solid ${msg.type === "user"
          ? "rgba(108,142,245,0.2)"
          : C.border}`,
      }}
      dangerouslySetInnerHTML={{ __html: msg.text }}
    />
  </div>
);

const Chatbot: React.FC = () => {
  const [msgs, setMsgs] = useState<Message[]>([
    {
      type: "ai",
      text: "Hello! 👋 I am your AI Placement Assistant.<br/><br/>I can help you with:<br/>🐍 Python, ML, SQL, DSA concepts<br/>💬 HR question answers<br/>🏢 Company exam patterns (TCS, Infosys, Wipro)<br/>📄 Resume and ATS tips<br/>💰 Salary negotiation tips<br/><br/>What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  const send = (text: string) => {
    if (!text.trim() || loading) return;
    const newMsgs: Message[] = [...msgs, { type: "user", text }];
    setMsgs(newMsgs);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const lower = text.toLowerCase();
      let resp = "That is a great question! I can help you with Python, ML, SQL, DSA concepts, HR questions, company exam patterns, and placement tips. Could you be more specific about what you would like to know?";
      for (const key of Object.keys(AI_RESPONSES)) {
        if (lower.includes(key)) {
          resp = AI_RESPONSES[key];
          break;
        }
      }
      setMsgs(m => [...m, { type: "ai", text: resp }]);
      setLoading(false);
    }, 800);
  };

  const quickQuestions = [
    "What is TCS NQT exam pattern?",
    "How to answer tell me about yourself?",
    "What is Infosys InfyTQ pattern?",
    "How to negotiate salary as fresher?",
    "What is overfitting in ML?",
    "Difference between SQL JOIN types?",
    "How to prepare for Wipro NLTH?",
    "What are common Python interview questions?",
  ];

  return (
    <div className="fade-up">
      <div style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: 26, fontWeight: 800,
        letterSpacing: -0.8, marginBottom: 4,
      }}>
        🤖 AI Placement Chatbot
      </div>
      <div style={{ color: C.text2, fontSize: 13, marginBottom: 24 }}>
        Ask anything about placement preparation — available 24/7
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 290px",
        gap: 16, alignItems: "start",
      }}>
        {/* Chat Window */}
        <Card style={{
          height: 560,
          display: "flex",
          flexDirection: "column",
        }}>
          <div style={{
            display: "flex", alignItems: "center",
            gap: 10, marginBottom: 4,
          }}>
            <div style={{
              width: 10, height: 10, borderRadius: "50%",
              background: C.accent3,
              boxShadow: `0 0 8px ${C.accent3}`,
              animation: "pulse 2s infinite",
            }} />
            <div style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 15, fontWeight: 700,
            }}>
              AI Assistant
            </div>
          </div>
          <div style={{ fontSize: 12, color: C.text2, marginBottom: 16 }}>
            Type your question and press Enter or click Send
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: "auto",
            paddingRight: 6, marginBottom: 16,
          }}>
            {msgs.map((m, i) => (
              <ChatMsg key={i} msg={m} />
            ))}
            {loading && (
              <div style={{
                display: "flex", gap: 10,
                alignItems: "flex-start", marginBottom: 12,
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 10,
                  background: "rgba(167,139,250,0.15)",
                  border: "1px solid rgba(167,139,250,0.25)",
                  display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 14,
                }}>
                  🤖
                </div>
                <div style={{
                  padding: "12px 16px", borderRadius: 14,
                  background: "rgba(255,255,255,0.035)",
                  border: `1px solid ${C.border}`,
                  display: "flex", gap: 5, alignItems: "center",
                }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{
                      width: 6, height: 6, borderRadius: "50%",
                      background: C.accent2,
                      animation: `pulse 1s infinite ${i * 0.2}s`,
                    }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div style={{ display: "flex", gap: 8 }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send(input)}
              placeholder="Ask your placement question..."
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${C.border}`,
                borderRadius: 12, padding: "11px 16px",
                color: C.text, fontSize: 13, outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={e =>
                (e.target.style.borderColor = "rgba(108,142,245,0.5)")
              }
              onBlur={e =>
                (e.target.style.borderColor = C.border)
              }
            />
            <Button onClick={() => send(input)}>
              Send →
            </Button>
          </div>
        </Card>

        {/* Right Panel */}
        <div style={{
          display: "flex", flexDirection: "column", gap: 14,
        }}>
          <Card>
            <div style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 15, fontWeight: 700, marginBottom: 4,
            }}>
              ⚡ Quick Questions
            </div>
            <div style={{ fontSize: 12, color: C.text2, marginBottom: 14 }}>
              Click to ask instantly
            </div>
            <div style={{
              display: "flex", flexDirection: "column", gap: 6,
            }}>
              {quickQuestions.map(q => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: `1px solid ${C.border}`,
                    borderRadius: 10, padding: "9px 13px",
                    color: C.text2, fontSize: 12,
                    textAlign: "left", cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "all 0.18s",
                    lineHeight: 1.5,
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(108,142,245,0.08)";
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(108,142,245,0.25)";
                    (e.currentTarget as HTMLButtonElement).style.color = C.text;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.03)";
                    (e.currentTarget as HTMLButtonElement).style.borderColor = C.border;
                    (e.currentTarget as HTMLButtonElement).style.color = C.text2;
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;