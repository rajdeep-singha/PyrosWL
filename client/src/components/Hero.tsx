import { theme } from "./theme";
import { TypewriterText } from "./TypewriterText";
import { TerminalDemo } from "./TerminalDemo";
import { WaitlistForm } from "./WaitlistForm";
import { InstallCode } from "./InstallCode";

export function Hero() {
  return (
    <section
      className="grid-bg"
      style={{
        paddingTop: 140,
        paddingBottom: 100,
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-60%)",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(134,242,143,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          maxWidth: 800,
          margin: "0 auto",
          padding: "0 24px",
          position: "relative",
        }}
      >
        <div
          className="hero-animate"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(134,242,143,0.07)",
            border: `1px solid ${theme.colors.border}`,
            borderRadius: 100,
            padding: "5px 14px",
            marginBottom: 32,
            fontFamily: theme.fonts.mono,
            fontSize: 12,
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
          Now accepting early access requests
        </div>

        <h1
          className="hero-animate-2"
          style={{
            fontSize: "clamp(42px, 6vw, 72px)",
            fontWeight: 600,
            lineHeight: 1.08,
            color: theme.colors.textPrimary,
            letterSpacing: "-0.03em",
            marginBottom: 24,
          }}
        >
          The AI agent built
          <br />
          for <TypewriterText />
        </h1>

        <p
          className="hero-animate-3"
          style={{
            fontSize: 18,
            color: theme.colors.textSecondary,
            lineHeight: 1.7,
            maxWidth: 560,
            margin: "0 auto 44px",
            fontWeight: 300,
          }}
        >
          Pyros lives in your terminal and understands your entire robot stack —
          ROS graphs, sensor pipelines, control loops, and everything in
          between.
        </p>

        <div
          className="hero-animate-4"
          style={{ display: "flex", justifyContent: "center", marginBottom: 40 }}
        >
          <WaitlistForm />
        </div>

        {/* Install Code Block */}
        <div
          className="hero-animate-4"
          style={{ marginBottom: 50 }}
        >
          <div
            style={{
              fontFamily: theme.fonts.mono,
              fontSize: 11,
              color: "rgba(134,242,143,0.4)",
              letterSpacing: "0.1em",
              marginBottom: 12,
              textTransform: "uppercase",
            }}
          >
            Get Started
          </div>
          <InstallCode />
        </div>

        <div
          className="hero-animate-4"
          style={{ maxWidth: 680, margin: "0 auto" }}
        >
          <TerminalDemo />
        </div>

        <div
          style={{
            marginTop: 40,
            display: "flex",
            justifyContent: "center",
            gap: 40,
            flexWrap: "wrap",
          }}
        >
          {[
            ["CLI-first", "No GUI required"],
            ["ROS / ROS2", "Native support"],
            ["Any hardware", "x86, ARM, RISC-V"],
          ].map(([title, sub]) => (
            <div key={title} style={{ textAlign: "center" }}>
              <div
                style={{
                  color: theme.colors.accent,
                  fontWeight: 600,
                  fontSize: 14,
                  fontFamily: theme.fonts.mono,
                }}
              >
                {title}
              </div>
              <div
                style={{
                  color: theme.colors.textMuted,
                  fontSize: 12,
                  marginTop: 2,
                }}
              >
                {sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
