import React, { useState, useEffect } from "react";
import { C } from "../../constants/colors";
import Card from "../shared/Card";
import InfoBox from "../shared/InfoBox";
import Tabs from "../shared/Tabs";
import Button from "../shared/Button";

// ── Timer ─────────────────────────────────────────────────────────────────
const TimerDisplay: React.FC = () => {
  const [t, setT] = useState(2700);
  useEffect(() => {
    const id = setInterval(() =>
      setT(prev => prev > 0 ? prev - 1 : 0), 1000);
    return () => clearInterval(id);
  }, []);
  const m = Math.floor(t / 60);
  const s = t % 60;
  return (
    <span style={{
      fontFamily: "'Outfit', sans-serif",
      fontWeight: 800, fontSize: 22,
      color: t < 300 ? C.accent5 : C.accent4,
    }}>
      {m}:{String(s).padStart(2, "0")}
    </span>
  );
};

// ── MCQ Question ──────────────────────────────────────────────────────────
const MCQQuestion: React.FC<{
  tags: [string, string][];
  q: string;
  opts: string[];
  correct: number;
  onAnswer: (correct: boolean) => void;
}> = ({ tags, q, opts, correct, onAnswer }) => {
  const [chosen, setChosen] = useState<number | null>(null);

  const handle = (i: number) => {
    if (chosen !== null) return;
    setChosen(i);
    onAnswer(i === correct);
  };

  return (
    <div style={{
      background: "rgba(255,255,255,0.025)",
      border: `1px solid ${C.border}`,
      borderRadius: 14, padding: 20, marginBottom: 12,
    }}>
      <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
        {tags.map(([label, color]) => (
          <span key={label} style={{
            fontSize: 10, padding: "3px 10px",
            borderRadius: 20, fontWeight: 700,
            background: `${color}18`, color,
          }}>
            {label}
          </span>
        ))}
      </div>
      <div style={{
        fontSize: 14, fontWeight: 600,
        marginBottom: 16, lineHeight: 1.6,
        fontFamily: "'Outfit', sans-serif",
      }}>
        {q}
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 8,
      }}>
        {opts.map((opt, i) => {
          let bg     = "rgba(255,255,255,0.025)";
          let border = C.border;
          let color  = C.text2;
          if (chosen !== null) {
            if (i === correct) {
              bg = "rgba(52,211,153,0.1)";
              border = "rgba(52,211,153,0.35)";
              color = C.accent3;
            } else if (i === chosen) {
              bg = "rgba(248,113,113,0.1)";
              border = "rgba(248,113,113,0.35)";
              color = C.accent5;
            }
          }
          return (
            <div
              key={i}
              onClick={() => handle(i)}
              style={{
                padding: "11px 14px", borderRadius: 10,
                border: `1px solid ${border}`,
                cursor: chosen === null ? "pointer" : "default",
                fontSize: 13, background: bg, color,
                transition: "all 0.18s", lineHeight: 1.5,
              }}
              onMouseEnter={e => {
                if (chosen === null) {
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.05)";
                  (e.currentTarget as HTMLDivElement).style.borderColor = C.borderBright;
                }
              }}
              onMouseLeave={e => {
                if (chosen === null) {
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.025)";
                  (e.currentTarget as HTMLDivElement).style.borderColor = C.border;
                }
              }}
            >
              {opt}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ── Main Page ─────────────────────────────────────────────────────────────
const Performance: React.FC = () => {
  const [tab, setTab] = useState("Overview");
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const handleAnswer = (correct: boolean) => {
    setScore(s => ({
      correct: correct ? s.correct + 1 : s.correct,
      total: s.total + 1,
    }));
  };

  return (
    <div className="fade-up">
      <div style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: 26, fontWeight: 800,
        letterSpacing: -0.8, marginBottom: 4,
      }}>
        📊 My Performance
      </div>
      <div style={{ color: C.text2, fontSize: 13, marginBottom: 24 }}>
        Test your knowledge with coding tests and MCQ tests
      </div>

      <Tabs
        items={["Overview", "Coding Test", "MCQ Test", "History"]}
        active={tab}
        onChange={setTab}
      />

      {/* ── Overview ── */}
      {tab === "Overview" && (
        <div className="fade-up">
          <div style={{
            background: "linear-gradient(135deg, rgba(108,142,245,0.08), rgba(167,139,250,0.05))",
            border: "1px solid rgba(108,142,245,0.18)",
            borderRadius: 18, padding: "32px 36px",
            marginBottom: 20, textAlign: "center",
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📊</div>
            <div style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 22, fontWeight: 800,
              letterSpacing: -0.5, marginBottom: 8,
            }}>
              No Tests Taken Yet
            </div>
            <div style={{
              fontSize: 13, color: C.text2,
              lineHeight: 1.7, maxWidth: 400,
              margin: "0 auto 24px",
            }}>
              Take a coding test or MCQ test to see your performance
              analytics, scores, and improvement areas
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <Button onClick={() => setTab("Coding Test")}>
                💻 Start Coding Test
              </Button>
              <Button variant="purple" onClick={() => setTab("MCQ Test")}>
                📝 Start MCQ Test
              </Button>
            </div>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 14,
          }}>
            {[
              {
                icon: "💻", title: "Coding Test",
                desc: "3 coding problems based on common interview topics. 45 min time limit.",
                btn: "Start Coding Test",
                variant: "primary" as const,
                tab: "Coding Test",
              },
              {
                icon: "📝", title: "MCQ Test",
                desc: "10 multiple choice questions on Python, ML, SQL and DSA concepts.",
                btn: "Start MCQ Test",
                variant: "purple" as const,
                tab: "MCQ Test",
              },
              {
                icon: "📈", title: "Test History",
                desc: "View all past test results, scores and track your improvement over time.",
                btn: "View History",
                variant: "secondary" as const,
                tab: "History",
              },
            ].map(item => (
              <Card key={item.title} onClick={() => setTab(item.tab)}>
                <div style={{ fontSize: 34, marginBottom: 12 }}>
                  {item.icon}
                </div>
                <div style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 15, fontWeight: 700, marginBottom: 6,
                }}>
                  {item.title}
                </div>
                <div style={{
                  fontSize: 12, color: C.text2,
                  lineHeight: 1.6, marginBottom: 16,
                }}>
                  {item.desc}
                </div>
                <Button
                  variant={item.variant}
                  full
                  onClick={() => setTab(item.tab)}
                >
                  {item.btn} →
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ── Coding Test ── */}
      {tab === "Coding Test" && (
        <div className="fade-up">
          <InfoBox color="purple"
            title="💻 Coding Test — 3 Problems"
            style={{ marginBottom: 20 }}>
            Solve all 3 problems within 45 minutes. Use any language
            you are comfortable with.
          </InfoBox>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 360px",
            gap: 16,
          }}>
            <div style={{
              display: "flex",
              flexDirection: "column", gap: 12,
            }}>
              {[
                {
                  num: "Problem 1 · Easy",
                  color: C.accent3,
                  text: "Write a function that takes an array of numbers and returns the sum of all even numbers.",
                  rows: 4,
                },
                {
                  num: "Problem 2 · Medium",
                  color: C.accent4,
                  text: "Given a string, find the longest substring without repeating characters and return its length.",
                  rows: 4,
                },
                {
                  num: "Problem 3 · Hard",
                  color: C.accent5,
                  text: "Given a list of intervals, merge all overlapping intervals and return the merged list.",
                  rows: 5,
                },
              ].map((p, i) => (
                <div key={i} style={{
                  background: "rgba(255,255,255,0.025)",
                  border: `1px solid ${C.border}`,
                  borderRadius: 14, padding: 20,
                }}>
                  <div style={{
                    display: "flex", alignItems: "center",
                    gap: 8, marginBottom: 10,
                  }}>
                    <span style={{
                      fontSize: 10, padding: "3px 10px",
                      borderRadius: 20, fontWeight: 700,
                      background: `${p.color}18`, color: p.color,
                    }}>
                      {p.num}
                    </span>
                  </div>
                  <div style={{
                    fontSize: 13, fontWeight: 500,
                    marginBottom: 14, lineHeight: 1.7, color: C.text,
                  }}>
                    {p.text}
                  </div>
                  <textarea
                    rows={p.rows}
                    placeholder="Write your solution here..."
                    style={{
                      width: "100%",
                      background: "rgba(0,0,0,0.4)",
                      border: `1px solid ${C.border}`,
                      borderRadius: 10, padding: "12px 14px",
                      color: "#86efac", fontSize: 12.5,
                      fontFamily: "'JetBrains Mono', monospace",
                      outline: "none", resize: "none",
                      lineHeight: 1.8,
                    }}
                  />
                </div>
              ))}
              <Button full onClick={() =>
                alert("🎉 Test Submitted!\n\nResults will appear in History tab.")
              }>
                Submit Coding Test →
              </Button>
            </div>

            <div style={{
              display: "flex", flexDirection: "column", gap: 14,
            }}>
              <Card>
                <div style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 15, fontWeight: 700, marginBottom: 4,
                }}>
                  ⏱ Timer
                </div>
                <div style={{ fontSize: 12, color: C.text2, marginBottom: 14 }}>
                  Time remaining
                </div>
                <div style={{
                  background: "rgba(251,191,36,0.06)",
                  border: "1px solid rgba(251,191,36,0.18)",
                  borderRadius: 12, padding: "16px 20px",
                  display: "flex", justifyContent: "space-between",
                  alignItems: "center", marginBottom: 16,
                }}>
                  <span style={{ fontSize: 13, color: C.text2 }}>
                    Remaining
                  </span>
                  <TimerDisplay />
                </div>
                <InfoBox color="blue" title="📌 Instructions"
                  style={{ marginBottom: 0 }}>
                  • Write clean and readable code<br />
                  • Add comments where needed<br />
                  • Handle edge cases<br />
                  • Test before submitting
                </InfoBox>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* ── MCQ Test ── */}
      {tab === "MCQ Test" && (
        <div className="fade-up">
          <InfoBox color="blue"
            title="📝 MCQ Test — 3 Sample Questions"
            style={{ marginBottom: 20 }}>
            Answer all questions. Each correct answer adds to your score.
            Results shown after submission.
          </InfoBox>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 300px",
            gap: 16,
          }}>
            <div>
              <MCQQuestion
                tags={[["Python", C.accent], ["Easy", C.accent3]]}
                q="Q1. Which method is used to remove duplicate rows in a Pandas DataFrame?"
                opts={[
                  "A. df.unique()",
                  "B. df.drop_duplicates()",
                  "C. df.remove_dup()",
                  "D. df.distinct()",
                ]}
                correct={1}
                onAnswer={handleAnswer}
              />
              <MCQQuestion
                tags={[["Machine Learning", C.accent2], ["Medium", C.accent4]]}
                q="Q2. Which algorithm builds multiple decision trees and merges them to get a more accurate prediction?"
                opts={[
                  "A. Linear Regression",
                  "B. KNN",
                  "C. Random Forest",
                  "D. Naive Bayes",
                ]}
                correct={2}
                onAnswer={handleAnswer}
              />
              <MCQQuestion
                tags={[["SQL", C.accent7], ["Medium", C.accent4]]}
                q="Q3. Which SQL clause is used to filter results after GROUP BY aggregation?"
                opts={[
                  "A. WHERE",
                  "B. FILTER",
                  "C. ORDER BY",
                  "D. HAVING",
                ]}
                correct={3}
                onAnswer={handleAnswer}
              />
              <Button full onClick={() =>
                alert(`📊 Test Submitted!\n\nCorrect: ${score.correct}/${score.total}\nAccuracy: ${score.total > 0 ? Math.round(score.correct / score.total * 100) : 0}%`)
              }>
                Submit MCQ Test →
              </Button>
            </div>

            <div style={{
              display: "flex", flexDirection: "column", gap: 14,
            }}>
              <Card>
                <div style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 15, fontWeight: 700, marginBottom: 4,
                }}>
                  📊 Live Score
                </div>
                <div style={{ fontSize: 12, color: C.text2, marginBottom: 16 }}>
                  Updates as you answer
                </div>
                <div style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 52, fontWeight: 800,
                  color: C.accent, letterSpacing: -2,
                  marginBottom: 4, lineHeight: 1,
                }}>
                  {score.correct}/{score.total}
                </div>
                <div style={{
                  fontSize: 12, color: C.text2, marginBottom: 16,
                }}>
                  Questions answered
                </div>
                <div style={{
                  height: 6,
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: 5, overflow: "hidden", marginBottom: 8,
                }}>
                  <div style={{
                    height: "100%",
                    width: `${score.total > 0
                      ? Math.round(score.correct / score.total * 100)
                      : 0}%`,
                    background: `linear-gradient(90deg, ${C.accent3}, #059669)`,
                    borderRadius: 5, transition: "width 0.5s ease",
                  }} />
                </div>
                <div style={{
                  fontSize: 12, color: C.accent3, fontWeight: 700,
                }}>
                  Accuracy: {score.total > 0
                    ? Math.round(score.correct / score.total * 100)
                    : 0}%
                </div>
              </Card>

              <Card>
                <div style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 15, fontWeight: 700, marginBottom: 4,
                }}>
                  💡 Tips
                </div>
                <div style={{ fontSize: 12, color: C.text2, lineHeight: 1.7 }}>
                  • Read each question carefully<br />
                  • Eliminate wrong options first<br />
                  • Trust your first instinct<br />
                  • Review before submitting
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* ── History ── */}
      {tab === "History" && (
        <div className="fade-up">
          <Card>
            <div style={{
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              padding: "60px 20px", textAlign: "center",
            }}>
              <div style={{ fontSize: 52, marginBottom: 16 }}>📈</div>
              <div style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 20, fontWeight: 800,
                marginBottom: 8,
              }}>
                No Test History Yet
              </div>
              <div style={{
                fontSize: 13, color: C.text2,
                lineHeight: 1.7, maxWidth: 360,
                marginBottom: 24,
              }}>
                Complete a coding test or MCQ test to see your history,
                scores and performance trends here
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <Button onClick={() => setTab("Coding Test")}>
                  💻 Take Coding Test
                </Button>
                <Button variant="purple" onClick={() => setTab("MCQ Test")}>
                  📝 Take MCQ Test
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Performance;