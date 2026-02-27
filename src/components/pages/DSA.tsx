import React, { useState } from "react";
import { C } from "../../constants/colors";
import { DSA_DATA, DIFF_COLORS } from "../../constants/dsaData";
import Card from "../shared/Card";
import InfoBox from "../shared/InfoBox";
import Tabs from "../shared/Tabs";
import Button from "../shared/Button";

const DSA: React.FC = () => {
  const [selected, setSelected]   = useState(1);
  const [code, setCode]           = useState(DSA_DATA[1].c);
  const [result, setResult]       = useState<"pass" | "hint" | null>(null);
  const [activeTab, setActiveTab] = useState("All");

  const d = DSA_DATA[selected];

  const loadProblem = (id: number) => {
    setSelected(id);
    setCode(DSA_DATA[id].c);
    setResult(null);
  };

  return (
    <div className="fade-up">
      <div style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: 26, fontWeight: 800,
        letterSpacing: -0.8, marginBottom: 4,
      }}>
        💻 DSA Practice
      </div>
      <div style={{ color: C.text2, fontSize: 13, marginBottom: 24 }}>
        Practice Data Structures and Algorithms problems
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
            fontFamily: "'Outfit', sans-serif",
            fontSize: 15, fontWeight: 700, marginBottom: 4,
          }}>
            📋 Problems
          </div>
          <div style={{ fontSize: 12, color: C.text2, marginBottom: 16 }}>
            Click any problem to load in editor
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
                  padding: "13px 15px",
                  background: isActive
                    ? "linear-gradient(135deg, rgba(108,142,245,0.1), rgba(167,139,250,0.07))"
                    : "rgba(255,255,255,0.025)",
                  border: `1px solid ${isActive
                    ? "rgba(108,142,245,0.25)"
                    : C.border}`,
                  borderRadius: 12, marginBottom: 8,
                  cursor: "pointer", transition: "all 0.18s",
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
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: 8,
                    background: isActive
                      ? "rgba(108,142,245,0.15)"
                      : "rgba(255,255,255,0.04)",
                    display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: 13,
                    fontWeight: 700, color: isActive ? C.accent : C.text2,
                    fontFamily: "'Outfit', sans-serif",
                  }}>
                    {id}
                  </div>
                  <div>
                    <div style={{
                      fontWeight: 600, fontSize: 13,
                      fontFamily: "'Outfit', sans-serif",
                      marginBottom: 2,
                    }}>
                      {prob.t}
                    </div>
                    <div style={{ fontSize: 11, color: C.text2 }}>
                      {prob.topic}
                    </div>
                  </div>
                </div>
                <span style={{
                  fontSize: 10, padding: "3px 10px",
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

        {/* Editor */}
        <Card>
          <div style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 15, fontWeight: 700, marginBottom: 2,
          }}>
            💡 {d.t}
          </div>
          <div style={{ fontSize: 12, color: C.text2, marginBottom: 16 }}>
            {d.s}
          </div>

          {/* Problem */}
          <div style={{
            background: "rgba(255,255,255,0.025)",
            border: `1px solid ${C.border}`,
            borderRadius: 12, padding: 16, marginBottom: 14,
          }}>
            <div style={{ display: "flex", gap: 7, marginBottom: 10 }}>
              <span style={{
                fontSize: 10, padding: "3px 10px",
                borderRadius: 20, fontWeight: 700,
                background: `${DIFF_COLORS[d.diff]}18`,
                color: DIFF_COLORS[d.diff],
              }}>
                {d.diff.charAt(0).toUpperCase() + d.diff.slice(1)}
              </span>
              <span style={{
                fontSize: 10, padding: "3px 10px",
                borderRadius: 20, fontWeight: 700,
                background: "rgba(167,139,250,0.12)",
                color: C.accent2,
              }}>
                {d.topic}
              </span>
            </div>
            <div style={{
              fontSize: 13, lineHeight: 1.7,
              whiteSpace: "pre-line", color: C.text,
            }}>
              {d.p}
            </div>
          </div>

          {/* Code Editor */}
          <div style={{
            fontSize: 11, color: C.text2,
            fontWeight: 600, marginBottom: 6,
            textTransform: "uppercase", letterSpacing: 0.5,
          }}>
            Your Solution
          </div>
          <textarea
            value={code}
            onChange={e => setCode(e.target.value)}
            rows={8}
            style={{
              width: "100%",
              background: "rgba(0,0,0,0.45)",
              border: `1px solid ${C.border}`,
              borderRadius: 12, padding: 16,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12.5, color: "#86efac",
              lineHeight: 1.9, outline: "none",
              resize: "vertical", marginBottom: 12,
            }}
          />

          <div style={{ display: "flex", gap: 8 }}>
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
            <Button variant="secondary"
              onClick={() => alert("Review the solution above!")}>
              👁 Solution
            </Button>
          </div>

          {result === "pass" && (
            <InfoBox color="green" title="✅ All Test Cases Passed!"
              style={{ marginTop: 12, marginBottom: 0 }}>
              Time Complexity: O(n) · Space: O(n) · Runtime: 48ms
            </InfoBox>
          )}
          {result === "hint" && (
            <InfoBox color="amber" title="💡 Hint"
              style={{ marginTop: 12, marginBottom: 0 }}>
              Use a HashMap to store elements seen so far. For each
              element check if its complement exists in the map.
            </InfoBox>
          )}
        </Card>
      </div>
    </div>
  );
};

export default DSA;