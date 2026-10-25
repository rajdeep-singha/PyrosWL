import { theme } from "@/styles/theme";

const rows = [
  "Renders your URDF in live 3D",
  "Checks joint torque against real limits",
  "Recommends actuators that actually fit",
  "Validates the URDF and ROS package",
  "Exports STEP files and a full BOM",
  "Simulates the robot under real gravity",
];

export function Comparison() {
  return (
    <section
      id="compare"
      style={{
        padding: "clamp(56px, 9vw, 110px) clamp(16px, 4vw, 40px)",
        borderTop: `1px solid ${theme.colors.border}`,
      }}
    >
      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "clamp(32px, 6vw, 56px)" }}>
          <div
            style={{
              fontFamily: theme.fonts.mono,
              fontSize: 12,
              color: theme.colors.accent,
              letterSpacing: "0.15em",
              marginBottom: 16,
            }}
          >
            THE DIFFERENCE
          </div>
          <h2
            style={{
              fontSize: "clamp(24px, 5vw, 44px)",
              fontWeight: 600,
              color: theme.colors.textPrimary,
              letterSpacing: "-0.02em",
              padding: "0 8px",
            }}
          >
            Generic AI vs{" "}
            <span
              style={{
                fontFamily: theme.fonts.serif,
                fontStyle: "italic",
                fontWeight: 400,
                color: theme.colors.accent,
              }}
            >
              Pyros
            </span>
          </h2>
        </div>

        <div
          style={{
            border: `1px solid ${theme.colors.border}`,
            borderRadius: 16,
            overflow: "hidden",
            background: theme.colors.bgElev,
          }}
        >
          {/* Header */}
          <div
            className="compare-grid"
            style={{ borderBottom: `1px solid ${theme.colors.border}` }}
          >
            <div style={headerCell(theme.colors.textMuted)}>Capability</div>
            <div style={headerCell(theme.colors.textMuted)}>Generic AI</div>
            <div
              style={{
                ...headerCell(theme.colors.accent),
                background: "rgba(91,194,231,0.06)",
              }}
            >
              Pyros
            </div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <div
              key={row}
              className="compare-grid"
              style={{
                borderBottom:
                  i === rows.length - 1
                    ? "none"
                    : `1px solid ${theme.colors.border}`,
              }}
            >
              <div
                style={{
                  ...bodyCell,
                  color: theme.colors.textSecondary,
                  textAlign: "left",
                  justifyContent: "flex-start",
                }}
              >
                {row}
              </div>
              <div style={{ ...bodyCell, color: theme.colors.textDim }}>✗</div>
              <div
                style={{
                  ...bodyCell,
                  color: theme.colors.accent,
                  background: "rgba(91,194,231,0.06)",
                  fontWeight: 600,
                }}
              >
                ✓
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const headerCell = (color: string): React.CSSProperties => ({
  padding: "clamp(12px, 3vw, 18px) clamp(10px, 3vw, 22px)",
  fontFamily: theme.fonts.mono,
  fontSize: "clamp(11px, 2.5vw, 13px)",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
});

const bodyCell: React.CSSProperties = {
  padding: "clamp(12px, 3vw, 18px) clamp(10px, 3vw, 22px)",
  fontSize: "clamp(12px, 2.6vw, 15px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
};
