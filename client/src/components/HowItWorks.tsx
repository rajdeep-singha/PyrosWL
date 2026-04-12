import { theme } from "./theme";

const steps = [
  {
    num: "01",
    title: "Install in seconds",
    body: "One command. Works on any Linux environment, from your dev laptop to your robot's onboard computer.",
  },
  {
    num: "02",
    title: "Point it at your workspace",
    body: "Pyros maps your ROS graph, reads your code, and builds a full model of your system — automatically.",
  },
  {
    num: "03",
    title: "Ask. Debug. Ship.",
    body: "Use natural language to diagnose bugs, generate code, and iterate — all without leaving your terminal.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      style={{ 
        padding: "clamp(48px, 8vw, 80px) clamp(16px, 4vw, 40px)", 
        borderTop: `1px solid ${theme.colors.border}` 
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "clamp(32px, 6vw, 64px)" }}>
          <div
            style={{
              fontFamily: theme.fonts.mono,
              fontSize: 12,
              color: "rgba(134,242,143,0.5)",
              letterSpacing: "0.15em",
              marginBottom: 16,
            }}
          >
            HOW IT WORKS
          </div>
          <h2
            style={{
              fontSize: "clamp(24px, 5vw, 44px)",
              fontWeight: 600,
              color: theme.colors.textPrimary,
              letterSpacing: "-0.02em",
            }}
          >
            Up and running in minutes
          </h2>
        </div>
        <div className="steps-grid">
          {steps.map((step, i) => (
            <div
              key={step.num}
              style={{ 
                background: theme.colors.bgDark, 
                padding: "clamp(24px, 4vw, 40px) clamp(20px, 4vw, 36px)" 
              }}
            >
              <div
                style={{
                  fontFamily: theme.fonts.mono,
                  fontSize: 11,
                  color: "rgba(134,242,143,0.35)",
                  marginBottom: 16,
                  letterSpacing: "0.1em",
                }}
              >
                {step.num}
              </div>
              <h3
                style={{
                  fontSize: 20,
                  fontWeight: 600,
                  color: theme.colors.textPrimary,
                  marginBottom: 14,
                  letterSpacing: "-0.01em",
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontSize: 15,
                  color: "rgba(200,240,203,0.5)",
                  lineHeight: 1.7,
                }}
              >
                {step.body}
              </p>
              {i === 0 && (
                <div
                  style={{
                    marginTop: 24,
                    fontFamily: theme.fonts.mono,
                    fontSize: 12,
                    color: theme.colors.accentDim,
                    background: "rgba(134,242,143,0.06)",
                    padding: "8px 14px",
                    borderRadius: 6,
                    display: "inline-block",
                    border: `1px solid ${theme.colors.border}`,
                  }}
                >
                  pip install pyros-cli
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
