import type { ReactNode } from "react";
import { theme } from "@/styles/theme";
import { InstallCommand, CodeBlock } from "@/components";

/**
 * Docs page (/docs) — sidebar nav + content.
 * Content is sourced from the pyros README and docs/getting-started.md.
 * The sidebar is generated from `SECTIONS`, so add/rename a section in one
 * place and both the nav and content stay in sync.
 */
const SECTIONS = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "quickstart", title: "Quickstart" },
  { id: "tools", title: "Engineering tools" },
  { id: "editors", title: "Use from your editor" },
  { id: "ci", title: "Continuous integration" },
  { id: "cli", title: "CLI reference" },
  { id: "troubleshooting", title: "Troubleshooting" },
];

// The deterministic engineering tools (README). Each cites a textbook.
const TOOLS = [
  { name: "compute_kinematics", cite: "Lynch & Park §5 · Yoshikawa 1985", desc: "Forward kinematics, the 6×n geometric Jacobian, manipulability w(q) and condition number κ(J) — singularities surfaced before the plan blows up." },
  { name: "compute_ik", cite: "Nakamura & Hanafusa 1986", desc: "Damped least-squares inverse kinematics with joint-limit projection; reports reachability, residual error and manipulability at the solution." },
  { name: "analyze_workspace", cite: "Monte-Carlo reachability", desc: "Samples joint space for max reach, reachable envelope/volume and a global dexterity measure. Reproducible for a fixed seed." },
  { name: "static_torques", cite: "gravity term g(q), validated vs m·g·L", desc: "Per-joint holding torque against gravity from link masses — the dominant static input to motor sizing." },
  { name: "compute_dynamics", cite: "recursive Newton–Euler · Craig §6 / Featherstone", desc: "The torque to move, not just hold: τ = M(q)q̈ + C(q,q̇)q̇ + g(q), split into gravity / inertial / Coriolis per joint." },
  { name: "size_actuator", cite: "real datasheet catalog", desc: "Motor × gearbox × ratio trade study across 10 motors and 3 gearbox families — peak (80% stall safety), RMS-thermal, torque-speed curve and mass budget." },
  { name: "select_controller", cite: "PID gain seeds from pole placement", desc: "Picks across PID, computed-torque, impedance, admittance, hybrid force/position, LQR, MPC, sliding-mode — with Kp/Ki/Kd starting numbers." },
  { name: "select_planner", cite: "10-dimension trade study", desc: "RRT family, PRM, A*, Hybrid-A*, CHOMP, STOMP, TrajOpt and more, scored for your task and cited to the source papers." },
  { name: "generate_ros2_control", cite: "zero drift", desc: "One URDF in, three files out that must agree: the <ros2_control> block, controllers.yaml, and a lifecycle launcher. Mock / Gazebo / real-hardware presets." },
  { name: "generate_bom", cite: "parts list from a URDF", desc: "Sizes an actuator for every joint, then emits a bill of materials: parts, total mass and a safety-aware build checklist." },
  { name: "power_budget", cite: "battery + bus sizing", desc: "From the sized actuators, recommends a battery (Wh/Ah), minimum discharge C-rating and fuse/bus rating for a target runtime." },
  { name: "explain_concept", cite: "33 cited topics", desc: "Curated textbook lookup — TL;DR, math, key insight, pitfalls and citation — across SE(3), FK/IK, control, planning, estimation, SLAM and more." },
];

export function DocsPage() {
  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "clamp(96px, 12vw, 128px) clamp(16px, 4vw, 40px) 96px",
      }}
    >
      <div className="docs-grid">
        {/* Sidebar */}
        <aside className="docs-sidebar">
          <div
            style={{
              fontFamily: theme.fonts.mono,
              fontSize: 11,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: theme.colors.textMuted,
              marginBottom: 16,
            }}
          >
            Documentation
          </div>
          <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                style={{
                  color: theme.colors.textSecondary,
                  textDecoration: "none",
                  fontSize: 14,
                  padding: "6px 10px",
                  borderRadius: 6,
                  borderLeft: `2px solid ${theme.colors.border}`,
                  transition: "color 0.15s, border-color 0.15s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = theme.colors.accent;
                  (e.currentTarget as HTMLElement).style.borderLeftColor = theme.colors.borderAccent;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = theme.colors.textSecondary;
                  (e.currentTarget as HTMLElement).style.borderLeftColor = theme.colors.border;
                }}
              >
                {s.title}
              </a>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main style={{ minWidth: 0 }}>
          <h1
            style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              color: theme.colors.textPrimary,
              marginBottom: 12,
            }}
          >
            Pyros Documentation
          </h1>
          <p
            style={{
              fontSize: 18,
              color: theme.colors.textSecondary,
              lineHeight: 1.6,
              fontWeight: 300,
              marginBottom: 56,
              maxWidth: 680,
            }}
          >
            Pyros is a local, ROS-native co-pilot for robotics engineers — it
            sizes the motor, picks the controller with gain numbers, solves the
            kinematics, generates valid ros2_control and budgets the battery,
            citing a textbook for every answer.
          </p>

          <DocsSection id="overview" title="Overview">
            <P>
              Pyros does the engineering a generic LLM can't fake. It's a deep,
              growing set of <strong>deterministic engineering tools</strong> that
              an agent orchestrates — not a chat wrapper. The numbers come from
              real computation over a real parts catalog, so they're reproducible
              and you can check the source.
            </P>
            <P>
              It's pure Python: <Code>pip install</Code> and go. Everything runs
              locally with <strong>no account, no sign-up and no API key</strong>.
              A <Code>pyros login</Code> exists if you want a session, but nothing
              requires one.
            </P>
            <Bullets
              items={[
                "Deterministic, cited robotics math — kinematics, dynamics, motor sizing, control and planning.",
                "Works on the file on disk, the bag on disk, the build output and the running system — a toolchain, not a chat wrapper.",
                "Local + MCP-native: plugs into your terminal, VS Code and agents like Claude Code, Cursor and Windsurf.",
              ]}
            />
            <Callout>
              Status: Beta — API stable, used in production by early teams. Report
              issues at{" "}
              <A href="https://github.com/RudranshG07/pyros">github.com/RudranshG07/pyros</A>.
            </Callout>
          </DocsSection>

          <DocsSection id="installation" title="Installation">
            <P>Pyros is pure Python and runs on macOS, Linux and Windows.</P>
            <div style={{ margin: "20px 0", maxWidth: 560 }}>
              <InstallCommand />
            </div>
            <P>
              The <Code>pip</Code> install is the simplest path. The bootstrap
              scripts (macOS/Linux and Windows) do an isolated install — they
              pip-install the same wheel into their own venv under{" "}
              <Code>~/.pyros</Code> and put a <Code>pyros</Code> launcher on your
              PATH, without touching your global Python. No Node, no npm.
            </P>
            <P>Verify the install:</P>
            <CodeBlock lang="bash" code={`pyros --version\npyros status`} />
          </DocsSection>

          <DocsSection id="quickstart" title="Quickstart">
            <P>The 60-second tour runs every tool against a bundled 3-link arm:</P>
            <CodeBlock lang="bash" code={`pyros robotics-demo`} />
            <P>
              It writes cited artifacts to <Code>./pyros-demo-output/</Code> —
              open <Code>showcase.md</Code> first; it's the index that links to
              the kinematics, motor-sizing plots, controller ranking, planner
              scorecard and a ready-to-splice ros2_control bundle.
            </P>
            <P>Run it against your own robot, or talk to the agent:</P>
            <CodeBlock
              lang="bash"
              code={`# Run the full report on your URDF\npyros robotics-demo --urdf path/to/my_robot.urdf --out my-report\n\n# Design a robot from a spec — writes a dynamics-ready URDF\npyros design-arm --dof 6 --payload 5 --reach 0.8\n\n# Or load a real robot with real CAD meshes and engineer it\npyros load-robot panda          # also: ur5e, ur10e\npyros load-robot panda --sim    # open it in the MuJoCo 3D viewer\n\n# Just talk to it\npyros\n> design the actuation for a 6-DOF arm that lifts 2 kg`}
            />
          </DocsSection>

          <DocsSection id="tools" title="Engineering tools">
            <P>
              Deterministic tools that out-reason any LLM-only assistant on the
              math a robotics engineer actually does. Every recommendation cites a
              textbook, and all are exposed via the CLI (hyphens) and MCP
              (underscores) over the same engine.
            </P>
            <div style={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 8 }}>
              {TOOLS.map((t) => (
                <Tool key={t.name} name={t.name} cite={t.cite} desc={t.desc} />
              ))}
            </div>
            <P style={{ marginTop: 20 }}>Call them individually, for example:</P>
            <CodeBlock
              lang="bash"
              code={`pyros compute-kinematics path/to/my_robot.urdf\npyros size-actuator --peak 4 --rms 1 --speed-rpm 60\npyros select-controller --task trajectory_tracking --plant-dof 6 \\\n    --model-available full --actuator-type torque\npyros select-planner --dof 7 --time-budget-ms 500 \\\n    --optimality-required asymptotic_optimal --narrow-passages\npyros generate-bom --urdf my_robot.urdf\npyros explain-concept "impedance control"`}
            />
          </DocsSection>

          <DocsSection id="editors" title="Use from your editor">
            <P>
              Pyros ships an MCP server, so the engineering brain is available
              inside the agent you already use — Claude Desktop, Cursor, Windsurf
              and Claude Code. No sign-in needed.
            </P>
            <P>Add it to your client's MCP config:</P>
            <CodeBlock
              lang="json"
              code={`{\n  "mcpServers": {\n    "pyros": { "command": "pyros-mcp" }\n  }\n}`}
            />
            <P>Or, for Claude Code:</P>
            <CodeBlock lang="bash" code={`claude mcp add pyros "$(which pyros-mcp)"`} />
            <P>
              Then ask the agent, e.g. <em>"Size the actuators for the arm in
              ~/work/robot_ws and pick a controller."</em> It calls the
              catalog-grounded, cited tools instead of guessing.
            </P>
            <P>
              Want the numbers next to the file instead of in a chat?{" "}
              <Code>pyros-lsp</Code> puts torque diagnostics directly on your URDF
              in VS Code, Cursor and Neovim.
            </P>
          </DocsSection>

          <DocsSection id="ci" title="Continuous integration">
            <P>
              Drop Pyros into CI to validate every URDF on every PR, comment the
              verdict and upload reports as artifacts. Exit codes propagate, so
              failing checks block the merge.
            </P>
            <CodeBlock
              lang="yaml"
              code={`name: pyros-ci\non: [pull_request]\njobs:\n  pyros:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-python@v5\n        with: { python-version: "3.12" }\n      - run: pip install pyros-robotics\n      - run: pyros ci --json --skip-build > pyros-ci.json`}
            />
            <P>
              Exit codes for <Code>validate-urdf</Code> and <Code>ci</Code>:{" "}
              <Code>0</Code> clean, <Code>1</Code> warnings, <Code>2</Code> errors.
              Both emit JSON with <Code>--json</Code>.
            </P>
          </DocsSection>

          <DocsSection id="cli" title="CLI reference">
            <P>Common commands — no LLM required:</P>
            <CodeBlock
              lang="bash"
              code={`# Repair a CAD-exported URDF (zero inertias, bad mesh paths, joint limits)\npyros fix-urdf robot.urdf --package my_robot_description\n\n# Deep-validate a URDF (kinematic, dynamic, geometry, control checks)\npyros validate-urdf robot.urdf\npyros validate-urdf robot.urdf --json\n\n# Run all health checks against a workspace\npyros ci -w ./my_robot_ws\n\n# Launch the MuJoCo viewer offline (no auth, no LLM, no network)\npyros sim-offline -w ./my_robot_ws\n\n# Forensics on running / past systems\npyros doctor                 # environment health\npyros analyze-bag run.mcap   # rosbag2 summary\npyros diagnose-qos           # DDS/QoS mismatch checks\npyros build-explain          # colcon errors → plain English`}
            />
            <P>
              Cross-platform setup uses profiles (<Code>core</Code>,{" "}
              <Code>mujoco</Code>, <Code>ros2</Code>, <Code>gazebo</Code>,{" "}
              <Code>full</Code>). ROS 2 and Gazebo remain native-stack
              dependencies; the container path is the recommended fallback on
              macOS/Windows:
            </P>
            <CodeBlock
              lang="bash"
              code={`pyros doctor --install-plan --profile full\npyros bootstrap --profile mujoco\npyros sim -w ./my_robot_ws --container`}
            />
          </DocsSection>

          <DocsSection id="troubleshooting" title="Troubleshooting">
            <P>
              Check environment health, then capture a portable report when filing
              an issue so OS, Python, ROS, MuJoCo, Gazebo, Docker and preflight
              results are all in one file:
            </P>
            <CodeBlock
              lang="bash"
              code={`pyros doctor --install-plan\npyros report --json -o pyros-report.json`}
            />
            <P>
              Then file at{" "}
              <A href="https://github.com/RudranshG07/pyros/issues">
                github.com/RudranshG07/pyros/issues
              </A>{" "}
              with the report attached.
            </P>
          </DocsSection>
        </main>
      </div>
    </div>
  );
}

/* ── Content helpers ─────────────────────────────────────────────────────── */

function DocsSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} style={{ scrollMarginTop: 96, marginBottom: 56 }}>
      <h2
        style={{
          fontSize: "clamp(22px, 3vw, 28px)",
          fontWeight: 600,
          letterSpacing: "-0.02em",
          color: theme.colors.textPrimary,
          marginBottom: 16,
          paddingBottom: 10,
          borderBottom: `1px solid ${theme.colors.border}`,
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function P({ children, style }: { children: ReactNode; style?: React.CSSProperties }) {
  return (
    <p
      style={{
        fontSize: 16,
        color: theme.colors.textSecondary,
        lineHeight: 1.7,
        fontWeight: 300,
        margin: "0 0 14px",
        ...style,
      }}
    >
      {children}
    </p>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul style={{ margin: "0 0 14px", paddingLeft: 22 }}>
      {items.map((it, i) => (
        <li
          key={i}
          style={{
            fontSize: 16,
            color: theme.colors.textSecondary,
            lineHeight: 1.7,
            fontWeight: 300,
            marginBottom: 6,
          }}
        >
          {it}
        </li>
      ))}
    </ul>
  );
}

function Tool({ name, cite, desc }: { name: string; cite: string; desc: string }) {
  return (
    <div style={{ padding: "12px 0", borderBottom: `1px solid ${theme.colors.border}` }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: 10, marginBottom: 4 }}>
        <code
          style={{
            fontFamily: theme.fonts.mono,
            fontSize: 14,
            color: theme.colors.accent,
            fontWeight: 500,
          }}
        >
          {name}
        </code>
        <span style={{ fontSize: 12, color: theme.colors.textMuted, fontStyle: "italic" }}>
          {cite}
        </span>
      </div>
      <P style={{ margin: 0, fontSize: 15 }}>{desc}</P>
    </div>
  );
}

function Code({ children }: { children: ReactNode }) {
  return (
    <code
      style={{
        fontFamily: theme.fonts.mono,
        fontSize: "0.9em",
        color: theme.colors.accent,
        background: "rgba(91,194,231,0.08)",
        border: `1px solid ${theme.colors.border}`,
        borderRadius: 5,
        padding: "1px 6px",
      }}
    >
      {children}
    </code>
  );
}

function A({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{ color: theme.colors.accent, textDecoration: "none" }}
    >
      {children}
    </a>
  );
}

function Callout({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        marginTop: 20,
        padding: "14px 18px",
        background: theme.colors.bgElev,
        border: `1px solid ${theme.colors.border}`,
        borderLeft: `3px solid ${theme.colors.borderAccent}`,
        borderRadius: 8,
        fontSize: 15,
        color: theme.colors.textSecondary,
        lineHeight: 1.6,
        fontWeight: 300,
      }}
    >
      {children}
    </div>
  );
}
