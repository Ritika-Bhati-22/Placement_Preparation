import React from "react";
import { C } from "../../constants/colors";
import type { StatCardProps } from "../../types";

const colorMap: Record<string, string> = {
  blue:   C.accent,
  purple: C.accent2,
  green:  C.accent3,
  amber:  C.accent4,
  red:    C.accent5,
};

const StatCard: React.FC<StatCardProps> = ({ label, value, change, color }) => {
  const c = colorMap[color] || C.accent;
  return (
    <div style={{
      background: C.surface,
      border: `1px solid ${c}30`,
      borderRadius: 14, padding: 16,
      position: "relative", overflow: "hidden",
      transition: "transform 0.2s, box-shadow 0.2s",
    }}>
      <div style={{
        position: "absolute", inset: 0, borderRadius: 14,
        background: `linear-gradient(135deg, ${c}10, transparent)`,
        pointerEvents: "none",
      }} />
      <div style={{
        fontSize: 10.5, color: C.text2, fontWeight: 600,
        marginBottom: 8, textTransform: "uppercase",
        letterSpacing: 0.7, position: "relative"
      }}>
        {label}
      </div>
      <div style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 34, fontWeight: 700,
        letterSpacing: -2, lineHeight: 1,
        marginBottom: 4, color: c, position: "relative"
      }}>
        {value}
      </div>
      <div style={{ fontSize: 11, color: C.accent3, position: "relative" }}>
        {change}
      </div>
    </div>
  );
};

export default StatCard;