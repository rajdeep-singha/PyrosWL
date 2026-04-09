import { theme } from "./theme";

const features = [
  {
    icon: "◈",
    title: "ROS / ROS2 Native",
    desc: "Understands your workspace structure, launch files, nodes, topics, services and actions. No setup boilerplate.",
  },
  {
    icon: "⬡",
    title: "Sensor Pipeline Debug",
    desc: "Traces data flow across your entire sensor stack — LIDAR, cameras, IMUs — and pinpoints latency or drop-out causes.",
  },
  {
    icon: "△",
    title: "Control Algorithm Design",
    desc: "Generates and tunes PID, MPC, and trajectory planners with awareness of your robot's URDF and dynamic constraints.",
  },
  {
    icon: "◎",
    title: "Simulation-Ready",
    desc: "Works alongside Gazebo, Isaac Sim, and MoveIt2. Iterates in simulation before touching hardware.",
  },
  {
    icon: "⊞",
    title: "Codebase Intelligence",
    desc: "Reads your entire repo, understands custom message types, and refactors across packages without missing a dependency.",
  },
  {
    icon: "⌬",
    title: "CLI-First by Design",
    desc: "Runs anywhere your robot runs — SSH sessions, Docker containers, embedded Linux, CI pipelines.",
  },
];

export function Features() {
  return (
    <section
      id="features"
      style={{ padding: "80px 40px", borderTop: `1px solid ${theme.colors.border}` }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div
            style={{
              fontFamily: theme.fonts.mono,
              fontSize: 12,
              color: "rgba(134,242,143,0.5)",
              letterSpacing: "0.15em",
              marginBottom: 16,
            }}
          >
            CAPABILITIES
          </div>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 600,
              color: theme.colors.textPrimary,
              letterSpacing: "-0.02em",
            }}
          >
            Everything your robot stack needs
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
        >
          {features.map((f) => (
            <div
              key={f.title}
              className="feature-card"
              style={{
                background: theme.colors.bgCard2,
                border: `1px solid ${theme.colors.border}`,
                borderRadius: 12,
                padding: "28px 28px",
              }}
            >
              <div
                style={{
                  fontSize: 24,
                  color: theme.colors.accent,
                  marginBottom: 14,
                  fontFamily: "monospace",
                }}
              >
                {f.icon}
              </div>
              <h3
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: theme.colors.textPrimary,
                  marginBottom: 10,
                  letterSpacing: "-0.01em",
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: "rgba(200,240,203,0.5)",
                  lineHeight: 1.65,
                }}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
