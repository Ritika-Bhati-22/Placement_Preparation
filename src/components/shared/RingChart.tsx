import React from "react";
import type { RingChartProps } from "../../types";
import { C } from "../../constants/colors";

const RingChart: React.FC<RingChartProps> = ({ value, color, size = 88 }) => {
  const r = (size / 2) - 8;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;

  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={7}
        />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke={color} strokeWidth={7}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1.5s cubic-bezier(0.4,0,0.2,1)" }}
        />
      </svg>
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
      }}>
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 20, fontWeight: 700, color, lineHeight: 1,
        }}>
          {value}
        </span>
        <span style={{ fontSize: 9, color: C.muted, marginTop: 1 }}>/100</span>
      </div>
    </div>
  );
};

export default RingChart;