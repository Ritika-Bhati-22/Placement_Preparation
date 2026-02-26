import React, { useState } from "react";
import { C } from "../../constants/colors";
import Card from "../shared/Card";
import InfoBox from "../shared/InfoBox";
import Chip from "../shared/Chip";
import Button from "../shared/Button";

const ATSSite: React.FC<{
  name: string; sub: string;
  score: string; scoreColor: string;
  onClick?: () => void;
}> = ({ name, sub, score, scoreColor, onClick }) => {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        padding: "13px 15px",
        background: hov
          ? "rgba(255,255,255,0.04)"
          : "rgba(255,255,255,0.025)",
        border: `1px solid ${hov ? C.borderBright : C.border}`,
        borderRadius: 12, marginBottom: 9,
        transition: "all 0.18s",
        transform: hov ? "translateX(3px)" : "none",
        cursor: onClick ? "pointer" : "default",
      }}
    >
      <div>
        <div style={{
          fontWeight: 600, fontSize: 13,
          fontFamily: "'Space Grotesk', sans-serif",
        }}>
          {name}
        </div>
        <div style={{ fontSize: 10.5, color: C.text2, marginTop: 2 }}>
          {sub}
        </div>
      </div>
      <div style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 22, fontWeight: 700, color: scoreColor,
      }}>
        {score}
      </div>
    </div>
  );
};

const ATS: React.FC = () => {
  const [jd, setJd] = useState("");

  return (
    <div className="fade-up">
      <div style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 26, fontWeight: 700,
        letterSpacing: -0.8, marginBottom: 3,
      }}>
        🎯 ATS Score Checker
      </div>
      <div style={{ color: C.text2, fontSize: 13, marginBottom: 22 }}>
        Check resume ATS compatibility — get real keyword match scores
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 16, marginBottom: 16,
      }}>
        {/* Input */}
        <Card>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 14.5, fontWeight: 700, marginBottom: 2,
          }}>
            Check ATS Match
          </div>
          <div style={{ fontSize: 12, color: C.text2, marginBottom: 14 }}>
            Paste a job description to check keyword match
          </div>
          <InfoBox color="blue" title="ℹ What is ATS?" style={{ marginBottom: 16 }}>
            Applicant Tracking System auto-scans resumes before humans
            see them. If your keywords don't match the JD, resume gets
            auto-rejected. Target: 70%+ score.
          </InfoBox>
          <div style={{ marginBottom: 13 }}>
            <div style={{
              fontSize: 11, color: C.text2,
              fontWeight: 600, marginBottom: 5,
            }}>
              Paste Job Description
            </div>
            <textarea
              value={jd}
              onChange={e => setJd(e.target.value)}
              rows={5}
              placeholder="Paste the job description here..."
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${C.border}`,
                borderRadius: 10, padding: "9px 13px",
                color: C.text, fontSize: 13,
                outline: "none", resize: "none",
              }}
            />
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <Button
              style={{ flex: 1, justifyContent: "center" }}
              onClick={() => alert("✅ ATS check complete!")}
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

        {/* Scores */}
        <Card>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 14.5, fontWeight: 700, marginBottom: 2,
          }}>
            ATS Scores
          </div>
          <div style={{ fontSize: 12, color: C.text2, marginBottom: 14 }}>
            Results from top ATS checkers
          </div>

          <ATSSite
            name="📊 Resume Worded"
            sub="resumeworded.com · Free + Paid"
            score="68/100"
            scoreColor={C.accent4}
            onClick={() => window.open("https://resumeworded.com", "_blank")}
          />
          <ATSSite
            name="🎯 Jobscan"
            sub="jobscan.co · Best JD matcher"
            score="72%"
            scoreColor={C.accent3}
            onClick={() => window.open("https://jobscan.co", "_blank")}
          />
          <ATSSite
            name="⚡ PlacementAI Score"
            sub="Our AI keyword match"
            score="74%"
            scoreColor={C.accent}
          />

          <div style={{ marginTop: 14 }}>
            <div style={{
              fontSize: 11, fontWeight: 700,
              color: C.accent5, marginBottom: 9,
            }}>
              ❌ Missing Keywords
            </div>
            <div style={{
              display: "flex", flexWrap: "wrap",
              gap: 6, marginBottom: 12,
            }}>
              {["Docker", "AWS", "Spark", "A/B Testing", "REST API"].map(k => (
                <Chip key={k} color={C.accent5} borderColor="rgba(242,82,82,0.2)">
                  {k}
                </Chip>
              ))}
            </div>
            <div style={{
              fontSize: 11, fontWeight: 700,
              color: C.accent3, marginBottom: 9,
            }}>
              ✅ Matched Keywords
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {["Python", "Machine Learning", "SQL", "Data Analysis"].map(k => (
                <Chip key={k} color={C.accent3} borderColor="rgba(16,217,140,0.2)">
                  {k}
                </Chip>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* External Links */}
      <Card>
        <div style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 14.5, fontWeight: 700, marginBottom: 2,
        }}>
          🔗 Open ATS Checker Websites
        </div>
        <div style={{ fontSize: 12, color: C.text2, marginBottom: 14 }}>
          Click to open — upload resume and get a detailed report
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 14,
        }}>
          <InfoBox
            color="blue"
            title="📊 Resume Worded ↗"
            style={{ marginBottom: 0, cursor: "pointer" }}
            onClick={() => window.open("https://resumeworded.com", "_blank")}
          >
            Free ATS score + line-by-line feedback. Gives score out of
            100. Best for general resume improvement.
          </InfoBox>
          <InfoBox
            color="purple"
            title="🎯 Jobscan ↗"
            style={{ marginBottom: 0, cursor: "pointer" }}
            onClick={() => window.open("https://jobscan.co", "_blank")}
          >
            Paste resume + JD for % keyword match. Most accurate for
            specific job roles and companies.
          </InfoBox>
          <InfoBox
            color="green"
            title="✍ TopResume ↗"
            style={{ marginBottom: 0, cursor: "pointer" }}
            onClick={() => window.open("https://topresume.com/resume-review", "_blank")}
          >
            Free expert review + ATS check. Good for overall resume
            quality and professional feedback.
          </InfoBox>
        </div>
      </Card>
    </div>
  );
};

export default ATS;