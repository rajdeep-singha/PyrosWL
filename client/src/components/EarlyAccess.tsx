import { theme } from "./theme";
import { WaitlistForm } from "./WaitlistForm";

export function EarlyAccess() {
  return (
    <section
      id="waitlist"
      style={{
        padding: "100px 40px",
        borderTop: `1px solid ${theme.colors.border}`,
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <div
          style={{
            fontFamily: theme.fonts.mono,
            fontSize: 12,
            color: "rgba(134,242,143,0.5)",
            letterSpacing: "0.15em",
            marginBottom: 24,
          }}
        >
          EARLY ACCESS
        </div>
        <h2
          style={{
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 600,
            color: theme.colors.textPrimary,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: 20,
          }}
        >
          Be first to ship
          <br />
          with Pyros
        </h2>
        <p
          style={{
            color: "rgba(200,240,203,0.5)",
            fontSize: 17,
            lineHeight: 1.7,
            marginBottom: 40,
            fontWeight: 300,
          }}
        >
          We're opening access to a small group of robotics engineers first. Join
          the waitlist and shape the product.
        </p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <WaitlistForm />
        </div>
        <p
          style={{
            marginTop: 20,
            fontSize: 12,
            color: "rgba(200,240,203,0.25)",
            fontFamily: theme.fonts.mono,
          }}
        >
          No spam. No credit card. Just early access.
        </p>
      </div>
    </section>
  );
}
