import { theme } from "./theme";

interface NavbarProps {
  scrolled: boolean;
}

export function Navbar({ scrolled }: NavbarProps) {
  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
    { label: "About", href: "#about" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? "rgba(10,26,12,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled
          ? `1px solid ${theme.colors.border}`
          : "1px solid transparent",
        transition: "all 0.3s",
        padding: "0 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 64,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 32,
            height: 32,
            border: `1.5px solid ${theme.colors.accent}`,
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: theme.fonts.mono,
            fontWeight: 700,
            fontSize: 16,
            color: theme.colors.accent,
          }}
        >
          P
        </div>
        <span
          style={{
            fontWeight: 600,
            fontSize: 16,
            color: theme.colors.accent,
            letterSpacing: "0.12em",
            fontFamily: theme.fonts.mono,
          }}
        >
          PYROS
        </span>
      </div>

      <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            style={{
              color: "rgba(200,240,203,0.55)",
              fontSize: 14,
              textDecoration: "none",
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.color = theme.colors.green)
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.color = "rgba(200,240,203,0.55)")
            }
          >
            {link.label}
          </a>
        ))}
        <a
          href="#waitlist"
          style={{
            background: "transparent",
            border: `1px solid ${theme.colors.borderMed}`,
            color: theme.colors.accent,
            padding: "7px 18px",
            borderRadius: 8,
            fontSize: 13,
            textDecoration: "none",
            fontFamily: theme.fonts.mono,
            fontWeight: 500,
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) =>
            ((e.target as HTMLElement).style.background =
              "rgba(134,242,143,0.08)")
          }
          onMouseLeave={(e) =>
            ((e.target as HTMLElement).style.background = "transparent")
          }
        >
          Early Access
        </a>
      </div>
    </nav>
  );
}
