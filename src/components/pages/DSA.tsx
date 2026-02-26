import React, { useState } from "react";
import type { C } from "../../constants/colors";
import { DSA_DATA, DIFF_COLORS } from "../../constants/dsaData";
import Card from "../shared/Card";
import StatCard from "../shared/StatCard";
import InfoBox from "../shared/InfoBox";
import Tabs from "../shared/Tabs";
import Button from "../shared/Button";

const DSA: React.FC = () => {
  const [selected, setSelected] = useState(1);
  const [code, setCode]         = useState(DSA_DATA[1].c);
  const [result, setResult]     = useState<"pass" | "hint" | null>(null);
  const [activeTab, setActiveTab] = useState("All");

  const d = DSA_DATA[selected];

  const loadProblem = (id: number) => {
    setSelected(id);
    setCode(DSA_DATA[id].c);
    setResult(null);
  };

  return (
    <div className="fade-up">
      {/* Header */}
      <div style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 26, fontWeight: 700,
        letterSpacing: -0.8, marginBottom: 3,
      }}>
        💻 DSA Coding Practice
      </div>
      <div style={{ color: C.text2, fontSize: 13, marginBottom: 22 }}>
        Practice Data Structures & Algorithms — 50+ problems with hints
      </div>

      {/* Stats */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: 13, marginBottom: 16,
      }}>
        <StatCard label="Easy Solved"   value={18} change="of 30 easy"    color="green"  />
        <StatCard label="Medium Solved" value={22} change="of 60 medium"  color="amber"  />
        <StatCard label="Hard Solved"   value={7}  change="of 30 hard"    color="red"    />
        <StatCard label="Total Solved"  value={47} change="of 120 total"  color="blue"   />
      </div>

      <Tabs
        items={["All", "Arrays", "Strings", "Trees", "DP"]}
        active={activeTab}
        onChange={setActiveTab}
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Problem List */}
        <Card>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 14.5, fontWeight: 700, marginBottom: 2,
          }}>
            📋 Problem List
          </div>
          <div style={{ fontSize: 12, color: C.text2, marginBottom: 14 }}>
            Click any problem to load it
          </div>

          {Object.entries(DSA_DATA).map(([id, prob]) => {
            const isActive = selected === Number(id);
            return (
              <div
                key={id}
                onClick={() => loadProblem(Number(id))}
                style={{
                  display: "flex", alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 14px",
                  background: isActive
                    ? "rgba(91,141,246,0.08)"
                    : "rgba(255,255,255,0.025)",
                  border: `1px solid ${isActive
                    ? "rgba(91,141,246,0.2)"
                    : C.border}`,
                  borderRadius: 12, marginBottom: 7,
                  cursor: "pointer", transition: "all 0.15s",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: 7,
                    background: "rgba(255,255,255,0.04)",
                    display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: 12,
                  }}>
                    {isActive ? "🔵" : "⬜"}
                  </div>
                  <div>
                    <div style={{
                      fontWeight: 600, fontSize: 13,
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}>
                      {id}. {prob.t}
                    </div>
                    <div style={{ fontSize: 11, color: C.text2 }}>
                      {prob.topic}
                    </div>
                  </div>
                </div>
                <span style={{
                  fontSize: 10, padding: "2px 9px",
                  borderRadius: 20, fontWeight: 700,
                  background: `${DIFF_COLORS[prob.diff]}18`,
                  color: DIFF_COLORS[prob.diff],
                }}>
                  {prob.diff.charAt(0).toUpperCase() + prob.diff.slice(1)}
                </span>
              </div>
            );
          })}
        </Card>

        {/* Code Editor */}
        <Card>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 14.5, fontWeight: 700, marginBottom: 2,
          }}>
            💡 {d.t}
          </div>
          <div style={{ fontSize: 12, color: C.text2, marginBottom: 14 }}>
            {d.s}
          </div>

          {/* Problem Statement */}
          <div style={{
            background: "rgba(255,255,255,0.025)",
            border: `1px solid ${C.border}`,
            borderRadius: 13, padding: 18, marginBottom: 14,
          }}>
            <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
              <span style={{
                fontSize: 10, padding: "2px 9px",
                borderRadius: 20, fontWeight: 700,
                background: `${DIFF_COLORS[d.diff]}18`,
                color: DIFF_COLORS[d.diff],
              }}>
                {d.diff.charAt(0).toUpperCase() + d.diff.slice(1)}
              </span>
              <span style={{
                fontSize: 10, padding: "2px 9px",
                borderRadius: 20, fontWeight: 700,
                background: "rgba(139,92,246,0.12)",
                color: C.accent2,
              }}>
                {d.topic}
              </span>
            </div>
            <div style={{
              fontSize: 13, fontWeight: 500,
              lineHeight: 1.65, whiteSpace: "pre-line",
            }}>
              {d.p}
            </div>
          </div>

          {/* Code */}
          <div style={{
            fontSize: 11, color: C.text2,
            fontWeight: 600, marginBottom: 5,
          }}>
            Your Solution (Python)
          </div>
          <textarea
            value={code}
            onChange={e => setCode(e.target.value)}
            rows={7}
            style={{
              width: "100%",
              background: "rgba(0,0,0,0.4)",
              border: `1px solid ${C.border}`,
              borderRadius: 12, padding: 15,
              fontFamily: "'Courier New', monospace",
              fontSize: 12, color: "#86efac",
              lineHeight: 1.85, outline: "none",
              resize: "vertical", marginBottom: 10,
            }}
          />

          <div style={{ display: "flex", gap: 7 }}>
            <Button
              variant="green"
              style={{ flex: 1, justifyContent: "center" }}
              onClick={() => setResult("pass")}
            >
              ▶ Run Code
            </Button>
            <Button variant="secondary" onClick={() => setResult("hint")}>
              💡 Hint
            </Button>
            <Button variant="secondary" onClick={() => alert("Review the solution in the editor!")}>
              👁 Solution
            </Button>
          </div>

          {result === "pass" && (
            <InfoBox color="green" title="✅ All Test Cases Passed: 3/3"
              style={{ marginTop: 12, marginBottom: 0 }}>
              Time: O(n) · Space: O(n) · Runtime: 48ms · Beats 87%
            </InfoBox>
          )}
          {result === "hint" && (
            <InfoBox color="amber" title="💡 Hint"
              style={{ marginTop: 12, marginBottom: 0 }}>
              Use a HashMap to store elements seen so far. For each new
              element, check if its complement (target - element) exists
              in the map.
            </InfoBox>
          )}
        </Card>
      </div>
    </div>
  );
};

export default DSA;