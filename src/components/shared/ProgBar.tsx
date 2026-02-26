import React from "react";

interface ProgBarProps {
  value: number;
  color: string;
  height?: number;
}

const ProgBar: React.FC<ProgBarProps> = ({ value, color, height = 5 }) => {
  return (
    <div style={{
      height, background: "rgba(255,255,255,0.05)",
      borderRadius: 5, overflow: "hidden", marginBottom: 4,
    }}>
      <div style={{
        height: "100%", width: `${value}%`,
        background: color, borderRadius: 5,
        transition: "width 1.2s ease",
      }} />
    </div>
  );
};

export default ProgBar;