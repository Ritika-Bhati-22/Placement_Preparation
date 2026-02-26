import React, { useState, useEffect } from "react";
import { C } from "../../constants/colors";
import Card from "../shared/Card";
import StatCard from "../shared/StatCard";
import InfoBox from "../shared/InfoBox";
import Tabs from "../shared/Tabs";
import Button from "../shared/Button";
import { MCQQuestionProps } from "../../types";

// ── Timer ──────────────────────────────────────────────────────────────────
const TimerDisplay: React.FC = () => {
  const [t, setT] = useState(2693);
  useEffect(() => {
    const id = setInterval(() => setT(prev => prev > 0 ? prev - 1 : 0), 1000);
    return () => clearInterval(id);
  }, []);
  const m = Math.floor(t / 60);
  const s = t % 60;
  return (
    <span style={{
      fontFamily: "'Space Grotesk', sans-serif",
      fontWeight: 800, fontSize: 20,
      color: t < 300 ? C.accent5 : C.accent4,
    }}>
      {m}:{String(s).padStart(2, "0")}
    </span>
  );
};

// ── MCQ Question ───────────────────────────────────────────────────────────
const MCQQuestion: React.FC<MCQQuestionProps> = ({
  tags, q, opts, correct, onAnswer,
}) => {
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
      borderRadius: 13, padding: 18, marginBottom: 12,
    }}>
      {/* Tags */}
      <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
        {tags.map(([label, color]) => (
          <span key={label} style={{
            fontSize: 10, padding: "2px 9px",
            borderRadius: 20, fontWeight: 700,
            background: `${color}18`, color,
          }}>
            {label}
          </span>
        ))}
      </div>

      {/* Question */}
      <div style={{
        fontSize: 13, fontWeight: 500,
        marginBottom: 14, lineHeight: 1.65,
        fontFamily: "'Space Grotesk', sans-serif",
      }}>
        {q}
      </div>

      {/* Options */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 8,
      }}>
        {opts.map((opt, i) => {
          let bg     = "rgba(255,255,255,0.02)";
          let border = C.border;
          let color  = C.text2;

          if (chosen !== null) {
            if (i === correct) {
              bg = "rgba(16,217,140,0.1)";
              border = "rgba(16,217,140,0.3)";
              color = C.accent3;
            } else if (i === chosen) {
              bg = "rgba(242,82,82,0.1)";
              border = "rgba(242,82,82,0.3)";
              color = C.accent5;
            }
          }

          return (
            <div
              key={i}
              onClick={() => handle(i)}
              style={{
                padding: "10px 13px", borderRadius: 9,
                border: `1px solid ${border}`,
                cursor: "pointer", fontSize: 12,
                background: bg, color,
                transition: "all 0.15s",
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

// ── ATSSite (reused for history) ───────────────────────────────────────────
const HistoryItem: React.FC<{
  name: string; meta: string;
  score: string; color: string;
}> = ({ name, meta, score, color }) => (
  <div style={{
    display: "flex", alignItems: "center",
    justifyContent: "space-between",
    padding: "13px 15px",
    background: "rgba(255,255,255,0.025)",
    border: `1px solid ${C.border}`,
    borderRadius: 12, marginBottom: 9,
  }}>
    <div>
      <div style={{
        fontWeight: 600, fontSize: 13,
        fontFamily: "'Space Grotesk', sans-serif",
      }}>
        {name}
      </div>
      <div style={{ fontSize: 10.5, color: C.text2, marginTop: 2 }}>
        {meta}
      </div>
    </div>
    <div style={{
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: 22, fontWeight: 700, color,
    }}>
      {score}
    </div>
  </div>
);

// ── Main Page ──────────────────────────────────────────────────────────────
const Performance: React.FC = () => {
  const [tab, setTab] = useState("Overview");
  const [score, setScore] = useState({ correct: 2, total: 3 });

  const handleAnswer = (correct: boolean) => {
    setScore(s => ({
      correct: correct ? s.correct + 1 : s.correct,
      total: s.total + 1,
    }));
  };

  return (
    <div className="fade-up">
      {/* Header */}
      <div style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 26, fontWeight: 700,
        letterSpacing: -0.8, marginBottom: 3,
      }}>
        📊 My Performance
      </div>
      <div style={{ color: C.text2, fontSize: 13, marginBottom: 22 }}>
        Analyze your performance through coding tests and MCQ tests
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
            background: "linear-gradient(135deg,rgba(91,141,246,0.08),rgba(139,92,246,0.05))",
            border: "1px solid rgba(91,141,246,0.18)",
            borderRadius: 16, padding: 24, marginBottom: 16,
          }}>
            <div style={{
              display: "flex", alignItems: "center",
              gap: 24, flexWrap: "wrap",
            }}>
              <div>
                <div style={{
                  fontSize: 10.5, color: C.text2, fontWeight: 700,
                  letterSpacing: 1.2, textTransform: "uppercase",
                  marginBottom: 8,
                }}>
                  Overall Score
                </div>
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 50, fontWeight: 700, letterSpacing: -3,
                  background: `linear-gradient(130deg,${C.accent},${C.accent2})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  lineHeight: 1,
                }}>
                  71%
                </div>
              </div>
              <div style={{ flex: 1, minWidth: 240 }}>
                {[
                  ["Python Skills", 78, C.accent],
                  ["ML Concepts",   65, C.accent2],
                  ["SQL",           72, C.accent7],
                  ["DSA",           55, C.accent4],
                  ["HR Questions",  68, C.accent3],
                ].map(([label, val, color]) => (
                  <div key={label as string} style={{
                    display: "flex", alignItems: "center",
                    gap: 10, marginBottom: 10,
                  }}>
                    <span style={{
                      width: 115, fontSize: 12,
                      color: C.text2, flexShrink: 0,
                    }}>
                      {label}
                    </span>
                    <div style={{
                      flex: 1, height: 5,
                      background: "rgba(255,255,255,0.05)",
                      borderRadius: 5, overflow: "hidden",
                    }}>
                      <div style={{
                        height: "100%",
                        width: `${val}%`,
                        background: color as string,
                        borderRadius: 5,
                      }} />
                    </div>
                    <span style={{
                      width: 38, textAlign: "right",
                      fontWeight: 700, fontSize: 12,
                      color: color as string,
                    }}>
                      {val}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 14,
          }}>
            <Card onClick={() => setTab("Coding Test")}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>💻</div>
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 14.5, fontWeight: 700, marginBottom: 2,
              }}>
                Coding Test
              </div>
              <div style={{ fontSize: 12, color: C.text2, marginBottom: 14 }}>
                Resume-based Python, ML, SQL problems. 45 min limit.
              </div>
              <Button full onClick={() => setTab("Coding Test")}>
                Start Coding Test →
              </Button>
            </Card>

            <Card onClick={() => setTab("MCQ Test")}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>📝</div>
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 14.5, fontWeight: 700, marginBottom: 2,
              }}>
                MCQ Test
              </div>
              <div style={{ fontSize: 12, color: C.text2, marginBottom: 14 }}>
                30 questions based on your resume skills. Timed.
              </div>
              <Button variant="purple" full onClick={() => setTab("MCQ Test")}>
                Start MCQ Test →
              </Button>
            </Card>

            <Card onClick={() => setTab("History")}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>📈</div>
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 14.5, fontWeight: 700, marginBottom: 2,
              }}>
                Test History
              </div>
              <div style={{ fontSize: 12, color: C.text2, marginBottom: 14 }}>
                All past tests, scores, and improvement tracking.
              </div>
              <Button variant="secondary" full onClick={() => setTab("History")}>
                View History →
              </Button>
            </Card>
          </div>
        </div>
      )}

      {/* ── Coding Test ── */}
      {tab === "Coding Test" && (
        <div className="fade-up">
          <InfoBox color="purple"
            title="💻 Coding Test — Based on Ritika's Resume"
            style={{ marginBottom: 18 }}>
            3 problems from YOUR skills: Python, ML, SQL. Time: 45 min.
          </InfoBox>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 380px",
            gap: 16,
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                ["Problem 1 · Python + Pandas · Medium",
                 "Write a function to find top 3 students by average marks from a DataFrame with columns: name, math, science, english."],
                ["Problem 2 · Machine Learning · Easy",
                 "Write code to train a Logistic Regression model using Scikit-learn and print the accuracy on test data."],
                ["Problem 3 · SQL · Medium",
                 "Find employees earning more than the average salary in their department. Table: employees(id, name, dept, salary)"],
              ].map(([num, text], i) => (
                <div key={i} style={{
                  background: "rgba(255,255,255,0.025)",
                  border: `1px solid ${C.border}`,
                  borderRadius: 13, padding: 17,
                }}>
                  <div style={{
                    fontSize: 10, color: C.muted, marginBottom: 7,
                    fontWeight: 700, textTransform: "uppercase",
                    letterSpacing: 0.6,
                  }}>
                    {num}
                  </div>
                  <div style={{
                    fontSize: 13, fontWeight: 500,
                    marginBottom: 12, lineHeight: 1.65,
                  }}>
                    {text}
                  </div>
                  <textarea
                    rows={i === 2 ? 3 : 4}
                    placeholder="Write your code here..."
                    style={{
                      width: "100%",
                      background: "rgba(255,255,255,0.03)",
                      border: `1px solid ${C.border}`,
                      borderRadius: 9, padding: "9px 13px",
                      color: C.text, fontSize: 12,
                      outline: "none", resize: "none",
                    }}
                  />
                </div>
              ))}
              <Button
                full
                onClick={() => alert(
                  "🎉 Submitted!\n\nP1: 9/10 ✅\nP2: 8/10 ✅\nP3: 6/10 ⚠\n\nOverall: 77%"
                )}
              >
                Submit Coding Test →
              </Button>
            </div>

            <Card>
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 14.5, fontWeight: 700, marginBottom: 2,
              }}>
                ⏱ Test Info
              </div>
              <div style={{ fontSize: 12, color: C.text2, marginBottom: 14 }}>
                Current session
              </div>
              <div style={{
                background: "rgba(245,158,11,0.06)",
                border: "1px solid rgba(245,158,11,0.15)",
                borderRadius: 10, padding: "10px 14px", marginBottom: 14,
              }}>
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  alignItems: "center",
                }}>
                  <span style={{ fontSize: 12.5, color: C.text2 }}>
                    Time Remaining
                  </span>
                  <TimerDisplay />
                </div>
              </div>
              <div style={{
                display: "flex", justifyContent: "space-between",
                fontSize: 12.5, marginBottom: 10,
              }}>
                <span style={{ color: C.text2 }}>Problems</span>
                <span style={{ fontWeight: 600 }}>3 total</span>
              </div>
              <div style={{
                display: "flex", justifyContent: "space-between",
                fontSize: 12.5, marginBottom: 16,
              }}>
                <span style={{ color: C.text2 }}>Based on</span>
                <span style={{ fontWeight: 600, color: C.accent }}>
                  Ritika's Resume
                </span>
              </div>
              <InfoBox color="amber" title="💡 Tips" style={{ marginBottom: 0 }}>
                • Correctness first, then optimize<br />
                • Add comments to your code<br />
                • Handle edge cases
              </InfoBox>
            </Card>
          </div>
        </div>
      )}

      {/* ── MCQ Test ── */}
      {tab === "MCQ Test" && (
        <div className="fade-up">
          <InfoBox color="blue"
            title="📝 MCQ Test — 10 Questions · Ritika's Resume Skills"
            style={{ marginBottom: 18 }}>
            Auto-generated from: Python, ML, SQL, Data Analysis. Time: 15 min.
          </InfoBox>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 320px",
            gap: 16,
          }}>
            <div>
              <MCQQuestion
                tags={[[" Python", C.accent], ["Medium", C.accent4]]}
                q="Q1. Which Pandas method removes duplicate rows?"
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
                tags={[["ML", C.accent2], ["Easy", C.accent3]]}
                q="Q2. XGBoost stands for?"
                opts={[
                  "A. Extra Gradient Boost",
                  "B. Extreme Gradient Boosting",
                  "C. Extended Gradient Boosting",
                  "D. None of the above",
                ]}
                correct={1}
                onAnswer={handleAnswer}
              />
              <MCQQuestion
                tags={[["SQL", C.accent7], ["Medium", C.accent4]]}
                q="Q3. Which clause filters groups after aggregation?"
                opts={[
                  "A. WHERE",
                  "B. GROUP BY",
                  "C. HAVING",
                  "D. FILTER",
                ]}
                correct={2}
                onAnswer={handleAnswer}
              />
              <Button
                full
                onClick={() => alert(
                  "📊 Submitted!\n\nCorrect: 8/10\nAccuracy: 80%\n\nStrong: Python, ML\nImprove: SQL"
                )}
              >
                Submit MCQ Test →
              </Button>
            </div>

            <Card>
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 14.5, fontWeight: 700, marginBottom: 2,
              }}>
                📊 Live Score
              </div>
              <div style={{ fontSize: 12, color: C.text2, marginBottom: 14 }}>
                Updates as you answer
              </div>
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 54, fontWeight: 700,
                color: C.accent, letterSpacing: -3,
                marginBottom: 8, lineHeight: 1,
              }}>
                {score.correct}/{score.total}
              </div>
              <div style={{
                fontSize: 12.5, color: C.text2, marginBottom: 14,
              }}>
                Questions answered
              </div>
              <div style={{
                height: 7,
                background: "rgba(255,255,255,0.05)",
                borderRadius: 5, overflow: "hidden", marginBottom: 8,
              }}>
                <div style={{
                  height: "100%",
                  width: `${Math.round(score.correct / score.total * 100)}%`,
                  background: `linear-gradient(90deg,${C.accent3},#059669)`,
                  borderRadius: 5,
                }} />
              </div>
              <div style={{
                fontSize: 11, color: C.accent3,
                fontWeight: 700, marginBottom: 14,
              }}>
                Accuracy: {Math.round(score.correct / score.total * 100)}%
              </div>
              <InfoBox color="green" title="✅ Correct so far"
                style={{ marginBottom: 0 }}>
                Q1: df.drop_duplicates() ✓<br />
                Q2: Extreme Gradient Boosting ✓
              </InfoBox>
            </Card>
          </div>
        </div>
      )}

      {/* ── History ── */}
      {tab === "History" && (
        <div className="fade-up">
          <Card>
            <div style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 14.5, fontWeight: 700, marginBottom: 2,
            }}>
              📈 Test History
            </div>
            <div style={{ fontSize: 12, color: C.text2, marginBottom: 14 }}>
              All past performance tests
            </div>
            <HistoryItem
              name="📝 MCQ Test — Python + ML"
              meta="Feb 24, 2026 · 15 min · 10 questions"
              score="8/10" color={C.accent3}
            />
            <HistoryItem
              name="💻 Coding Test — Resume Based"
              meta="Feb 20, 2026 · 45 min · 3 problems"
              score="2/3" color={C.accent4}
            />
            <HistoryItem
              name="📝 MCQ Test — SQL Focus"
              meta="Feb 15, 2026 · 10 min · 10 questions"
              score="6/10" color={C.accent2}
            />
            <HistoryItem
              name="💻 Coding Test — Python"
              meta="Feb 10, 2026 · 30 min · 2 problems"
              score="2/2" color={C.accent3}
            />
          </Card>
        </div>
      )}
    </div>
  );
};

export default Performance;