import { useState } from "react";
import { theme } from "./theme";

const installOptions = [
  {
    id: "bash",
    label: "Bash",
    command: "curl -fsSL https://raw.githubusercontent.com/RudranshG07/pyros/main/install.sh | bash",
  },
  {
    id: "pip",
    label: "Python",
    command: "pip install pyros-cli",
  },
  {
    id: "powershell",
    label: "PowerShell",
    command: "irm https://pyros.dev/install.ps1 | iex",
  },
];

export function InstallCode() {
  const [activeTab, setActiveTab] = useState("bash");
  const [copied, setCopied] = useState(false);

  const activeOption = installOptions.find((opt) => opt.id === activeTab);

  const handleCopy = async () => {
    if (activeOption) {
      await navigator.clipboard.writeText(activeOption.command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      style={{
        background: "#060e07",
        border: `1px solid ${theme.colors.borderMed}`,
        borderRadius: 12,
        overflow: "hidden",
        maxWidth: 520,
        margin: "0 auto",
      }}
    >
      {/* Tabs */}
      <div
        style={{
          display: "flex",
          borderBottom: `1px solid ${theme.colors.border}`,
          background: theme.colors.bgDark,
        }}
      >
        {installOptions.map((opt) => (
          <button
            key={opt.id}
            onClick={() => setActiveTab(opt.id)}
            style={{
              flex: 1,
              padding: "10px 16px",
              background:
                activeTab === opt.id
                  ? "rgba(134,242,143,0.08)"
                  : "transparent",
              border: "none",
              borderBottom:
                activeTab === opt.id
                  ? `2px solid ${theme.colors.accent}`
                  : "2px solid transparent",
              color:
                activeTab === opt.id
                  ? theme.colors.accent
                  : "rgba(200,240,203,0.5)",
              fontFamily: theme.fonts.mono,
              fontSize: 12,
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Code Display */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 20px",
          gap: 12,
        }}
      >
        <code
          style={{
            fontFamily: theme.fonts.mono,
            fontSize: 13,
            color: theme.colors.accent,
            flex: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {activeOption?.command}
        </code>

        <button
          onClick={handleCopy}
          style={{
            background: "rgba(134,242,143,0.1)",
            border: `1px solid ${theme.colors.border}`,
            borderRadius: 6,
            padding: "6px 12px",
            color: copied ? theme.colors.accent : "rgba(200,240,203,0.6)",
            fontFamily: theme.fonts.mono,
            fontSize: 11,
            cursor: "pointer",
            transition: "all 0.15s",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          {copied ? (
            <>
              <span>✓</span> Copied
            </>
          ) : (
            <>
              <span>⎘</span> Copy
            </>
          )}
        </button>
      </div>
    </div>
  );
}
