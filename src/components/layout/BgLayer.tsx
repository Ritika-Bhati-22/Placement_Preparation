import React from "react";

const BgLayer: React.FC = () => {
  return (
    <div style={{
      position: "fixed", inset: 0,
      pointerEvents: "none", zIndex: 0,
      overflow: "hidden",
    }}>
      {/* Base gradient */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 20% 20%, rgba(108,142,245,0.07) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(167,139,250,0.06) 0%, transparent 60%)",
      }} />

      {/* Grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `
          linear-gradient(rgba(108,142,245,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(108,142,245,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "48px 48px",
      }} />

      {/* Top glow */}
      <div style={{
        position: "absolute",
        width: 600, height: 600,
        top: -200, left: "50%",
        transform: "translateX(-50%)",
        background: "radial-gradient(circle, rgba(108,142,245,0.08) 0%, transparent 70%)",
        borderRadius: "50%",
      }} />

      {/* Bottom right glow */}
      <div style={{
        position: "absolute",
        width: 500, height: 500,
        bottom: -150, right: -150,
        background: "radial-gradient(circle, rgba(167,139,250,0.07) 0%, transparent 70%)",
        borderRadius: "50%",
      }} />

      {/* Noise overlay */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.35,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
      }} />
    </div>
  );
};

export default BgLayer;