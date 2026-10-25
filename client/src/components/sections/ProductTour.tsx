import { theme } from "@/styles/theme";

type Block = {
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  img: string;
  alt: string;
};

const blocks: Block[] = [
  {
    eyebrow: "THE IDE",
    title: "Code, 3D and physics in one view",
    body: "Edit the URDF and the robot renders in 3D right beside it — built from the exact file you're editing. Live torque checks run underneath as you type.",
    bullets: [
      "URDF editor with the 3D view built from your file",
      "Inspector for every joint, link, load and limit",
      "Torque budget, TF, topics and logs in one panel",
    ],
    img: "/assets/shots/ide.jpg",
    alt: "Pyros IDE with URDF editor, 3D robot view and inspector",
  },
  {
    eyebrow: "PHYSICS, LIVE",
    title: "Change the payload. Watch it hold — or fail.",
    body: "Raise the payload from 3 to 8 kg and every joint's torque budget recomputes instantly. Overloaded joints turn red the moment the math stops working.",
    bullets: [
      "Required-vs-rated torque across the full range",
      "Instant red/green verdict per joint — no spreadsheets",
      "“Can't hold it” flagged before you ever build",
    ],
    img: "/assets/shots/physics.jpg",
    alt: "Live torque budget showing joints over their rated limit",
  },
  {
    eyebrow: "THE INSPECTOR",
    title: "Jump to a failing joint — and the parts that fit",
    body: "One click takes you to the overloaded joint. Pyros ranks the actuators that actually fit it by margin, so you swap in a real part and re-check in seconds.",
    bullets: [
      "Per-joint limits, load and margin at a glance",
      "“Actuators that fit”, ranked by real headroom",
      "One click to apply and re-verify",
    ],
    img: "/assets/shots/inspector.jpg",
    alt: "Inspector with an actuators-that-fit list ranked by margin",
  },
  {
    eyebrow: "THE AGENT",
    title: "The model plans. The engine does the math.",
    body: "An AI agent redesigns the arm, validates the URDF and writes the ROS package for you. Every number is checked by the pyros engine — grounded, not guessed.",
    bullets: [
      "Plans multi-step work: redesign → check → write → validate",
      "Every claim verified by torque_budget & validate_urdf",
      "Shows the full diff before anything is committed",
    ],
    img: "/assets/shots/agent.jpg",
    alt: "AI agent planning a redesign with engine-checked results and a file diff",
  },
  {
    eyebrow: "MAKE IT",
    title: "Every part, ready as a STEP file",
    body: "Pyros draws each part from its STL and writes the files you need to manufacture — STEP and STL for every made part, plus a full bill of materials.",
    bullets: [
      "STEP + STL export for every custom part",
      "BOM.md generated next to the package",
      "Parts drawn to real dimensions from the model",
    ],
    img: "/assets/shots/make.jpg",
    alt: "A manufacturable part rendered from its STL in the 3D view",
  },
  {
    eyebrow: "RUN IT",
    title: "Run it in sim, carrying its payload",
    body: "Launch straight into Gazebo under real gravity and drive each joint while the arm holds its 8 kg payload — the same model you just designed and checked.",
    bullets: [
      "One step from URDF to a running simulation",
      "Drag joint targets, real-time physics",
      "Validate behaviour before it touches hardware",
    ],
    img: "/assets/shots/run.jpg",
    alt: "The robot arm running in Gazebo simulation carrying its payload",
  },
];

export function ProductTour() {
  return (
    <section
      id="features"
      style={{
        padding: "clamp(56px, 9vw, 110px) clamp(16px, 4vw, 40px)",
        borderTop: `1px solid ${theme.colors.border}`,
      }}
    >
      <div
        id="tour"
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(56px, 10vw, 120px)",
        }}
      >
        {blocks.map((b, i) => (
          <div
            key={b.title}
            className={`feature-block ${i % 2 === 1 ? "reverse" : ""}`}
          >
            <div className="feature-block-text">
              <div
                style={{
                  fontFamily: theme.fonts.mono,
                  fontSize: 12,
                  color: theme.colors.accent,
                  letterSpacing: "0.15em",
                  marginBottom: 16,
                }}
              >
                {b.eyebrow}
              </div>
              <h3
                style={{
                  fontSize: "clamp(24px, 3.5vw, 38px)",
                  fontWeight: 600,
                  color: theme.colors.textPrimary,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.15,
                  marginBottom: 18,
                }}
              >
                {b.title}
              </h3>
              <p
                style={{
                  fontSize: "clamp(15px, 2vw, 17px)",
                  color: theme.colors.textSecondary,
                  lineHeight: 1.7,
                  fontWeight: 300,
                  marginBottom: 24,
                }}
              >
                {b.body}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {b.bullets.map((item) => (
                  <div
                    key={item}
                    style={{ display: "flex", gap: 12, alignItems: "flex-start" }}
                  >
                    <span
                      style={{
                        color: theme.colors.accent,
                        fontFamily: "monospace",
                        marginTop: 2,
                        fontSize: 14,
                      }}
                    >
                      ▸
                    </span>
                    <span
                      style={{ color: theme.colors.textSecondary, fontSize: 15 }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="feature-block-visual">
              <div
                style={{
                  borderRadius: 14,
                  overflow: "hidden",
                  border: `1px solid ${theme.colors.borderMed}`,
                  boxShadow:
                    "0 24px 64px rgba(0,0,0,0.5), 0 0 70px rgba(91,194,231,0.08)",
                  background: theme.colors.bgElev,
                }}
              >
                <img
                  src={b.img}
                  alt={b.alt}
                  loading="lazy"
                  style={{ display: "block", width: "100%", height: "auto" }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
