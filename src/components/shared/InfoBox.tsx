import React from "react";
import { InfoBoxProps } from "../../types";

const colorMap: Record<string, { bg: string; border: string; title: string }> = {
  blue:   { bg: "rgba(91,141,246,0.07)",  border: "rgba(91,141,246,0.18)",  title: "#5B8DF6" },
  green:  { bg: "rgba(16,217,140,0.07)",  border: "rgba(16,217,140,0.18)",  title: "#10D98C" },
  amber:  { bg: "rgba(245,158,11,0.07)",  border: "rgba(245,158,11,0.18)",  title: "#F59E0B" },
  red:    { bg: "rgba(242,82,82,0.07)",   border: "rgba(242,82,82,0.18)",   title: "#F25252" },
  purple: { bg: "rgba(139,92,246,0.07)",  border: "rgba(139,92,246,0.18)",  title: "#8B5CF6" },
};

const InfoBox: React.FC<InfoBoxProps> = ({
  color, title, children, style = {}, onClick
}) => {
  const t = colorMap[color] || colorMap.blue;
  return (
    <div
      onClick={onClick}
      style={{
        background: t.bg,
        border: `1px solid ${t.border}`,
        borderRadius: 12, padding: "13px 15px",
        marginBottom: 10,
        cursor: onClick ? "pointer" : "default",
        ...style,
      }}
    >
      <div style={{
        fontSize: 12, fontWeight: 700, marginBottom: 5,
        color: t.title, fontFamily: "'Space Grotesk', sans-serif"
      }}>
        {title}
      </div>
      <div style={{ fontSize: 12, color: "#8892B0", lineHeight: 1.75 }}>
        {children}
      </div>
    </div>
  );
};

export default InfoBox;