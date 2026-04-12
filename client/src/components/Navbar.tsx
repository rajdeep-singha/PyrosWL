import { useState } from "react";
import { theme } from "./theme";

interface NavbarProps {
  scrolled: boolean;
}

export function Navbar({ scrolled }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        background: scrolled || mobileMenuOpen ? "rgba(10,26,12,0.98)" : "transparent",
        backdropFilter: scrolled || mobileMenuOpen ? "blur(12px)" : "none",
        borderBottom:
          scrolled || mobileMenuOpen
            ? `1px solid ${theme.colors.border}`
            : "1px solid transparent",
        transition: "all 0.3s",
        padding: "0 clamp(16px, 4vw, 40px)",
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

      {/* Desktop Navigation */}
      <div className={`nav-links ${mobileMenuOpen ? "open" : ""}`}>
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={() => setMobileMenuOpen(false)}
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
          onClick={() => setMobileMenuOpen(false)}
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
            textAlign: "center",
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

      {/* Mobile Menu Toggle */}
      <button
        className="nav-mobile-toggle"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        style={{
          background: "transparent",
          border: "none",
          color: theme.colors.accent,
          fontSize: 24,
          cursor: "pointer",
          padding: 8,
          alignItems: "center",
          justifyContent: "center",
        }}
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? "✕" : "☰"}
      </button>
    </nav>
  );
}
