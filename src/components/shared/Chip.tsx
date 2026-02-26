import React, { useState } from "react";
import { C } from "../../constants/colors";
import { ChipProps } from "../../types";

const Chip: React.FC<ChipProps> = ({ children, color, borderColor, onClick }) => {
  const [hov, setHov] = useState(false);
  return (
    <span
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex", alignItems: "center",
        fontSize: 11, padding: "3px 10px",
        borderRadius: 20, fontWeight: 600,
        background: hov ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.04)",
        color: color || C.text2,
        border: `1px solid ${borderColor || C.border}`,
        cursor: "pointer", transition: "all 0.15s",
      }}
    >
      {children}
    </span>
  );
};

export default Chip;