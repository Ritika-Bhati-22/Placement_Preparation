import React, { useState } from "react";
import { C } from "../../constants/colors";
import Card from "../shared/Card";
import InfoBox from "../shared/InfoBox";
import Button from "../shared/Button";

const Resume: React.FC = () => {
  const [uploaded, setUploaded] = useState(false);
  const [filename, setFilename] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [analyzed, setAnalyzed] = useState(false);

  const handleAnalyze = () => {
    if (!uploaded) {
      alert("Please upload your resume first!");
      return;
    }
    setAnalyzed(true);
  };

  return (
    <div className="fade-up">
      <div style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: 26, fontWeight: 800,
        letterSpacing: -0.8, marginBottom: 4,
      }}>
        📄 Resume Analyzer
      </div>
      <div style={{ color: C.text2, fontSize: 13, marginBottom: 24 }}>
        Upload your resume to get AI powered analysis and improvement tips
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 16, marginBottom: 16,
      }}>
        {/* Upload Card */}
        <Card>
          <div style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 15, fontWeight: 700, marginBottom: 4,
          }}>
            Upload Resume
          </div>
          <div style={{ fontSize: 12, color: C.text2, marginBottom: 16 }}>
            PDF format recommended
          </div>

          {/* Drop Zone */}
          <div
            onClick={() => document.getElementById("rfInput")?.click()}
            style={{
              border: `2px dashed ${uploaded
                ? "rgba(52,211,153,0.4)"
                : "rgba(108,142,245,0.25)"}`,
              borderRadius: 16, padding: "40px 20px",
              textAlign: "center", cursor: "pointer",
              background: uploaded
                ? "rgba(52,211,153,0.04)"
                : "rgba(108,142,245,0.03)",
              transition: "all 0.25s",
            }}
            onMouseEnter={e => {
              if (!uploaded) {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(108,142,245,0.5)";
                (e.currentTarget as HTMLDivElement).style.background = "rgba(108,142,245,0.07)";
              }
            }}
            onMouseLeave={e => {
              if (!uploaded) {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(108,142,245,0.25)";
                (e.currentTarget as HTMLDivElement).style.background = "rgba(108,142,245,0.03)";
              }
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 12 }}>
              {uploaded ? "✅" : "📤"}
            </div>
            <div style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 15, fontWeight: 700, marginBottom: 6,
            }}>
              {uploaded ? filename : "Drop your Resume here"}
            </div>
            <div style={{ fontSize: 12, color: C.text2 }}>
              {uploaded
                ? "File uploaded successfully"
                : "Click to browse · PDF, DOC, DOCX"}
            </div>
            <input
              id="rfInput"
              type="file"
              accept=".pdf,.doc,.docx"
              style={{ display: "none" }}
              onChange={e => {
                if (e.target.files?.[0]) {
                  setFilename(e.target.files[0].name);
                  setUploaded(true);
                  setAnalyzed(false);
                }
              }}
            />
          </div>

          <div style={{ marginTop: 16 }}>
            <div style={{ marginBottom: 14 }}>
              <div style={{
                fontSize: 11, color: C.text2,
                fontWeight: 600, marginBottom: 6,
                textTransform: "uppercase", letterSpacing: 0.5,
              }}>
                Target Job Role
              </div>
              <input
                value={jobRole}
                onChange={e => setJobRole(e.target.value)}
                placeholder="e.g. Data Scientist, SDE, ML Engineer"
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid ${C.border}`,
                  borderRadius: 10, padding: "10px 14px",
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
            </div>
            <Button full onClick={handleAnalyze}>
              🔍 Analyze Resume
            </Button>
          </div>
        </Card>

        {/* Result Card */}
        <Card>
          <div style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 15, fontWeight: 700, marginBottom: 4,
          }}>
            Analysis Result
          </div>
          <div style={{ fontSize: 12, color: C.text2, marginBottom: 16 }}>
            AI powered section wise scoring
          </div>

          {!analyzed ? (
            <div style={{
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              padding: "50px 20px", textAlign: "center",
            }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>📊</div>
              <div style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 15, fontWeight: 700, marginBottom: 8,
              }}>
                No Analysis Yet
              </div>
              <div style={{ fontSize: 12, color: C.text2, lineHeight: 1.6 }}>
                Upload your resume and click Analyze to see your score,
                extracted skills, and improvement suggestions
              </div>
            </div>
          ) : (
            <div>
              <InfoBox color="green" title="✅ Resume Analyzed Successfully">
                Your resume has been analyzed. Here are the results based
                on your uploaded file{jobRole ? ` for ${jobRole} role` : ""}.
              </InfoBox>
              <InfoBox color="blue" title="📌 Next Steps">
                • Check ATS Score to match with job descriptions<br />
                • Review Interview Prep for topic wise questions<br />
                • Practice DSA problems daily
              </InfoBox>
              <InfoBox color="amber" title="💡 Quick Tips">
                • Add GitHub links to all projects<br />
                • Quantify achievements with numbers<br />
                • Use strong action verbs: Built, Designed, Optimized
              </InfoBox>
            </div>
          )}
        </Card>
      </div>

      {/* How it works */}
      {!analyzed && (
        <Card>
          <div style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 15, fontWeight: 700, marginBottom: 4,
          }}>
            How It Works
          </div>
          <div style={{ fontSize: 12, color: C.text2, marginBottom: 20 }}>
            3 simple steps to analyze your resume
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 16,
          }}>
            {[
              { step: "01", icon: "📤", title: "Upload Resume", desc: "Upload your resume in PDF or DOC format" },
              { step: "02", icon: "🔍", title: "AI Analysis",   desc: "Our AI scans and scores every section" },
              { step: "03", icon: "📈", title: "Get Results",   desc: "Get detailed feedback and improvement tips" },
            ].map(s => (
              <div key={s.step} style={{
                background: "rgba(255,255,255,0.025)",
                border: `1px solid ${C.border}`,
                borderRadius: 14, padding: 20,
                textAlign: "center",
              }}>
                <div style={{
                  fontSize: 11, fontWeight: 700,
                  color: C.accent, letterSpacing: 1,
                  marginBottom: 10,
                }}>
                  STEP {s.step}
                </div>
                <div style={{ fontSize: 32, marginBottom: 10 }}>
                  {s.icon}
                </div>
                <div style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 14, fontWeight: 700, marginBottom: 6,
                }}>
                  {s.title}
                </div>
                <div style={{ fontSize: 12, color: C.text2, lineHeight: 1.6 }}>
                  {s.desc}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default Resume;