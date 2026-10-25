import { theme } from "@/styles/theme";

const stack = [
  "ROS",
  "ROS 2",
  "Gazebo",
  "Isaac Sim",
  "MoveIt 2",
  "Docker",
  "Ubuntu",
  "NVIDIA Jetson",
];

export function Ecosystem() {
  return (
    <section
      style={{
        padding: "clamp(40px, 6vw, 64px) clamp(16px, 4vw, 40px)",
        borderTop: `1px solid ${theme.colors.border}`,
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          style={{
            textAlign: "center",
            fontFamily: theme.fonts.mono,
            fontSize: 12,
            color: theme.colors.textMuted,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "clamp(24px, 4vw, 36px)",
          }}
        >
          Works with your entire robotics stack
        </div>
        <div className="logos-row">
          {stack.map((name) => (
            <span
              key={name}
              style={{
                fontFamily: theme.fonts.mono,
                fontSize: "clamp(13px, 2.5vw, 15px)",
                color: theme.colors.textSecondary,
                border: `1px solid ${theme.colors.border}`,
                borderRadius: 100,
                padding: "8px 18px",
                background: theme.colors.bgElev,
                whiteSpace: "nowrap",
              }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
