import { theme } from "@/styles/theme";

type Col = {
  eyebrow: string;
  items: { title: string; desc: string }[];
};

const columns: Col[] = [
  {
    eyebrow: "Deployment & Control",
    items: [
      {
        title: "Real ROS output",
        desc: "Writes standard URDF and ROS / ROS 2 packages that run on your actual robot — no lock-in.",
      },
      {
        title: "On-prem & air-gapped",
        desc: "Deploy inside your network. Nothing has to leave your environment.",
      },
      {
        title: "Fits your toolchain",
        desc: "Slots into SSH, Docker, embedded Linux and CI without changing how you work.",
      },
    ],
  },
  {
    eyebrow: "Safety & Trust",
    items: [
      {
        title: "Human-in-the-loop",
        desc: "Every change is proposed, explained and applied only on your confirmation.",
      },
      {
        title: "Evidence-backed",
        desc: "Conclusions come with the logs, topics and traces that justify them.",
      },
      {
        title: "Your data, your rules",
        desc: "We work with teams directly on data-handling and retention requirements.",
      },
    ],
  },
];

export function Trust() {
  return (
    <section
      id="trust"
      style={{
        padding: "clamp(56px, 9vw, 110px) clamp(16px, 4vw, 40px)",
        borderTop: `1px solid ${theme.colors.border}`,
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "clamp(40px, 7vw, 64px)" }}>
          <div
            style={{
              fontFamily: theme.fonts.mono,
              fontSize: 12,
              color: theme.colors.accent,
              letterSpacing: "0.15em",
              marginBottom: 16,
            }}
          >
            BUILT FOR REAL ROBOTS
          </div>
          <h2
            style={{
              fontSize: "clamp(24px, 5vw, 44px)",
              fontWeight: 600,
              color: theme.colors.textPrimary,
              letterSpacing: "-0.02em",
              padding: "0 8px",
            }}
          >
            Serious hardware needs a serious agent
          </h2>
        </div>

        <div className="why-grid">
          {columns.map((col) => (
            <div
              key={col.eyebrow}
              style={{
                background: theme.colors.bgElev,
                border: `1px solid ${theme.colors.border}`,
                borderRadius: 16,
                padding: "clamp(24px, 4vw, 36px)",
              }}
            >
              <div
                style={{
                  fontFamily: theme.fonts.mono,
                  fontSize: 12,
                  color: theme.colors.textMuted,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: 24,
                  paddingBottom: 16,
                  borderBottom: `1px solid ${theme.colors.border}`,
                }}
              >
                {col.eyebrow}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                {col.items.map((item) => (
                  <div
                    key={item.title}
                    style={{ display: "flex", gap: 14, alignItems: "flex-start" }}
                  >
                    <span
                      style={{
                        color: theme.colors.accent,
                        fontFamily: "monospace",
                        fontSize: 15,
                        marginTop: 1,
                      }}
                    >
                      ▸
                    </span>
                    <div>
                      <div
                        style={{
                          fontSize: 16,
                          fontWeight: 600,
                          color: theme.colors.textPrimary,
                          marginBottom: 4,
                        }}
                      >
                        {item.title}
                      </div>
                      <div
                        style={{
                          fontSize: 14,
                          color: theme.colors.textMuted,
                          lineHeight: 1.6,
                        }}
                      >
                        {item.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
