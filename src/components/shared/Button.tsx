import React, { useState } from "react";
import { C } from "../../constants/colors";

interface BtnProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "purple" | "green";
  onClick?: () => void;
  style?: React.CSSProperties;
  full?: boolean;
}

const Button: React.FC<BtnProps> = ({
  children, variant = "primary", onClick, style = {}, full
}) => {
  const [hov, setHov] = useState(false);

  const variants: Record<string, React.CSSProperties> = {
    primary: {
      background: hov ? "#4a7ef5" : C.accent,
      color: "white",
      boxShadow: hov ? "0 8px 22px rgba(91,141,246,0.38)" : "0 4px 14px rgba(91,141,246,0.25)",
      border: "none",
    },
    secondary: {
      background: hov ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.04)",
      color: C.text,
      boxShadow: "none",
      border: `1px solid ${hov ? C.borderBright : C.border}`,
    },
    purple: {
      background: hov ? "#7c3aed" : C.accent2,
      color: "white",
      boxShadow: hov ? "0 8px 22px rgba(139,92,246,0.38)" : "0 4px 14px rgba(139,92,246,0.25)",
      border: "none",
    },
    green: {
      background: hov ? "#059669" : C.accent3,
      color: "white",
      boxShadow: "none",
      border: "none",
    },
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "9px 18px", borderRadius: 10,
        fontSize: 13, fontWeight: 600,
        cursor: "pointer", fontFamily: "inherit",
        display: "inline-flex", alignItems: "center", gap: 6,
        transition: "all 0.18s",
        transform: hov ? "translateY(-1px)" : "none",
        width: full ? "100%" : "auto",
        justifyContent: full ? "center" : "flex-start",
        ...variants[variant],
        ...style,
      }}
    >
      {children}
    </button>
  );
};

export default Button;