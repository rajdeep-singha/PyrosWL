import { useState, useEffect } from "react";
import { theme } from "./theme";

const roles = [
  "robotics engineers",
  "ROS developers",
  "automation teams",
  "hardware hackers",
  "drone builders",
  "perception engineers",
];

const TYPING_SPEED = 80;
const DELETING_SPEED = 40;
const PAUSE_AFTER_TYPING = 2000;
const PAUSE_AFTER_DELETING = 300;

export function TypewriterText() {
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting" | "waiting">("typing");
  const [cursorVisible, setCursorVisible] = useState(true);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(interval);
  }, []);

  // Typing animation
  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout: number;

    switch (phase) {
      case "typing":
        if (text.length < currentRole.length) {
          timeout = window.setTimeout(() => {
            setText(currentRole.slice(0, text.length + 1));
          }, TYPING_SPEED);
        } else {
          setPhase("pausing");
        }
        break;

      case "pausing":
        timeout = window.setTimeout(() => {
          setPhase("deleting");
        }, PAUSE_AFTER_TYPING);
        break;

      case "deleting":
        if (text.length > 0) {
          timeout = window.setTimeout(() => {
            setText(text.slice(0, -1));
          }, DELETING_SPEED);
        } else {
          setPhase("waiting");
        }
        break;

      case "waiting":
        timeout = window.setTimeout(() => {
          setRoleIndex((i) => (i + 1) % roles.length);
          setPhase("typing");
        }, PAUSE_AFTER_DELETING);
        break;
    }

    return () => clearTimeout(timeout);
  }, [text, phase, roleIndex]);

  return (
    <span style={{ display: "inline-flex", alignItems: "baseline" }}>
      <span style={{ color: theme.colors.accent }}>{text}</span>
      <span
        style={{
          color: theme.colors.accent,
          opacity: cursorVisible ? 1 : 0,
          marginLeft: 2,
          fontWeight: 400,
        }}
      >
        |
      </span>
    </span>
  );
}
