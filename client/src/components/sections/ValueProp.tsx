import { theme } from "@/styles/theme";

export function ValueProp() {
  return (
    <section
      style={{
        padding: "clamp(48px, 8vw, 90px) clamp(16px, 4vw, 40px)",
        borderTop: `1px solid ${theme.colors.border}`,
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <p
          style={{
            fontSize: "clamp(22px, 4vw, 36px)",
            lineHeight: 1.4,
            fontWeight: 400,
            letterSpacing: "-0.02em",
            color: theme.colors.textSecondary,
          }}
        >
          Pyros is a robotics IDE with a mind for mechanics. Edit the{" "}
          <span style={{ color: theme.colors.textPrimary }}>URDF</span>, see it in{" "}
          <span style={{ color: theme.colors.textPrimary }}>3D</span>, and let live{" "}
          <span style={{ color: theme.colors.textPrimary }}>physics</span> and an{" "}
          <span style={{ color: theme.colors.textPrimary }}>AI agent</span> turn a
          design into{" "}
          <span
            style={{
              fontFamily: theme.fonts.serif,
              fontStyle: "italic",
              color: theme.colors.accent,
            }}
          >
            checked, buildable
          </span>{" "}
          hardware.
        </p>
      </div>
    </section>
  );
}
