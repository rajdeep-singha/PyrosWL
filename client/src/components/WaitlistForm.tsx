import { useState } from "react";
import { supabase } from "../lib/supabase";
import { theme } from "./theme";

interface WaitlistFormProps {
  compact?: boolean;
}

export function WaitlistForm({ compact }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setErrorMsg("");

    const { error } = await supabase.from("waitlist").insert([{ email }]);

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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          color: theme.colors.green,
          fontFamily: theme.fonts.mono,
          fontSize: compact ? 13 : 14,
        }}
      >
        <span style={{ fontSize: 18 }}>✓</span>
        <span>You're on the list. We'll be in touch.</span>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: 10 }}
    >
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="your@email.com"
          required
          style={{
            background: "rgba(134,242,143,0.04)",
            border: `1px solid ${focused ? theme.colors.borderMed : theme.colors.border}`,
            borderRadius: 8,
            padding: compact ? "10px 14px" : "13px 18px",
            color: "#e2f5e4",
            fontSize: compact ? 13 : 14,
            fontFamily: theme.fonts.mono,
            outline: "none",
            width: compact ? 220 : 280,
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            background: theme.colors.accent,
            color: "#060e07",
            border: "none",
            borderRadius: 8,
            padding: compact ? "10px 20px" : "13px 26px",
            fontWeight: 700,
            fontSize: compact ? 13 : 14,
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
            fontFamily: theme.fonts.mono,
          }}
        >
          {loading ? "Joining..." : "Join Waitlist →"}
        </button>
      </div>

      {errorMsg && (
        <span
          style={{
            color: "#f87171",
            fontSize: 12,
            fontFamily: theme.fonts.mono,
          }}
        >
          {errorMsg}
        </span>
      )}
    </form>
  );
}
