import { useRef, useEffect } from "react";
import { theme } from "./theme";

export function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.muted = true;
      v.play().catch(() => {});
    }
  }, []);

  return (
    <div
      style={{
        position: "relative",
        borderRadius: 12,
        overflow: "hidden",
        background: "#060e07",
        border: `1px solid ${theme.colors.borderMed}`,
        boxShadow: `0 0 60px rgba(134,242,143,0.06), 0 0 0 1px ${theme.colors.border}`,
      }}
    >
      {/* Title bar — matches TerminalDemo */}
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
        {["#3a3a3a", "#3a3a3a", "#3a3a3a"].map((bg, i) => (
          <span
            key={i}
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: bg,
              display: "inline-block",
            }}
          />
        ))}
        <span
          style={{
            marginLeft: 12,
            color: "rgba(134,242,143,0.4)",
            fontSize: 11,
            fontFamily: theme.fonts.mono,
          }}
        >
          pyros — live demo
        </span>

        {/* Live indicator */}
        <span
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: 5,
            fontFamily: theme.fonts.mono,
            fontSize: 10,
            color: theme.colors.accent,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: theme.colors.accent,
              animation: "pulse 2s infinite",
              display: "inline-block",
            }}
          />
          LIVE
        </span>
      </div>

      {/* Video — autoplay, loop, muted, full quality */}
      <video
        ref={videoRef}
        src="/pyros2_compressed.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{
          display: "block",
          width: "100%",
          aspectRatio: "16 / 9",
        }}
      />
    </div>
  );
}
