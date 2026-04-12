import { theme } from "./theme";

export function WhyPyros() {
  return (
    <section
      id="about"
      style={{
        padding: "clamp(48px, 8vw, 80px) clamp(16px, 4vw, 40px)",
        borderTop: `1px solid ${theme.colors.border}`,
        maxWidth: 1100,
        margin: "0 auto",
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}
      >
        <span
          style={{
            fontFamily: theme.fonts.mono,
            fontSize: 12,
            color: "rgba(134,242,143,0.5)",
            letterSpacing: "0.15em",
            whiteSpace: "nowrap",
          }}
        >
          WHY PYROS
        </span>
        <div style={{ flex: 1, height: 1, background: theme.colors.border }} />
      </div>
      <div className="why-grid">
        <div>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 600,
              color: theme.colors.textPrimary,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              marginBottom: 20,
            }}
          >
            Robotics is too complex
            <br />
            for generic AI tools
          </h2>
          <p
            style={{
              color: "rgba(200,240,203,0.55)",
              fontSize: 16,
              lineHeight: 1.75,
              fontWeight: 300,
            }}
          >
            General-purpose AI assistants don't understand distributed robot
            architectures, real-time constraints, or the nuance of a misconfigured
            TF tree. Pyros was trained on robotics codebases and built by engineers
            who've shipped real hardware.
          </p>
          <div
            style={{
              marginTop: 28,
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            {[
              "Understands ROS concepts — not just syntax",
              "Debugs at the system level, not just the file level",
              "Generates code that accounts for real-time constraints",
            ].map((item) => (
              <div
                key={item}
                style={{ display: "flex", gap: 12, alignItems: "flex-start" }}
              >
                <span
                  style={{
                    color: theme.colors.accent,
                    fontFamily: "monospace",
                    marginTop: 2,
                    fontSize: 14,
                  }}
                >
                  ▸
                </span>
                <span style={{ color: "rgba(200,240,203,0.7)", fontSize: 15 }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            background: theme.colors.bgCard,
            border: `1px solid ${theme.colors.border}`,
            borderRadius: 16,
            padding: "clamp(20px, 4vw, 32px)",
            fontFamily: theme.fonts.mono,
            fontSize: "clamp(11px, 2.5vw, 13px)",
            overflow: "auto",
          }}
        >
          {[
            ["# Generic AI", "rgba(200,240,203,0.3)", "14px"],
            [`$ ask-ai "why is my robot spinning?"`, "rgba(134,242,143,0.6)", "13px"],
            [`> "Check your motor controller..."`, "rgba(200,240,203,0.25)", "13px"],
            ["", "", ""],
            ["# Pyros", theme.colors.accent, "14px"],
            [`$ pyros debug spinning_behavior`, "rgba(134,242,143,0.8)", "13px"],
            [`> Analysing /cmd_vel topic...`, "#6ee7b7", "13px"],
            [`> Found: odom→base_link TF 180° offset`, "#fbbf24", "13px"],
            [`> Fix: set rotation_offset: -3.14159`, theme.colors.green, "13px"],
            [`> Apply? [y/N]`, "rgba(200,240,203,0.5)", "13px"],
          ].map(([line, color, size], i) => (
            <div
              key={i}
              style={{ color, fontSize: size, marginBottom: line ? 4 : 12 }}
            >
              {line}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
