import React from "react";
import { C } from "../../constants/colors";
import { TabsProps } from "../../types";

const Tabs: React.FC<TabsProps> = ({ items, active, onChange }) => {
  return (
    <div style={{
      display: "flex", gap: 3,
      background: "rgba(255,255,255,0.03)",
      border: `1px solid ${C.border}`,
      borderRadius: 11, padding: 3,
      width: "fit-content", marginBottom: 18,
    }}>
      {items.map(tab => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          style={{
            padding: "7px 15px", borderRadius: 8,
            fontSize: 12.5, fontWeight: 500,
            cursor: "pointer", fontFamily: "inherit",
            background: active === tab ? "rgba(91,141,246,0.1)" : "transparent",
            color: active === tab ? C.text : C.text2,
            border: active === tab
              ? "1px solid rgba(91,141,246,0.2)"
              : "1px solid transparent",
            transition: "all 0.15s",
            boxShadow: active === tab ? "0 2px 8px rgba(0,0,0,0.2)" : "none",
          }}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;