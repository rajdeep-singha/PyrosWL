import { useState } from "react";
import { theme } from "@/styles/theme";

export interface InstallOption {
  id: string;
  label: string;
  command: string;
}

// Default install commands (source of truth: pyros README).
const DEFAULT_OPTIONS: InstallOption[] = [
  { id: "pip", label: "pip", command: 'pip install "pyros-robotics[all]"' },
  { id: "unix", label: "macOS / Linux", command: "curl -fsSL https://www.getpyros.com/install.sh | bash" },
  { id: "windows", label: "Windows", command: "irm https://www.getpyros.com/install.ps1 | iex" },
];

interface InstallCommandProps {
  options?: InstallOption[];
}

export function InstallCommand({ options = DEFAULT_OPTIONS }: InstallCommandProps) {
  const [activeTab, setActiveTab] = useState(options[0]?.id);
  const [copied, setCopied] = useState(false);

  const active = options.find((o) => o.id === activeTab) ?? options[0];

  const handleCopy = async () => {
    if (!active) return;
    await navigator.clipboard.writeText(active.command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        background: theme.colors.bgElev,
        border: `1px solid ${theme.colors.borderMed}`,
        borderRadius: 12,
        overflow: "hidden",
        width: "100%",
      }}
    >
      {/* Tabs */}
      <div
        style={{
          display: "flex",
          borderBottom: `1px solid ${theme.colors.border}`,
          background: theme.colors.bgElev2,
        }}
      >
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => setActiveTab(opt.id)}
            style={{
              flex: 1,
              padding: "10px 8px",
              background: activeTab === opt.id ? "rgba(91,194,231,0.08)" : "transparent",
              border: "none",
              borderBottom:
                activeTab === opt.id
                  ? `2px solid ${theme.colors.accent}`
                  : "2px solid transparent",
              color: activeTab === opt.id ? theme.colors.accent : theme.colors.textMuted,
              fontFamily: theme.fonts.mono,
              fontSize: "clamp(10px, 2.5vw, 12px)",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Code display */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "clamp(12px, 3vw, 16px) clamp(12px, 3vw, 20px)",
          gap: 8,
        }}
      >
        <code
          style={{
            fontFamily: theme.fonts.mono,
            fontSize: "clamp(11px, 2.5vw, 13px)",
            color: theme.colors.accent,
            flex: 1,
            overflow: "auto",
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ color: theme.colors.textDim, userSelect: "none" }}>$ </span>
          {active?.command}
        </code>

        <button
          onClick={handleCopy}
          style={{
            background: "rgba(91,194,231,0.1)",
            border: `1px solid ${theme.colors.border}`,
            borderRadius: 6,
            padding: "6px 10px",
            color: copied ? theme.colors.accent : theme.colors.textSecondary,
            fontFamily: theme.fonts.mono,
            fontSize: "clamp(10px, 2vw, 11px)",
            cursor: "pointer",
            transition: "all 0.15s",
            display: "flex",
            alignItems: "center",
            gap: 4,
            flexShrink: 0,
          }}
        >
          {copied ? <><span>✓</span> Copied</> : <><span>⎘</span> Copy</>}
        </button>
      </div>
    </div>
  );
}
