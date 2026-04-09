export const theme = {
  colors: {
    accent: "#86f28f",
    accentDim: "#4a9940",
    green: "#86f28f",
    greenDim: "#4a9940",
    bgDark: "#0a1a0c",
    bgCard: "#0f2211",
    bgCard2: "#0c1e0e",
    border: "rgba(134,242,143,0.15)",
    borderMed: "rgba(134,242,143,0.25)",
    textPrimary: "#e8f9ea",
    textSecondary: "rgba(200,240,203,0.6)",
    textMuted: "rgba(200,240,203,0.4)",
    textDim: "rgba(200,240,203,0.25)",
  },
  fonts: {
    mono: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
    sans: "'DM Sans', 'Helvetica Neue', sans-serif",
  },
};

export const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes pulse { 0%,100% { opacity: 0.4; } 50% { opacity: 1; } }
  @keyframes slideIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes typewriter { from { width: 0; } to { width: 100%; } }
  @keyframes blink { 0%,50% { opacity: 1; } 51%,100% { opacity: 0; } }
  .hero-animate { animation: slideIn 0.7s cubic-bezier(0.16,1,0.3,1) both; }
  .hero-animate-2 { animation: slideIn 0.7s 0.15s cubic-bezier(0.16,1,0.3,1) both; }
  .hero-animate-3 { animation: slideIn 0.7s 0.3s cubic-bezier(0.16,1,0.3,1) both; }
  .hero-animate-4 { animation: slideIn 0.7s 0.45s cubic-bezier(0.16,1,0.3,1) both; }
  .feature-card:hover { border-color: rgba(134,242,143,0.3) !important; background: #122614 !important; }
  .feature-card { transition: border-color 0.2s, background 0.2s; }
  ::selection { background: rgba(134,242,143,0.25); color: #fff; }
  ::-webkit-scrollbar { width: 6px; } 
  ::-webkit-scrollbar-track { background: #0a1a0c; } 
  ::-webkit-scrollbar-thumb { background: rgba(134,242,143,0.2); border-radius: 3px; }
  .grid-bg { background-image: linear-gradient(rgba(134,242,143,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(134,242,143,0.04) 1px, transparent 1px); background-size: 48px 48px; }
`;
