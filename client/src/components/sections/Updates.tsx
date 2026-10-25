import { theme } from "@/styles/theme";

// Placeholder entries — replace href/date/title with real posts when the blog is live.
const updates = [
  {
    tag: "Product",
    date: "Coming soon",
    title: "Introducing Pyros — the AI agent built for robotics",
    href: "#",
  },
  {
    tag: "Engineering",
    date: "Coming soon",
    title: "How Pyros maps a ROS 2 graph in under two seconds",
    href: "#",
  },
  {
    tag: "Research",
    date: "Coming soon",
    title: "Where generic LLMs go wrong on real robot stacks",
    href: "#",
  },
];

export function Updates() {
  return (
    <section
      id="updates"
      style={{
        padding: "clamp(56px, 9vw, 100px) clamp(16px, 4vw, 40px)",
        borderTop: `1px solid ${theme.colors.border}`,
      }}
    >
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: 16,
            marginBottom: "clamp(24px, 4vw, 36px)",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(22px, 4vw, 34px)",
              fontWeight: 600,
              color: theme.colors.textPrimary,
              letterSpacing: "-0.02em",
            }}
          >
            Latest updates
          </h2>
          <a
            href="#"
            style={{
              fontFamily: theme.fonts.mono,
              fontSize: 13,
              color: theme.colors.accent,
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            View all →
          </a>
        </div>

        <div style={{ borderTop: `1px solid ${theme.colors.border}` }}>
          {updates.map((u) => (
            <a
              key={u.title}
              href={u.href}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 20,
                padding: "clamp(18px, 3vw, 24px) 4px",
                borderBottom: `1px solid ${theme.colors.border}`,
                textDecoration: "none",
                transition: "background 0.15s, padding-left 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(91,194,231,0.04)";
                (e.currentTarget as HTMLElement).style.paddingLeft = "14px";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.paddingLeft = "4px";
              }}
            >
              <div
                style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 0 }}
              >
                <span
                  style={{
                    fontFamily: theme.fonts.mono,
                    fontSize: 11,
                    color: theme.colors.textMuted,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  {u.tag} · {u.date}
                </span>
                <span
                  style={{
                    fontSize: "clamp(15px, 2.6vw, 18px)",
                    color: theme.colors.textPrimary,
                    fontWeight: 500,
                  }}
                >
                  {u.title}
                </span>
              </div>
              <span
                style={{
                  color: theme.colors.accent,
                  fontFamily: theme.fonts.mono,
                  fontSize: 18,
                  flexShrink: 0,
                }}
              >
                →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
