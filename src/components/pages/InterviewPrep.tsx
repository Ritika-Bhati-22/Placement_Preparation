import React, { useState } from "react";
import { C } from "../../constants/colors";
import { PREP_DATA } from "../../constants/prepData";
import Card from "../shared/Card";
import InfoBox from "../shared/InfoBox";

const InterviewPrep: React.FC = () => {
  const [topic, setTopic] = useState("python");
  const data = PREP_DATA[topic];

  const topics = [
    { id: "python", icon: "🐍", iconBg: "rgba(108,142,245,0.12)", name: "Python (Core)",    sub: "OOP, Decorators, Generators, GIL",      pctColor: C.accent  },
    { id: "ml",     icon: "🤖", iconBg: "rgba(167,139,250,0.12)", name: "Machine Learning", sub: "Algorithms, Overfitting, Evaluation",    pctColor: C.accent2 },
    { id: "sql",    icon: "🗄️", iconBg: "rgba(56,189,248,0.12)",  name: "SQL & Databases",  sub: "Joins, Subqueries, Indexing",           pctColor: C.accent7 },
    { id: "stats",  icon: "📊", iconBg: "rgba(52,211,153,0.12)",  name: "Statistics",       sub: "Hypothesis testing, Distributions",     pctColor: C.accent3 },
    { id: "hr",     icon: "💬", iconBg: "rgba(251,191,36,0.12)",  name: "HR & Behavioral",  sub: "Common HR questions and best answers",  pctColor: C.accent4 },
  ];

  return (
    <div className="fade-up">
      <div style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: 26, fontWeight: 800,
        letterSpacing: -0.8, marginBottom: 4,
      }}>
        🧠 Interview Preparation
      </div>
      <div style={{ color: C.text2, fontSize: 13, marginBottom: 24 }}>
        Topic wise interview questions and answers
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 16, marginBottom: 16,
      }}>
        {/* Topic List */}
        <Card>
          <div style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 15, fontWeight: 700, marginBottom: 4,
          }}>
            📚 Select Topic
          </div>
          <div style={{ fontSize: 12, color: C.text2, marginBottom: 16 }}>
            Click any topic to view questions
          </div>

          {topics.map(t => {
            const isActive = topic === t.id;
            return (
              <div
                key={t.id}
                onClick={() => setTopic(t.id)}
                style={{
                  display: "flex", alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 16px",
                  background: isActive
                    ? "linear-gradient(135deg, rgba(108,142,245,0.1), rgba(167,139,250,0.07))"
                    : "rgba(255,255,255,0.025)",
                  border: `1px solid ${isActive
                    ? "rgba(108,142,245,0.25)"
                    : C.border}`,
                  borderRadius: 13, marginBottom: 8,
                  cursor: "pointer", transition: "all 0.2s",
                  transform: isActive ? "translateX(4px)" : "none",
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.04)";
                    (e.currentTarget as HTMLDivElement).style.borderColor = C.borderBright;
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.025)";
                    (e.currentTarget as HTMLDivElement).style.borderColor = C.border;
                  }
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: t.iconBg,
                    display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: 16,
                    boxShadow: isActive ? `0 4px 12px ${t.pctColor}25` : "none",
                    transition: "all 0.2s",
                  }}>
                    {t.icon}
                  </div>
                  <div>
                    <div style={{
                      fontWeight: 600, fontSize: 13, marginBottom: 2,
                      fontFamily: "'Outfit', sans-serif",
                      color: isActive ? C.text : C.text,
                    }}>
                      {t.name}
                    </div>
                    <div style={{ fontSize: 11, color: C.text2 }}>
                      {t.sub}
                    </div>
                  </div>
                </div>
                {isActive && (
                  <div style={{
                    width: 8, height: 8, borderRadius: "50%",
                    background: t.pctColor,
                    boxShadow: `0 0 10px ${t.pctColor}`,
                    flexShrink: 0,
                  }} />
                )}
              </div>
            );
          })}
        </Card>

        {/* Questions */}
        <Card>
          <div style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 15, fontWeight: 700, marginBottom: 4,
          }}>
            {data.title}
          </div>
          <div style={{ fontSize: 12, color: C.text2, marginBottom: 16 }}>
            Commonly asked in interviews
          </div>
          <div style={{ overflowY: "auto", maxHeight: 420 }}>
            {data.qs.map((q, i) => (
              <InfoBox key={i} color={q.c as any} title={q.t}>
                {q.a}
              </InfoBox>
            ))}
          </div>
        </Card>
      </div>

      {/* HR Section */}
      <Card>
        <div style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 15, fontWeight: 700, marginBottom: 4,
        }}>
          🗣 Common HR Questions
        </div>
        <div style={{ fontSize: 12, color: C.text2, marginBottom: 20 }}>
          Most frequently asked HR questions with sample answers
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 14,
        }}>
          {[
            {
              color: "blue" as const,
              q: '"Tell me about yourself"',
              a: "Introduce yourself with your education, key skills, and 1-2 major projects. Keep it under 90 seconds. End with why you are excited about this role.",
            },
            {
              color: "purple" as const,
              q: '"What is your greatest strength?"',
              a: "Pick a strength relevant to the job. Back it up with a specific example from your projects or academics. Quantify results if possible.",
            },
            {
              color: "green" as const,
              q: '"Where do you see yourself in 5 years?"',
              a: "Show ambition but stay realistic. Mention skill growth, leadership, and how the company fits your long term goals.",
            },
            {
              color: "amber" as const,
              q: '"Why should we hire you?"',
              a: "Connect your skills directly to the job requirements. Mention your projects, problem solving ability, and eagerness to contribute.",
            },
            {
              color: "red" as const,
              q: '"What is your weakness?"',
              a: "Pick a real but improvable weakness. Show self awareness and mention the steps you are taking to improve it.",
            },
            {
              color: "blue" as const,
              q: '"Do you have any questions for us?"',
              a: "Always say yes! Ask about team culture, growth opportunities, day to day responsibilities, or tech stack they use.",
            },
          ].map((item, i) => (
            <InfoBox key={i} color={item.color} title={item.q}
              style={{ marginBottom: 0 }}>
              {item.a}
            </InfoBox>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default InterviewPrep;