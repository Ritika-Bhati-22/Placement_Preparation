import React, { useState } from "react";
import { C } from "../../constants/colors";
import  type { CardProps } from "../../types";

const Card: React.FC<CardProps> = ({ children, style = {}, onClick }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: C.surface,
        border: `1px solid ${hovered ? C.borderBright : C.border}`,
        borderRadius: 16, padding: 20,
        backdropFilter: "blur(10px)",
        transition: "border-color 0.2s, box-shadow 0.2s, transform 0.2s",
        boxShadow: hovered ? "0 8px 32px rgba(0,0,0,0.28)" : "none",
        transform: onClick && hovered ? "translateY(-2px)" : "none",
        cursor: onClick ? "pointer" : "default",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default Card;