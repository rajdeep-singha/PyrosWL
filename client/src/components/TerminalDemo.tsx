import { useState, useEffect } from "react";
import { theme } from "./theme";

const terminalLines = [
  { delay: 0, text: "> pyros init my_robot_ws", color: theme.colors.green },
  { delay: 700, text: "✓ Scanning ROS2 workspace...", color: "#6ee7b7" },
  {
    delay: 1400,
    text: "✓ 47 nodes indexed, 12 topics mapped",
    color: "#6ee7b7",
  },
  {
    delay: 2100,
    text: "> pyros debug /lidar/scan topic",
    color: theme.colors.green,
  },
  {
    delay: 2800,
    text: "⚠ Detected 340ms latency spike in sensor fusion",
    color: "#fbbf24",
  },
  {
    delay: 3500,
    text: "→ Root cause: EKF covariance drift at t=14.2s",
    color: "#94a3b8",
  },
  { delay: 4200, text: "> pyros fix --apply", color: theme.colors.green },
  {
    delay: 4900,
    text: "✓ Patch applied. Latency reduced to 18ms",
    color: theme.colors.green,
  },
];

export function TerminalDemo() {
  const [visible, setVisible] = useState<number[]>([]);
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    const timers = terminalLines.map((line, i) =>
      setTimeout(() => setVisible((v) => [...v, i]), line.delay + 600)
    );
    const cursorTimer = setInterval(() => setCursor((c) => !c), 530);
    return () => {
      timers.forEach(clearTimeout);
      clearInterval(cursorTimer);
    };
  }, []);

  return (
    <div
      style={{
        background: "#060e07",
        border: `1px solid ${theme.colors.borderMed}`,
        borderRadius: 12,
        fontFamily: theme.fonts.mono,
        fontSize: "clamp(11px, 2.5vw, 13px)",
        lineHeight: 1.7,
        padding: "0",
        overflow: "hidden",
        boxShadow: `0 0 60px rgba(134,242,143,0.06), 0 0 0 1px ${theme.colors.border}`,
      }}
    >
      <div
        style={{
          background: theme.colors.bgDark,
          borderBottom: `1px solid ${theme.colors.border}`,
          padding: "10px clamp(12px, 3vw, 16px)",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "#3a3a3a",
            display: "inline-block",
          }}
        />
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "#3a3a3a",
            display: "inline-block",
          }}
        />
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "#3a3a3a",
            display: "inline-block",
          }}
        />
        <span
          style={{
            marginLeft: 12,
            color: "rgba(134,242,143,0.4)",
            fontSize: 11,
          }}
        >
          pyros — bash
        </span>
      </div>
      <div style={{ padding: "clamp(14px, 3vw, 20px) clamp(14px, 3vw, 24px)", minHeight: "clamp(180px, 30vw, 220px)", overflow: "auto" }}>
        {terminalLines.map((line, i) =>
          visible.includes(i) ? (
            <div
              key={i}
              style={{
                color: line.color,
                marginBottom: 2,
                opacity: 1,
                animation: "fadeUp 0.3s ease",
              }}
            >
              {line.text}
            </div>
          ) : null
        )}
        <span style={{ color: theme.colors.green, opacity: cursor ? 1 : 0 }}>
          █
        </span>
      </div>
    </div>
  );
}
