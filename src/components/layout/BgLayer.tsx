import React from "react";

const BgLayer: React.FC = () => {
  return (
    <div style={{
      position: "fixed", inset: 0,
      pointerEvents: "none", zIndex: 0,
    }}>
      {/* Grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `
          linear-gradient(rgba(91,141,246,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(91,141,246,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "52px 52px",
      }} />

      {/* Glow 1 */}
      <div style={{
        position: "absolute",
        width: 900, height: 700,
        top: -250, left: -250,
        background: "radial-gradient(ellipse, rgba(91,141,246,0.11) 0%, transparent 65%)",
        borderRadius: "50%",
      }} />

      {/* Glow 2 */}
      <div style={{
        position: "absolute",
        width: 700, height: 600,
        top: 300, right: -300,
        background: "radial-gradient(ellipse, rgba(139,92,246,0.08) 0%, transparent 65%)",
        borderRadius: "50%",
      }} />

      {/* Noise */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.4,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
      }} />
    </div>
  );
};

export default BgLayer;