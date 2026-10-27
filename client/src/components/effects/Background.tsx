import { theme } from "@/styles/theme";

/**
 * Global page background — a professional "engineering blueprint" treatment.
 * Rendered once, fixed behind all content (zIndex 0). Pure CSS, no canvas.
 *   - deep near-black base with a subtle depth gradient
 *   - dual-scale blueprint grid, masked so it fades toward the edges
 *   - soft, slowly drifting accent glows (cyan / indigo / teal)
 *   - gentle vignette for focus
 */
export function Background() {
  const gridMask =
    "radial-gradient(ellipse 85% 70% at 50% 28%, #000 0%, rgba(0,0,0,0.65) 55%, transparent 100%)";

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
        // base depth gradient — subtle lift toward the top/center
        background:
          "radial-gradient(ellipse 120% 80% at 50% -10%, #0A0A10 0%, #050507 45%, #000000 100%)",
      }}
    >
      {/* Blueprint grid (fine 32px + coarse 160px major lines), edge-masked */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: [
            // major lines
            "linear-gradient(rgba(91,194,231,0.07) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(91,194,231,0.07) 1px, transparent 1px)",
            // fine lines
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: "160px 160px, 160px 160px, 32px 32px, 32px 32px",
          maskImage: gridMask,
          WebkitMaskImage: gridMask,
        }}
      />

      {/* Accent glow blobs */}
      <div
        className="bg-glow bg-glow-1"
        style={{
          position: "absolute",
          top: "-10%",
          right: "-8%",
          width: "min(820px, 95vw)",
          height: "min(820px, 95vw)",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${rgba(theme.colors.accent, 0.12)} 0%, ${rgba(theme.colors.indigo, 0.05)} 45%, transparent 70%)`,
        }}
      />
      <div
        className="bg-glow bg-glow-2"
        style={{
          position: "absolute",
          top: "40%",
          left: "-12%",
          width: "min(680px, 85vw)",
          height: "min(680px, 85vw)",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${rgba(theme.colors.teal, 0.1)} 0%, transparent 68%)`,
        }}
      />
      <div
        className="bg-glow bg-glow-3"
        style={{
          position: "absolute",
          bottom: "-15%",
          left: "35%",
          width: "min(760px, 90vw)",
          height: "min(760px, 90vw)",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${rgba(theme.colors.indigo, 0.09)} 0%, transparent 70%)`,
        }}
      />

      {/* Circuit / PCB traces — anchored in the corners, pulses flowing along */}
      <div
        className="bg-circuit"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "min(520px, 55vw)",
          height: "min(520px, 55vw)",
          opacity: 0.55,
          maskImage:
            "linear-gradient(225deg, #000 0%, rgba(0,0,0,0.4) 45%, transparent 78%)",
          WebkitMaskImage:
            "linear-gradient(225deg, #000 0%, rgba(0,0,0,0.4) 45%, transparent 78%)",
        }}
      >
        <CircuitCluster />
      </div>
      <div
        className="bg-circuit"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "min(520px, 55vw)",
          height: "min(520px, 55vw)",
          opacity: 0.45,
          transform: "scale(-1, -1)",
          maskImage:
            "linear-gradient(225deg, #000 0%, rgba(0,0,0,0.4) 45%, transparent 78%)",
          WebkitMaskImage:
            "linear-gradient(225deg, #000 0%, rgba(0,0,0,0.4) 45%, transparent 78%)",
        }}
      >
        <CircuitCluster />
      </div>

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 55%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </div>
  );
}

/** A cluster of right-angle PCB traces with flowing pulses and glowing nodes.
 *  Drawn in a 520×520 box with activity concentrated near the top-right corner. */
function CircuitCluster() {
  // Right-angle traces, densest toward the top-right corner (520, 0).
  const traces = [
    { d: "M520 60 H400 V140 H320", dur: 5.5, delay: 0 },
    { d: "M520 130 H440 V220 H360 V300", dur: 6.8, delay: 1.4 },
    { d: "M460 20 V100 H380 V170", dur: 4.6, delay: 0.8 },
    { d: "M520 210 H420 V270", dur: 5.0, delay: 2.1 },
    { d: "M400 40 V120 H300 V200 H240", dur: 7.2, delay: 0.3 },
  ];
  // Node pads at endpoints / junctions.
  const nodes = [
    { x: 320, y: 140, dur: 3.2, delay: 0 },
    { x: 360, y: 300, dur: 3.8, delay: 0.6 },
    { x: 380, y: 170, dur: 2.9, delay: 1.1 },
    { x: 420, y: 270, dur: 3.5, delay: 0.3 },
    { x: 240, y: 200, dur: 4.1, delay: 0.9 },
    { x: 400, y: 120, dur: 3.0, delay: 1.5 },
  ];

  return (
    <svg
      viewBox="0 0 520 520"
      width="100%"
      height="100%"
      fill="none"
      style={{ display: "block" }}
    >
      {/* dim base traces */}
      {traces.map((t, i) => (
        <path
          key={`base-${i}`}
          d={t.d}
          stroke={rgba(theme.colors.accent, 0.16)}
          strokeWidth={1.4}
        />
      ))}
      {/* bright pulses flowing along the traces */}
      {traces.map((t, i) => (
        <path
          key={`pulse-${i}`}
          className="circuit-pulse"
          d={t.d}
          stroke={theme.colors.accentBright}
          strokeWidth={1.6}
          strokeLinecap="round"
          pathLength={100}
          style={{
            animationDuration: `${t.dur}s`,
            animationDelay: `${t.delay}s`,
            filter: `drop-shadow(0 0 4px ${rgba(theme.colors.accent, 0.8)})`,
          }}
        />
      ))}
      {/* nodes: solid pad + pulsing ring */}
      {nodes.map((n, i) => (
        <g key={`node-${i}`}>
          <circle
            className="circuit-node-ring"
            cx={n.x}
            cy={n.y}
            r={5}
            fill="none"
            stroke={theme.colors.accentBright}
            strokeWidth={1}
            style={{
              animationDuration: `${n.dur}s`,
              animationDelay: `${n.delay}s`,
            }}
          />
          <circle
            cx={n.x}
            cy={n.y}
            r={3}
            fill="#050507"
            stroke={rgba(theme.colors.accent, 0.7)}
            strokeWidth={1.2}
          />
        </g>
      ))}
    </svg>
  );
}

/** Convert a #rrggbb hex to an rgba() string. */
function rgba(hex: string, alpha: number) {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r},${g},${b},${alpha})`;
}
