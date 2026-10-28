import { useState } from "react";
import { theme } from "@/styles/theme";

interface CodeBlockProps {
  code: string;
  /** Optional language label shown top-right (e.g. "bash", "json", "yaml"). */
  lang?: string;
}

/** Multi-line code block with a copy button, matching the site theme. */
export function CodeBlock({ code, lang }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        position: "relative",
        background: theme.colors.bgElev,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: 10,
        margin: "0 0 16px",
      }}
    >
      {lang && (
        <span
          style={{
            position: "absolute",
            top: 8,
            right: 56,
            fontFamily: theme.fonts.mono,
            fontSize: 10,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: theme.colors.textDim,
          }}
        >
          {lang}
        </span>
      )}
      <button
        onClick={handleCopy}
        style={{
          position: "absolute",
          top: 6,
          right: 8,
          background: "rgba(91,194,231,0.1)",
          border: `1px solid ${theme.colors.border}`,
          borderRadius: 6,
          padding: "3px 8px",
          color: copied ? theme.colors.accent : theme.colors.textSecondary,
          fontFamily: theme.fonts.mono,
          fontSize: 11,
          cursor: "pointer",
          transition: "all 0.15s",
        }}
        aria-label="Copy code"
      >
        {copied ? "✓" : "⎘"}
      </button>
      <pre
        style={{
          margin: 0,
          padding: "16px 18px",
          overflowX: "auto",
          fontFamily: theme.fonts.mono,
          fontSize: 13,
          lineHeight: 1.6,
          color: theme.colors.textPrimary,
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}
