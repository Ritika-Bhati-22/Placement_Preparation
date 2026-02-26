import React, { useState } from "react";
import { C } from "../../constants/colors";
import { PREP_DATA } from "../../constants/prepData";
import Card from "../shared/Card";
import InfoBox from "../shared/InfoBox";

const InterviewPrep: React.FC = () => {
  const [topic, setTopic] = useState("python");
  const data = PREP_DATA[topic];

  const topics = [
    { id: "python", icon: "🐍", iconBg: "rgba(91,141,246,0.12)",  name: "Python (Core)",    sub: "OOP, Decorators, Generators, GIL",       pct: "72%", pctColor: C.accent  },
    { id: "ml",     icon: "🤖", iconBg: "rgba(139,92,246,0.12)",  name: "Machine Learning", sub: "Algorithms, Overfitting, Evaluation",     pct: "55%", pctColor: C.accent2 },
    { id: "sql",    icon: "🗄️", iconBg: "rgba(34,211,238,0.12)",  name: "SQL & Databases",  sub: "Joins, Subqueries, Indexing",            pct: "48%", pctColor: C.accent7 },
    { id: "stats",  icon: "📊", iconBg: "rgba(16,217,140,0.12)",  name: "Statistics",       sub: "Hypothesis testing, Distributions",      pct: "30%", pctColor: C.accent3 },
    { id: "hr",     icon: "💬", iconBg: "rgba(245,158,11,0.12)",  name: "HR & Behavioral",  sub: "Personalized answers for your profile",  pct: "65%", pctColor: C.accent4 },
  ];

  return (
    <div className="fade-up">
      {/* Header */}
      <div style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 26, fontWeight: 700,
        letterSpacing: -0.8, marginBottom: 3,
      }}>
        🧠 Interview Preparation
      </div>
      <div style={{ color: C.text2, fontSize: 13, marginBottom: 22 }}>
        Personalized prep plan from your resume
      </div>

      <InfoBox color="blue" title="📄 Prep Based on Ritika's Resume"
        style={{ marginBottom: 18 }}>
        Detected skills:{" "}
        <strong style={{ color: C.text }}>
          Python, Machine Learning, SQL, Data Analysis, Flask, XGBoost
        </strong>
        . All questions are tailored to your profile.
      </InfoBox>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 16, marginBottom: 16,
      }}>
        {/* Topic List */}
        <Card>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 14.5, fontWeight: 700, marginBottom: 2,
          }}>
            📚 Your Personalized Topics
          </div>
          <div style={{ fontSize: 12, color: C.text2, marginBottom: 14 }}>
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
                  padding: "13px 14px",
                  background: isActive
                    ? "rgba(91,141,246,0.08)"
                    : "rgba(255,255,255,0.025)",
                  border: `1px solid ${isActive
                    ? "rgba(91,141,246,0.2)"
                    : C.border}`,
                  borderRadius: 12, marginBottom: 8,
                  cursor: "pointer", transition: "all 0.18s",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 33, height: 33, borderRadius: 9,
                    background: t.iconBg,
                    display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: 15,
                  }}>
                    {t.icon}
                  </div>
                  <div>
                    <div style={{
                      fontWeight: 600, fontSize: 13, marginBottom: 1,
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}>
                      {t.name}
                    </div>
                    <div style={{ fontSize: 11, color: C.text2 }}>
                      {t.sub}
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 18, fontWeight: 700, color: t.pctColor,
                  }}>
                    {t.pct}
                  </div>
                  <div style={{ fontSize: 10, color: C.text2 }}>Ready</div>
                </div>
              </div>
            );
          })}
        </Card>

        {/* Questions */}
        <Card>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 14.5, fontWeight: 700, marginBottom: 2,
          }}>
            {data.title}
          </div>
          <div style={{ fontSize: 12, color: C.text2, marginBottom: 14 }}>
            From your resume · Commonly asked in DS/ML interviews
          </div>
          {data.qs.map((q, i) => (
            <InfoBox key={i} color={q.c as any} title={q.t}>
              {q.a}
            </InfoBox>
          ))}
        </Card>
      </div>

      {/* HR Section */}
      <Card>
        <div style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 14.5, fontWeight: 700, marginBottom: 2,
        }}>
          🗣 HR Questions — Personalized for Ritika
        </div>
        <div style={{ fontSize: 12, color: C.text2, marginBottom: 14 }}>
          Tailored answers based on your projects and skills
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 14,
        }}>
          <InfoBox color="blue" title='"Tell me about yourself"'
            style={{ marginBottom: 0 }}>
            "I'm a final year CS student with strong Python and ML skills.
            I've built 3 projects including a Fake News Detector with 92%
            accuracy."
          </InfoBox>
          <InfoBox color="purple" title='"Describe your best project"'
            style={{ marginBottom: 0 }}>
            <strong>STAR:</strong> S: News misinformation T: Build detector
            A: Used NLP + Scikit-learn R: 92% accuracy, deployed on Flask
          </InfoBox>
          <InfoBox color="green" title='"What are your strengths?"'
            style={{ marginBottom: 0 }}>
            "I translate data into insights. My XGBoost project identified
            at-risk students with 87% accuracy — helping teams intervene
            early."
          </InfoBox>
        </div>
      </Card>
    </div>
  );
};

export default InterviewPrep;