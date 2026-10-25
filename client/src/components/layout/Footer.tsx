import { theme } from "@/styles/theme";

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
          <img
            src="/logo.svg"
            alt="Pyros"
            style={{ width: 22, height: 22, display: "block", opacity: 0.8 }}
          />
          <span
            style={{
              fontFamily: theme.fonts.mono,
              fontSize: 12,
              color: theme.colors.textMuted,
              letterSpacing: "0.1em",
            }}
          >
            PYROS
          </span>
        </div>
        <span
          style={{
            color: "rgba(255,255,255,0.2)",
            fontSize: "clamp(10px, 2.5vw, 12px)",
            fontFamily: theme.fonts.mono,
          }}
        >
The robotics IDE that knows physics
        </span>
        <div style={{ display: "flex", gap: "clamp(16px, 3vw, 24px)" }}>
          {socialLinks.map((link) => (
            <a
              key={link}
              href="#"
              style={{
                color: "rgba(255,255,255,0.25)",
                fontSize: 12,
                textDecoration: "none",
                fontFamily: theme.fonts.mono,
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = theme.colors.accent)
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.25)")
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
