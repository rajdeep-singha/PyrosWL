import { useState } from "react";
import { theme } from "@/styles/theme";

const faqs = [
  {
    q: "What exactly is Pyros?",
    a: "A robotics IDE: a URDF editor with a live 3D view, a physics engine that checks torque and loads as you work, and an AI agent that can redesign, validate and write ROS packages for you — all in one window.",
  },
  {
    q: "What does the physics engine actually check?",
    a: "Per-joint torque budgets across the full range of motion, loads and limits, and whether each actuator has real margin. These are fast closed-form engineering checks — grounded numbers, not FEA and not guesses.",
  },
  {
    q: "Which frameworks and formats does it support?",
    a: "URDF and ROS / ROS 2 first, working alongside Gazebo, Isaac Sim and MoveIt 2. It exports STEP and STL for every made part, plus a full bill of materials next to your package.",
  },
  {
    q: "Which AI model powers the agent?",
    a: "The agent runs on frontier models like Claude. The model plans the work and the pyros engine does the math — so every conclusion is checked against the physics, not just the text.",
  },
  {
    q: "Does my design or data leave my machine?",
    a: "Pyros is built to run close to your work. During early access we work directly with teams on data-handling and deployment, including on-prem and air-gapped setups.",
  },
  {
    q: "How do I get access?",
    a: "We're opening access to a small group of robotics teams first. Join the waitlist below and we'll be in touch — no credit card, no spam.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      style={{
        padding: "clamp(56px, 9vw, 110px) clamp(16px, 4vw, 40px)",
        borderTop: `1px solid ${theme.colors.border}`,
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "clamp(32px, 6vw, 56px)" }}>
          <div
            style={{
              fontFamily: theme.fonts.mono,
              fontSize: 12,
              color: theme.colors.accent,
              letterSpacing: "0.15em",
              marginBottom: 16,
            }}
          >
            FAQ
          </div>
          <h2
            style={{
              fontSize: "clamp(24px, 5vw, 44px)",
              fontWeight: 600,
              color: theme.colors.textPrimary,
              letterSpacing: "-0.02em",
            }}
          >
            Questions, answered
          </h2>
        </div>

        <div style={{ borderTop: `1px solid ${theme.colors.border}` }}>
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="faq-item">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  style={{
                    width: "100%",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: "clamp(18px, 3vw, 24px) 4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                    textAlign: "left",
                  }}
                  aria-expanded={isOpen}
                >
                  <span
                    style={{
                      fontSize: "clamp(15px, 3vw, 18px)",
                      fontWeight: 500,
                      color: isOpen
                        ? theme.colors.accent
                        : theme.colors.textPrimary,
                      transition: "color 0.2s",
                    }}
                  >
                    {item.q}
                  </span>
                  <span
                    style={{
                      color: theme.colors.accent,
                      fontSize: 18,
                      flexShrink: 0,
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      transition: "transform 0.2s",
                      fontFamily: theme.fonts.mono,
                    }}
                  >
                    +
                  </span>
                </button>
                <div
                  style={{
                    maxHeight: isOpen ? 320 : 0,
                    opacity: isOpen ? 1 : 0,
                    overflow: "hidden",
                    transition: "max-height 0.3s ease, opacity 0.3s ease",
                  }}
                >
                  <p
                    style={{
                      fontSize: "clamp(14px, 2.6vw, 16px)",
                      color: theme.colors.textSecondary,
                      lineHeight: 1.7,
                      fontWeight: 300,
                      padding: "0 4px clamp(18px, 3vw, 24px)",
                    }}
                  >
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
