import { theme } from "@/styles/theme";

export function Hero() {
  return (
    <section
      style={{
        paddingTop: "clamp(120px, 15vw, 160px)",
        paddingBottom: "clamp(56px, 9vw, 96px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          right: "-5%",
          width: 760,
          height: 760,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(91,194,231,0.12) 0%, rgba(107,107,158,0.06) 42%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 clamp(16px, 4vw, 40px)",
          position: "relative",
        }}
      >
        <div className="hero-split">
          {/* LEFT — copy */}
          <div>
            <div
              className="hero-animate"
              style={{
                fontFamily: theme.fonts.mono,
                fontSize: "clamp(11px, 2vw, 13px)",
                letterSpacing: "0.12em",
                color: theme.colors.textMuted,
                textTransform: "uppercase",
                marginBottom: 26,
                display: "flex",
                alignItems: "center",
                gap: 10,
                flexWrap: "wrap",
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
              Now in early access
              <span style={{ color: theme.colors.textDim }}>·</span>
              Built for robotics teams
            </div>

            <h1
              className="hero-animate-2"
              style={{
                fontSize: "clamp(40px, 6vw, 72px)",
                fontWeight: 600,
                lineHeight: 1.05,
                color: theme.colors.textPrimary,
                letterSpacing: "-0.03em",
                marginBottom: 24,
              }}
            >
              The robotics IDE
              <br />
              that knows{" "}
              <span
                style={{
                  fontFamily: theme.fonts.serif,
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: theme.colors.accent,
                }}
              >
                physics
              </span>
              .
            </h1>

            <p
              className="hero-animate-3"
              style={{
                fontSize: "clamp(16px, 2vw, 19px)",
                color: theme.colors.textSecondary,
                lineHeight: 1.65,
                maxWidth: 520,
                marginBottom: "clamp(28px, 4vw, 40px)",
                fontWeight: 300,
              }}
            >
              Edit the URDF, see your robot in 3D beside it, and watch live
              torque budgets underneath. An AI agent plans the work — the pyros
              engine does the math.
            </p>

            <div
              className="hero-animate-4"
              style={{ display: "flex", gap: 14, flexWrap: "wrap" }}
            >
              <a
                href="#waitlist"
                style={{
                  background: theme.colors.accent,
                  color: "#001018",
                  padding: "14px 28px",
                  borderRadius: 10,
                  fontSize: 15,
                  fontWeight: 700,
                  textDecoration: "none",
                  fontFamily: theme.fonts.mono,
                  whiteSpace: "nowrap",
                  transition: "transform 0.15s, box-shadow 0.15s",
                  boxShadow: "0 0 32px rgba(91,194,231,0.25)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(-1px)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 44px rgba(91,194,231,0.4)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 32px rgba(91,194,231,0.25)";
                }}
              >
                Join Waitlist →
              </a>
              <a
                href="#tour"
                style={{
                  background: "transparent",
                  color: theme.colors.textPrimary,
                  padding: "14px 28px",
                  borderRadius: 10,
                  fontSize: 15,
                  fontWeight: 500,
                  textDecoration: "none",
                  fontFamily: theme.fonts.mono,
                  whiteSpace: "nowrap",
                  border: `1px solid ${theme.colors.borderMed}`,
                  transition: "border-color 0.15s, background 0.15s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    theme.colors.borderAccent;
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(91,194,231,0.06)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    theme.colors.borderMed;
                  (e.currentTarget as HTMLElement).style.background =
                    "transparent";
                }}
              >
                See the tour
              </a>
            </div>
          </div>

          {/* RIGHT — product screenshot */}
          <div
            className="hero-animate-3 hero-shot-wrap"
            style={{ marginRight: "clamp(-120px, -8vw, 0px)" }}
          >
            <div
              style={{
                borderRadius: 14,
                overflow: "hidden",
                border: `1px solid ${theme.colors.borderMed}`,
                boxShadow:
                  "0 30px 80px rgba(0,0,0,0.6), 0 0 90px rgba(91,194,231,0.12)",
                background: theme.colors.bgElev,
              }}
            >
              <img
                src="/assets/shots/hero-ide.jpg"
                alt="The Pyros IDE — URDF editor, 3D robot view and live torque budget"
                style={{ display: "block", width: "100%", height: "auto" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
