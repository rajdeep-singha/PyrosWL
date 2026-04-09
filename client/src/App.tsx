import { useState, useEffect, useRef } from "react";
import { supabase } from "./lib/supabase";

const ACCENT = "#86f28f";
const ACCENT_DIM = "#4a9940";
const BG_DARK = "#0a1a0c";
const BG_CARD = "#0f2211";
const BG_CARD2 = "#0c1e0e";
const BORDER = "rgba(134,242,143,0.15)";
const BORDER_MED = "rgba(134,242,143,0.25)";

const terminalLines = [
  { delay: 0,   text: "> pyros init my_robot_ws",        color: ACCENT },
  { delay: 700, text: "✓ Scanning ROS2 workspace...",     color: "#6ee7b7" },
  { delay: 1400,text: "✓ 47 nodes indexed, 12 topics mapped", color: "#6ee7b7" },
  { delay: 2100,text: "> pyros debug /lidar/scan topic",  color: ACCENT },
  { delay: 2800,text: "⚠ Detected 340ms latency spike in sensor fusion", color: "#fbbf24" },
  { delay: 3500,text: "→ Root cause: EKF covariance drift at t=14.2s", color: "#94a3b8" },
  { delay: 4200,text: "> pyros fix --apply",              color: ACCENT },
  { delay: 4900,text: "✓ Patch applied. Latency reduced to 18ms", color: "#86f28f" },
];

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

const steps = [
  { num: "01", title: "Install in seconds", body: "One command. Works on any Linux environment, from your dev laptop to your robot's onboard computer." },
  { num: "02", title: "Point it at your workspace", body: "Pyros maps your ROS graph, reads your code, and builds a full model of your system — automatically." },
  { num: "03", title: "Ask. Debug. Ship.", body: "Use natural language to diagnose bugs, generate code, and iterate — all without leaving your terminal." },
];

function TerminalDemo() {
  const [visible, setVisible] = useState([]);
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    const timers = terminalLines.map((line, i) =>
      setTimeout(() => setVisible(v => [...v, i]), line.delay + 600)
    );
    const cursorTimer = setInterval(() => setCursor(c => !c), 530);
    return () => { timers.forEach(clearTimeout); clearInterval(cursorTimer); };
  }, []);

  return (
    <div style={{
      background: "#060e07",
      border: `1px solid ${BORDER_MED}`,
      borderRadius: 12,
      fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
      fontSize: 13,
      lineHeight: 1.7,
      padding: "0",
      overflow: "hidden",
      boxShadow: `0 0 60px rgba(134,242,143,0.06), 0 0 0 1px ${BORDER}`,
    }}>
      <div style={{
        background: "#0a1a0c",
        borderBottom: `1px solid ${BORDER}`,
        padding: "10px 16px",
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}>
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#3a3a3a", display: "inline-block" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#3a3a3a", display: "inline-block" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#3a3a3a", display: "inline-block" }} />
        <span style={{ marginLeft: 12, color: "rgba(134,242,143,0.4)", fontSize: 11 }}>pyros — bash</span>
      </div>
      <div style={{ padding: "20px 24px", minHeight: 220 }}>
        {terminalLines.map((line, i) =>
          visible.includes(i) ? (
            <div key={i} style={{ color: line.color, marginBottom: 2, opacity: 1, animation: "fadeUp 0.3s ease" }}>
              {line.text}
            </div>
          ) : null
        )}
        <span style={{ color: ACCENT, opacity: cursor ? 1 : 0 }}>█</span>
      </div>
    </div>
  );
}

function WaitlistForm({ compact }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setErrorMsg("");

    const { error } = await supabase
      .from("waitlist")
      .insert([{ email }]);

    if (error) {
      if (error.code === "23505") {
        setErrorMsg("You're already on the list 🚀");
      } else {
        setErrorMsg("Something went wrong. Try again.");
      }
      setLoading(false);
      return;
    }

    setSubmitted(true);
    setEmail("");
    setLoading(false);
  };

  if (submitted) {
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        color: ACCENT,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: compact ? 13 : 14,
      }}>
        <span style={{ fontSize: 18 }}>✓</span>
        <span>You're on the list. We'll be in touch.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="your@email.com"
          required
          style={{
            background: "rgba(134,242,143,0.04)",
            border: `1px solid ${focused ? BORDER_MED : BORDER}`,
            borderRadius: 8,
            padding: compact ? "10px 14px" : "13px 18px",
            color: "#e2f5e4",
            fontSize: compact ? 13 : 14,
            fontFamily: "'JetBrains Mono', monospace",
            outline: "none",
            width: compact ? 220 : 280,
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            background: ACCENT,
            color: "#060e07",
            border: "none",
            borderRadius: 8,
            padding: compact ? "10px 20px" : "13px 26px",
            fontWeight: 700,
            fontSize: compact ? 13 : 14,
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          {loading ? "Joining..." : "Join Waitlist →"}
        </button>
      </div>

      {errorMsg && (
        <span style={{
          color: "#f87171",
          fontSize: 12,
          fontFamily: "'JetBrains Mono', monospace"
        }}>
          {errorMsg}
        </span>
      )}
    </form>
  );
}

export default function PyrosWaitlist() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ background: BG_DARK, color: "#c8f0cb", minHeight: "100vh", fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%,100% { opacity: 0.4; } 50% { opacity: 1; } }
        @keyframes slideIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .hero-animate { animation: slideIn 0.7s cubic-bezier(0.16,1,0.3,1) both; }
        .hero-animate-2 { animation: slideIn 0.7s 0.15s cubic-bezier(0.16,1,0.3,1) both; }
        .hero-animate-3 { animation: slideIn 0.7s 0.3s cubic-bezier(0.16,1,0.3,1) both; }
        .hero-animate-4 { animation: slideIn 0.7s 0.45s cubic-bezier(0.16,1,0.3,1) both; }
        .feature-card:hover { border-color: rgba(134,242,143,0.3) !important; background: #122614 !important; }
        .feature-card { transition: border-color 0.2s, background 0.2s; }
        ::selection { background: rgba(134,242,143,0.25); color: #fff; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #0a1a0c; } ::-webkit-scrollbar-thumb { background: rgba(134,242,143,0.2); border-radius: 3px; }
        .grid-bg { background-image: linear-gradient(rgba(134,242,143,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(134,242,143,0.04) 1px, transparent 1px); background-size: 48px 48px; }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(10,26,12,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? `1px solid ${BORDER}` : "1px solid transparent",
        transition: "all 0.3s",
        padding: "0 40px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 64,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, border: `1.5px solid ${ACCENT}`, borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 16, color: ACCENT,
          }}>P</div>
          <span style={{ fontWeight: 600, fontSize: 16, color: ACCENT, letterSpacing: "0.12em", fontFamily: "'JetBrains Mono', monospace" }}>PYROS</span>
        </div>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {["Features", "How it works", "About"].map(l => (
            <a key={l} href="#" style={{ color: "rgba(200,240,203,0.55)", fontSize: 14, textDecoration: "none", transition: "color 0.15s" }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = ACCENT}
              onMouseLeave={e => (e.target as HTMLElement).style.color = "rgba(200,240,203,0.55)"}>{l}</a>
          ))}
          <a href="#waitlist" style={{
            background: "transparent", border: `1px solid ${BORDER_MED}`, color: ACCENT,
            padding: "7px 18px", borderRadius: 8, fontSize: 13, textDecoration: "none",
            fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, transition: "background 0.15s",
          }}
            onMouseEnter={e => (e.target as HTMLElement).style.background = "rgba(134,242,143,0.08)"}
            onMouseLeave={e => (e.target as HTMLElement).style.background = "transparent"}
          >Early Access</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="grid-bg" style={{ paddingTop: 140, paddingBottom: 100, textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-60%)",
          width: 700, height: 700, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(134,242,143,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px", position: "relative" }}>
          <div className="hero-animate" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(134,242,143,0.07)", border: `1px solid ${BORDER}`,
            borderRadius: 100, padding: "5px 14px", marginBottom: 32,
            fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "rgba(134,242,143,0.7)",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: ACCENT, animation: "pulse 2s infinite", display: "inline-block" }} />
            Now accepting early access requests
          </div>

          <h1 className="hero-animate-2" style={{
            fontSize: "clamp(42px, 6vw, 72px)", fontWeight: 600, lineHeight: 1.08,
            color: "#e8f9ea", letterSpacing: "-0.03em", marginBottom: 24,
          }}>
            The AI agent built<br />
            <span style={{ color: ACCENT }}>for robotics engineers</span>
          </h1>

          <p className="hero-animate-3" style={{
            fontSize: 18, color: "rgba(200,240,203,0.6)", lineHeight: 1.7,
            maxWidth: 560, margin: "0 auto 44px", fontWeight: 300,
          }}>
            Pyros lives in your terminal and understands your entire robot stack — ROS graphs, sensor pipelines, control loops, and everything in between.
          </p>

          <div className="hero-animate-4" style={{ display: "flex", justifyContent: "center", marginBottom: 60 }}>
            <WaitlistForm compact={undefined} />
          </div>

          <div className="hero-animate-4" style={{ maxWidth: 680, margin: "0 auto" }}>
            <TerminalDemo />
          </div>

          <div style={{ marginTop: 40, display: "flex", justifyContent: "center", gap: 40, flexWrap: "wrap" }}>
            {[["CLI-first", "No GUI required"], ["ROS / ROS2", "Native support"], ["Any hardware", "x86, ARM, RISC-V"]].map(([title, sub]) => (
              <div key={title} style={{ textAlign: "center" }}>
                <div style={{ color: ACCENT, fontWeight: 600, fontSize: 14, fontFamily: "'JetBrains Mono', monospace" }}>{title}</div>
                <div style={{ color: "rgba(200,240,203,0.4)", fontSize: 12, marginTop: 2 }}>{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUILT FOR SECTION */}
      <section style={{ padding: "80px 40px", borderTop: `1px solid ${BORDER}`, maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "rgba(134,242,143,0.5)", letterSpacing: "0.15em" }}>
            WHY PYROS
          </span>
          <div style={{ flex: 1, height: 1, background: BORDER }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 600, color: "#e8f9ea", lineHeight: 1.2, letterSpacing: "-0.02em", marginBottom: 20 }}>
              Robotics is too complex<br />for generic AI tools
            </h2>
            <p style={{ color: "rgba(200,240,203,0.55)", fontSize: 16, lineHeight: 1.75, fontWeight: 300 }}>
              General-purpose AI assistants don't understand distributed robot architectures, real-time constraints, or the nuance of a misconfigured TF tree.
              Pyros was trained on robotics codebases and built by engineers who've shipped real hardware.
            </p>
            <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                "Understands ROS concepts — not just syntax",
                "Debugs at the system level, not just the file level",
                "Generates code that accounts for real-time constraints",
              ].map(item => (
                <div key={item} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ color: ACCENT, fontFamily: "monospace", marginTop: 2, fontSize: 14 }}>▸</span>
                  <span style={{ color: "rgba(200,240,203,0.7)", fontSize: 15 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{
            background: BG_CARD, border: `1px solid ${BORDER}`,
            borderRadius: 16, padding: 32, fontFamily: "'JetBrains Mono', monospace", fontSize: 13,
          }}>
            {[
              ["# Generic AI", "rgba(200,240,203,0.3)", "14px"],
              [`$ ask-ai "why is my robot spinning?"`, "rgba(134,242,143,0.6)", "13px"],
              [`> "Check your motor controller..."`, "rgba(200,240,203,0.25)", "13px"],
              ["", "", ""],
              ["# Pyros", ACCENT, "14px"],
              [`$ pyros debug spinning_behavior`, "rgba(134,242,143,0.8)", "13px"],
              [`> Analysing /cmd_vel topic...`, "#6ee7b7", "13px"],
              [`> Found: odom→base_link TF 180° offset`, "#fbbf24", "13px"],
              [`> Fix: set rotation_offset: -3.14159`, ACCENT, "13px"],
              [`> Apply? [y/N]`, "rgba(200,240,203,0.5)", "13px"],
            ].map(([line, color, size], i) => (
              <div key={i} style={{ color, fontSize: size, marginBottom: line ? 4 : 12 }}>{line}</div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ padding: "80px 40px", borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "rgba(134,242,143,0.5)", letterSpacing: "0.15em", marginBottom: 16 }}>CAPABILITIES</div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 600, color: "#e8f9ea", letterSpacing: "-0.02em" }}>
              Everything your robot stack needs
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {features.map((f) => (
              <div key={f.title} className="feature-card" style={{
                background: BG_CARD2, border: `1px solid ${BORDER}`,
                borderRadius: 12, padding: "28px 28px",
              }}>
                <div style={{ fontSize: 24, color: ACCENT, marginBottom: 14, fontFamily: "monospace" }}>{f.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: "#e8f9ea", marginBottom: 10, letterSpacing: "-0.01em" }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: "rgba(200,240,203,0.5)", lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ padding: "80px 40px", borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "rgba(134,242,143,0.5)", letterSpacing: "0.15em", marginBottom: 16 }}>HOW IT WORKS</div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 600, color: "#e8f9ea", letterSpacing: "-0.02em" }}>
              Up and running in minutes
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: BORDER }}>
            {steps.map((step, i) => (
              <div key={step.num} style={{ background: BG_DARK, padding: "40px 36px" }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "rgba(134,242,143,0.35)", marginBottom: 16, letterSpacing: "0.1em" }}>{step.num}</div>
                <h3 style={{ fontSize: 20, fontWeight: 600, color: "#e8f9ea", marginBottom: 14, letterSpacing: "-0.01em" }}>{step.title}</h3>
                <p style={{ fontSize: 15, color: "rgba(200,240,203,0.5)", lineHeight: 1.7 }}>{step.body}</p>
                {i === 0 && (
                  <div style={{
                    marginTop: 24, fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
                    color: ACCENT_DIM, background: "rgba(134,242,143,0.06)",
                    padding: "8px 14px", borderRadius: 6, display: "inline-block",
                    border: `1px solid ${BORDER}`,
                  }}>
                    pip install pyros-cli
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="waitlist" style={{ padding: "100px 40px", borderTop: `1px solid ${BORDER}`, textAlign: "center" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "rgba(134,242,143,0.5)", letterSpacing: "0.15em", marginBottom: 24 }}>EARLY ACCESS</div>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 600, color: "#e8f9ea", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 20 }}>
            Be first to ship<br />with Pyros
          </h2>
          <p style={{ color: "rgba(200,240,203,0.5)", fontSize: 17, lineHeight: 1.7, marginBottom: 40, fontWeight: 300 }}>
            We're opening access to a small group of robotics engineers first. Join the waitlist and shape the product.
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <WaitlistForm compact={undefined} />
          </div>
          <p style={{ marginTop: 20, fontSize: 12, color: "rgba(200,240,203,0.25)", fontFamily: "'JetBrains Mono', monospace" }}>
            No spam. No credit card. Just early access.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${BORDER}`, padding: "32px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 24, height: 24, border: `1.5px solid rgba(134,242,143,0.4)`,
            borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 12, color: "rgba(134,242,143,0.4)",
          }}>P</div>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "rgba(134,242,143,0.3)", letterSpacing: "0.1em" }}>PYROS</span>
        </div>
        <span style={{ color: "rgba(200,240,203,0.2)", fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }}>
          CLI-first AI agent for robotics engineers
        </span>
        <div style={{ display: "flex", gap: 24 }}>
          {["Twitter", "GitHub", "Discord"].map(l => (
            <a key={l} href="#" style={{ color: "rgba(200,240,203,0.25)", fontSize: 12, textDecoration: "none",
              fontFamily: "'JetBrains Mono', monospace", transition: "color 0.15s" }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = ACCENT}
              onMouseLeave={e => (e.target as HTMLElement).style.color = "rgba(200,240,203,0.25)"}>{l}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}