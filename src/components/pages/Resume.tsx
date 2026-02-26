import React, { useState } from "react";
import type { C } from "../../constants/colors";
import Card from "../shared/Card";
import InfoBox from "../shared/InfoBox";
import RingChart from "../shared/RingChart";
import Chip from "../shared/Chip";
import Button from "../shared/Button";

const Resume: React.FC = () => {
  const [uploaded, setUploaded] = useState(false);
  const [filename, setFilename] = useState("");

  return (
    <div className="fade-up">
      <div style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 26, fontWeight: 700,
        letterSpacing: -0.8, marginBottom: 3,
      }}>
        📄 Resume Analyzer
      </div>
      <div style={{ color: C.text2, fontSize: 13, marginBottom: 22 }}>
        AI extracts skills, scores sections, and gives improvement tips
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 16, marginBottom: 16,
      }}>
        {/* Upload */}
        <Card>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 14.5, fontWeight: 700, marginBottom: 2,
          }}>
            Upload Resume
          </div>
          <div style={{ fontSize: 12, color: C.text2, marginBottom: 14 }}>
            PDF format only
          </div>

          <div
            onClick={() => document.getElementById("rfInput")?.click()}
            style={{
              border: `2px dashed ${uploaded
                ? "rgba(16,217,140,0.4)"
                : "rgba(91,141,246,0.22)"}`,
              borderRadius: 14, padding: 36,
              textAlign: "center", cursor: "pointer",
              background: uploaded
                ? "rgba(16,217,140,0.04)"
                : "rgba(91,141,246,0.025)",
              transition: "all 0.2s",
            }}
          >
            <div style={{ fontSize: 36, marginBottom: 10 }}>
              {uploaded ? "✅" : "📄"}
            </div>
            <div style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 14.5, fontWeight: 700, marginBottom: 5,
            }}>
              {uploaded ? filename : "Drop your Resume here"}
            </div>
            <div style={{ fontSize: 12, color: C.text2 }}>
              {uploaded ? "Uploaded successfully" : "or click to browse · PDF only"}
            </div>
            <input
              id="rfInput"
              type="file"
              accept=".pdf"
              style={{ display: "none" }}
              onChange={e => {
                if (e.target.files?.[0]) {
                  setFilename(e.target.files[0].name);
                  setUploaded(true);
                }
              }}
            />
          </div>

          <div style={{ marginTop: 14 }}>
            <div style={{ marginBottom: 13 }}>
              <div style={{
                fontSize: 11, color: C.text2,
                fontWeight: 600, marginBottom: 5,
              }}>
                Target Job Role (optional)
              </div>
              <input
                placeholder="e.g. Data Scientist, ML Engineer"
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid ${C.border}`,
                  borderRadius: 10, padding: "9px 13px",
                  color: C.text, fontSize: 13, outline: "none",
                }}
              />
            </div>
            <Button full onClick={() => alert("✅ Resume analyzed!")}>
              🔍 Analyze Resume
            </Button>
          </div>
        </Card>

        {/* Score */}
        <Card>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 14.5, fontWeight: 700, marginBottom: 2,
          }}>
            Resume Score
          </div>
          <div style={{ fontSize: 12, color: C.text2, marginBottom: 14 }}>
            AI-powered section-wise analysis
          </div>

          <div style={{
            display: "flex", alignItems: "center",
            gap: 20, marginBottom: 18,
          }}>
            <RingChart value={74} color={C.accent} />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 9 }}>
              {[
                ["Skills",     85, C.accent],
                ["Projects",   78, C.accent2],
                ["Experience", 60, C.accent3],
                ["Education",  82, C.accent4],
                ["Format",     68, C.accent6],
              ].map(([label, val, color]) => (
                <div key={label as string} style={{
                  display: "flex", alignItems: "center",
                  gap: 9, fontSize: 11,
                }}>
                  <span style={{ color: C.text2, width: 76 }}>{label}</span>
                  <div style={{
                    flex: 1, height: 4,
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: 4, overflow: "hidden",
                  }}>
                    <div style={{
                      height: "100%",
                      width: `${val}%`,
                      background: color as string,
                      borderRadius: 4,
                    }} />
                  </div>
                  <span style={{ fontWeight: 700, color: C.text }}>{val}</span>
                </div>
              ))}
            </div>
          </div>

          <InfoBox color="red" title="⚠ Suggestions to Improve">
            • Add GitHub links to all projects<br />
            • Quantify achievements (e.g. "reduced load time by 40%")<br />
            • Add LinkedIn profile URL<br />
            • Use strong action verbs: Built, Designed, Optimized
          </InfoBox>
        </Card>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 16,
      }}>
        {/* Skills */}
        <Card>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 14.5, fontWeight: 700, marginBottom: 2,
          }}>
            🔍 Extracted Skills
          </div>
          <div style={{ fontSize: 12, color: C.text2, marginBottom: 14 }}>
            Auto-detected using NLP
          </div>
          <div style={{
            display: "flex", flexWrap: "wrap",
            gap: 7, marginBottom: 14,
          }}>
            {[
              ["Python",          C.accent,  "rgba(91,141,246,0.2)"],
              ["Machine Learning",C.accent3, "rgba(16,217,140,0.2)"],
              ["SQL",             C.accent2, "rgba(139,92,246,0.2)"],
              ["Data Analysis",   C.accent4, "rgba(245,158,11,0.2)"],
              ["Pandas",          C.accent7, "rgba(34,211,238,0.2)"],
              ["Scikit-learn",    C.accent,  ""],
              ["TensorFlow",      C.accent5, ""],
              ["Matplotlib",      "",        ""],
              ["Git",             "",        ""],
              ["Flask",           "",        ""],
            ].map(([s, c, b]) => (
              <Chip
                key={s}
                color={c || C.text2}
                borderColor={b || C.border}
              >
                {s}
              </Chip>
            ))}
          </div>
          <InfoBox color="amber" title="💡 Missing Skills for DS Role">
            Consider adding: Docker, Spark, Power BI, NLP, Deep Learning, AWS/GCP
          </InfoBox>
        </Card>

        {/* Projects */}
        <Card>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 14.5, fontWeight: 700, marginBottom: 2,
          }}>
            📂 Extracted Projects
          </div>
          <div style={{ fontSize: 12, color: C.text2, marginBottom: 14 }}>
            Found in your resume
          </div>
          <InfoBox color="blue" title="1. Fake News Detection System">
            Tech: Python, NLP, Scikit-learn · Accuracy: 92%<br />
            💡 Add: GitHub link, dataset size, deployment info
          </InfoBox>
          <InfoBox color="purple" title="2. Student Performance Predictor">
            Tech: XGBoost, Pandas, Streamlit<br />
            💡 Add: Live demo link, quantify improvement
          </InfoBox>
          <InfoBox color="green" title="3. Movie Recommendation System">
            Tech: Collaborative filtering, Flask<br />
            💡 Add: Number of users, algorithm details
          </InfoBox>
        </Card>
      </div>
    </div>
  );
};

export default Resume;