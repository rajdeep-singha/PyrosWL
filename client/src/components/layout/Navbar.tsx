import { useState } from "react";
import { Link } from "react-router-dom";
import { theme } from "@/styles/theme";

interface NavbarProps {
  scrolled: boolean;
}

export function Navbar({ scrolled }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Prefixed with "/" so section anchors also work from /docs (navigate home, then scroll).
  const navLinks = [
    { label: "Features", href: "/#features" },
    { label: "Compare", href: "/#compare" },
    { label: "FAQ", href: "/#faq" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled || mobileMenuOpen ? "rgba(0,0,0,0.9)" : "transparent",
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
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          textDecoration: "none",
        }}
      >
        <img
          src="/logo.svg"
          alt="Pyros"
          style={{ width: 30, height: 30, display: "block" }}
        />
        <span
          style={{
            fontWeight: 600,
            fontSize: 16,
            color: theme.colors.textPrimary,
            letterSpacing: "0.12em",
            fontFamily: theme.fonts.mono,
          }}
        >
          PYROS
        </span>
      </Link>

      {/* Desktop Navigation */}
      <div className={`nav-links ${mobileMenuOpen ? "open" : ""}`}>
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={() => setMobileMenuOpen(false)}
            style={{
              color: theme.colors.textSecondary,
              fontSize: 14,
              textDecoration: "none",
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.color = theme.colors.accent)
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.color = theme.colors.textSecondary)
            }
          >
            {link.label}
          </a>
        ))}
        <Link
          to="/docs"
          onClick={() => setMobileMenuOpen(false)}
          style={{
            color: theme.colors.textSecondary,
            fontSize: 14,
            textDecoration: "none",
            transition: "color 0.15s",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.color = theme.colors.accent)
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.color =
              theme.colors.textSecondary)
          }
        >
          Docs
        </Link>
        <a
          href="/#waitlist"
          onClick={() => setMobileMenuOpen(false)}
          style={{
            background: "transparent",
            border: `1px solid ${theme.colors.borderAccent}`,
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
              "rgba(91,194,231,0.1)")
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
