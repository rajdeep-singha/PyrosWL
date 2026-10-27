export const theme = {
  colors: {
    // Primary accent — cyan (matches the "easy" highlight)
    accent: "#5BC2E7",
    accentBright: "#7DD3F0",
    accentDim: "#3A8BA8",
    // Logo facet colors
    teal: "#4A7C9B",
    indigo: "#6B6B9E",
    // Surfaces
    bg: "#000000",
    bgElev: "#0A0A0C",
    bgElev2: "#0E0E12",
    // Borders
    border: "rgba(255,255,255,0.08)",
    borderMed: "rgba(255,255,255,0.14)",
    borderAccent: "rgba(91,194,231,0.30)",
    // Text
    textPrimary: "#EDEDED",
    textSecondary: "rgba(255,255,255,0.60)",
    textMuted: "rgba(255,255,255,0.40)",
    textDim: "rgba(255,255,255,0.25)",
    // Semantic
    warn: "#F0B64A",
    error: "#F87171",

    // Backward-compat aliases (map old green tokens to the new scheme)
    green: "#5BC2E7",
    greenDim: "#3A8BA8",
    bgDark: "#000000",
    bgCard: "#0A0A0C",
    bgCard2: "#0E0E12",
  },
  gradients: {
    accent: "linear-gradient(135deg,#5BC2E7 0%,#4A7C9B 50%,#6B6B9E 100%)",
  },
  fonts: {
    mono: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
    sans: "'DM Sans', 'Helvetica Neue', sans-serif",
    serif: "'Newsreader', Georgia, serif",
  },
};

export const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;700&family=Newsreader:ital,opsz,wght@1,6..72,400;1,6..72,500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes pulse { 0%,100% { opacity: 0.4; } 50% { opacity: 1; } }
  @keyframes slideIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes typewriter { from { width: 0; } to { width: 100%; } }
  @keyframes blink { 0%,50% { opacity: 1; } 51%,100% { opacity: 0; } }
  html, body { background: #000; }

  /* Background glow blobs — slow ambient drift (see Background.tsx) */
  @keyframes drift1 { from { transform: translate(0, 0); } to { transform: translate(-48px, 36px); } }
  @keyframes drift2 { from { transform: translate(0, 0); } to { transform: translate(44px, -30px); } }
  @keyframes drift3 { from { transform: translate(0, 0); } to { transform: translate(-32px, -40px); } }
  .bg-glow { will-change: transform; }
  .bg-glow-1 { animation: drift1 34s ease-in-out infinite alternate; }
  .bg-glow-2 { animation: drift2 42s ease-in-out infinite alternate; }
  .bg-glow-3 { animation: drift3 38s ease-in-out infinite alternate; }

  /* Circuit / PCB layer (see Background.tsx) */
  @keyframes pulseMove { from { stroke-dashoffset: 100; } to { stroke-dashoffset: 0; } }
  @keyframes nodePulse { 0%,100% { opacity: 0.25; transform: scale(1); } 50% { opacity: 0.85; transform: scale(1.7); } }
  .circuit-pulse { stroke-dasharray: 6 94; animation: pulseMove linear infinite; }
  .circuit-node-ring { transform-box: fill-box; transform-origin: center; animation: nodePulse ease-in-out infinite; }
  /* Hide the corner circuit clusters on small phones to keep them uncluttered */
  @media (max-width: 640px) { .bg-circuit { display: none; } }

  @media (prefers-reduced-motion: reduce) {
    .bg-glow-1, .bg-glow-2, .bg-glow-3,
    .circuit-pulse, .circuit-node-ring { animation: none; }
    .circuit-pulse { stroke-dashoffset: 0; }
  }
  .hero-animate { animation: slideIn 0.7s cubic-bezier(0.16,1,0.3,1) both; }
  .hero-animate-2 { animation: slideIn 0.7s 0.15s cubic-bezier(0.16,1,0.3,1) both; }
  .hero-animate-3 { animation: slideIn 0.7s 0.3s cubic-bezier(0.16,1,0.3,1) both; }
  .hero-animate-4 { animation: slideIn 0.7s 0.45s cubic-bezier(0.16,1,0.3,1) both; }
  .feature-card:hover { border-color: rgba(91,194,231,0.35) !important; background: #0E0E12 !important; }
  .feature-card { transition: border-color 0.2s, background 0.2s; }
  ::selection { background: rgba(91,194,231,0.25); color: #fff; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #000; }
  ::-webkit-scrollbar-thumb { background: rgba(91,194,231,0.2); border-radius: 3px; }
  .grid-bg { background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px); background-size: 32px 32px; }

  /* Responsive Grid Classes */
  .features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .steps-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(255,255,255,0.08); }
  .why-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
  .nav-links { display: flex; gap: 32px; align-items: center; }
  .nav-mobile-toggle { display: none; }
  .footer-content { display: flex; justify-content: space-between; align-items: center; }
  .hero-stats { display: flex; justify-content: center; gap: 40px; flex-wrap: wrap; }

  /* Ecosystem logos row */
  .logos-row { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 14px; }

  /* Split hero */
  .hero-split { display: grid; grid-template-columns: 1fr 1.08fr; gap: clamp(32px, 5vw, 64px); align-items: center; }

  /* Feature blocks (alternating text/visual) */
  .feature-block { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(32px, 6vw, 72px); align-items: center; }
  .feature-block.reverse .feature-block-text { order: 2; }
  .feature-block.reverse .feature-block-visual { order: 1; }

  /* Comparison table */
  .compare-grid { display: grid; grid-template-columns: 1.4fr 1fr 1fr; }

  /* FAQ */
  .faq-item { border-bottom: 1px solid rgba(255,255,255,0.08); }

  /* Docs page layout */
  .docs-grid { display: grid; grid-template-columns: 220px 1fr; gap: clamp(32px, 5vw, 64px); align-items: start; }
  .docs-sidebar { position: sticky; top: 96px; }

  /* Tablet (768px - 1024px) */
  @media (max-width: 1024px) {
    .features-grid { grid-template-columns: repeat(2, 1fr); }
    .why-grid { gap: 40px; }
  }

  /* Mobile (< 768px) */
  @media (max-width: 768px) {
    .features-grid { grid-template-columns: 1fr; }
    .steps-grid { grid-template-columns: 1fr; }
    .why-grid { grid-template-columns: 1fr; gap: 32px; }
    .hero-split { grid-template-columns: 1fr; gap: 36px; }
    .docs-grid { grid-template-columns: 1fr; gap: 24px; }
    .docs-sidebar { position: static; top: auto; }
    .hero-shot-wrap { margin-right: 0 !important; }
    .feature-block { grid-template-columns: 1fr; gap: 28px; }
    .feature-block.reverse .feature-block-text { order: 1; }
    .feature-block.reverse .feature-block-visual { order: 2; }
    .nav-links {
      display: none;
      position: absolute;
      top: 64px;
      left: 0;
      right: 0;
      background: rgba(0,0,0,0.98);
      flex-direction: column;
      padding: 20px;
      gap: 16px;
      border-bottom: 1px solid rgba(255,255,255,0.08);
    }
    .nav-links.open { display: flex; }
    .nav-mobile-toggle { display: flex; }
    .footer-content {
      flex-direction: column;
      gap: 24px;
      text-align: center;
    }
    .hero-stats { gap: 24px; }
  }
`;
