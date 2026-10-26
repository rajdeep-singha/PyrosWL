import { theme } from "./theme";

export function Footer() {
  const socialLinks = ["Twitter", "GitHub", "Discord"];

  return (
    <footer
      style={{
        borderTop: `1px solid ${theme.colors.border}`,
        padding: "clamp(24px, 4vw, 32px) clamp(16px, 4vw, 40px)",
      }}
    >
      <div className="footer-content">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 24,
              height: 24,
              border: `1.5px solid rgba(134,242,143,0.4)`,
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: theme.fonts.mono,
              fontWeight: 700,
              fontSize: 12,
              color: "rgba(134,242,143,0.4)",
            }}
          >
            P
          </div>
          <span
            style={{
              fontFamily: theme.fonts.mono,
              fontSize: 12,
              color: "rgba(134,242,143,0.3)",
              letterSpacing: "0.1em",
            }}
          >
            PYROS
          </span>
        </div>
        <span
          style={{
            color: "rgba(200,240,203,0.2)",
            fontSize: "clamp(10px, 2.5vw, 12px)",
            fontFamily: theme.fonts.mono,
          }}
        >
          CLI-first AI agent for robotics engineers
        </span>
        <div style={{ display: "flex", gap: "clamp(16px, 3vw, 24px)" }}>
          {socialLinks.map((link) => (
            <a
              key={link}
              href="#"
              style={{
                color: "rgba(200,240,203,0.25)",
                fontSize: 12,
                textDecoration: "none",
                fontFamily: theme.fonts.mono,
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = theme.colors.accent)
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "rgba(200,240,203,0.25)")
              }
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
