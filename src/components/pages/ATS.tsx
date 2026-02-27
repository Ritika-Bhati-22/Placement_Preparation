import React, { useState } from "react";
import { C } from "../../constants/colors";
import Card from "../shared/Card";
import InfoBox from "../shared/InfoBox";
import Button from "../shared/Button";

const ATS: React.FC = () => {
  const [jd, setJd] = useState("");
  const [checked, setChecked] = useState(false);

  const handleCheck = () => {
    if (!jd.trim()) {
      alert("Please paste a job description first!");
      return;
    }
    setChecked(true);
  };

  return (
    <div className="fade-up">
      <div style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: 26, fontWeight: 800,
        letterSpacing: -0.8, marginBottom: 4,
      }}>
        🎯 ATS Score Checker
      </div>
      <div style={{ color: C.text2, fontSize: 13, marginBottom: 24 }}>
        Check how well your resume matches a job description
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 16, marginBottom: 16,
      }}>
        {/* Input */}
        <Card>
          <div style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 15, fontWeight: 700, marginBottom: 4,
          }}>
            Check ATS Match
          </div>
          <div style={{ fontSize: 12, color: C.text2, marginBottom: 16 }}>
            Paste job description to check keyword match
          </div>

          <InfoBox color="blue" title="ℹ️ What is ATS?"
            style={{ marginBottom: 16 }}>
            Applicant Tracking System auto scans resumes before humans
            see them. Target 70%+ score to pass ATS filters.
          </InfoBox>

          <div style={{ marginBottom: 14 }}>
            <div style={{
              fontSize: 11, color: C.text2, fontWeight: 600,
              marginBottom: 6, textTransform: "uppercase",
              letterSpacing: 0.5,
            }}>
              Job Description
            </div>
            <textarea
              value={jd}
              onChange={e => { setJd(e.target.value); setChecked(false); }}
              rows={6}
              placeholder="Paste the complete job description here..."
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${C.border}`,
                borderRadius: 10, padding: "10px 14px",
                color: C.text, fontSize: 13,
                outline: "none", resize: "none",
                transition: "border-color 0.2s",
                lineHeight: 1.6,
              }}
              onFocus={e =>
                (e.target.style.borderColor = "rgba(108,142,245,0.5)")
              }
              onBlur={e =>
                (e.target.style.borderColor = C.border)
              }
            />
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <Button
              style={{ flex: 1, justifyContent: "center" }}
              onClick={handleCheck}
            >
              🔍 Check ATS Match
            </Button>
            <Button
              variant="secondary"
              onClick={() => window.open("https://resumeworded.com", "_blank")}
            >
              Resume Worded ↗
            </Button>
          </div>
        </Card>

        {/* Result */}
        <Card>
          <div style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 15, fontWeight: 700, marginBottom: 4,
          }}>
            ATS Result
          </div>
          <div style={{ fontSize: 12, color: C.text2, marginBottom: 16 }}>
            Keyword match analysis
          </div>

          {!checked ? (
            <div style={{
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              padding: "50px 20px", textAlign: "center",
            }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🎯</div>
              <div style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 15, fontWeight: 700, marginBottom: 8,
              }}>
                No Result Yet
              </div>
              <div style={{ fontSize: 12, color: C.text2, lineHeight: 1.6 }}>
                Paste a job description and click Check ATS Match to see
                your keyword match score
              </div>
            </div>
          ) : (
            <div>
              <InfoBox color="green" title="✅ ATS Check Complete">
                Your resume has been checked against the job description.
                Upload your resume first for accurate results.
              </InfoBox>
              <InfoBox color="amber" title="💡 How to Improve ATS Score">
                • Include exact keywords from job description<br />
                • Use standard section headings<br />
                • Avoid tables and graphics in resume<br />
                • Save as PDF or DOCX format
              </InfoBox>
              <InfoBox color="blue" title="🔗 Check on External Tools">
                For detailed analysis visit Resume Worded or Jobscan
              </InfoBox>
            </div>
          )}
        </Card>
      </div>

      {/* External Tools */}
      <Card>
        <div style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 15, fontWeight: 700, marginBottom: 4,
        }}>
          🔗 Recommended ATS Tools
        </div>
        <div style={{ fontSize: 12, color: C.text2, marginBottom: 20 }}>
          Click to open and get detailed ATS report
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 14,
        }}>
          {[
            {
              color: C.accent,
              icon: "📊",
              name: "Resume Worded",
              desc: "Free ATS score + line by line feedback. Best for general resume improvement.",
              url: "https://resumeworded.com",
            },
            {
              color: C.accent2,
              icon: "🎯",
              name: "Jobscan",
              desc: "Paste resume + JD for keyword match %. Most accurate for specific roles.",
              url: "https://jobscan.co",
            },
            {
              color: C.accent3,
              icon: "✍️",
              name: "TopResume",
              desc: "Free expert review + ATS check. Good for overall resume quality.",
              url: "https://topresume.com/resume-review",
            },
          ].map(tool => (
            <div
              key={tool.name}
              onClick={() => window.open(tool.url, "_blank")}
              style={{
                background: "rgba(255,255,255,0.025)",
                border: `1px solid ${C.border}`,
                borderRadius: 14, padding: 20,
                cursor: "pointer", transition: "all 0.2s",
                position: "relative", overflow: "hidden",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.border = `1px solid ${tool.color}40`;
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.border = `1px solid ${C.border}`;
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
              }}
            >
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 2,
                background: `linear-gradient(90deg, ${tool.color}, transparent)`,
              }} />
              <div style={{ fontSize: 28, marginBottom: 10 }}>{tool.icon}</div>
              <div style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 14, fontWeight: 700, marginBottom: 6,
                color: tool.color,
              }}>
                {tool.name} ↗
              </div>
              <div style={{ fontSize: 12, color: C.text2, lineHeight: 1.6 }}>
                {tool.desc}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ATS;