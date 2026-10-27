"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "footer-tulsi";
const STAGES = ["·", "🌱", "🌿", "🌷", "🌹"] as const;

export default function FooterPlant() {
  const [stage, setStage] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = Number(window.localStorage.getItem(STORAGE_KEY));
    if (Number.isInteger(stored) && stored >= 0 && stored < STAGES.length) {
      setStage(stored);
    }
    setReady(true);
  }, []);

  return (
    <button
      type="button"
      aria-label="Water the tulsi"
      title="Water the tulsi"
      className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background px-1.5 text-sm leading-none text-primary transition-transform hover:scale-110"
      onClick={() => {
        const next = Math.min(stage + 1, STAGES.length - 1);
        setStage(next);
        window.localStorage.setItem(STORAGE_KEY, String(next));
      }}
    >
      <span aria-hidden="true">{ready ? STAGES[stage] : "·"}</span>
    </button>
  );
}
