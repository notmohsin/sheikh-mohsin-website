"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "footer-tulsi";
const STAGES = ["·", "🌱", "🌿", "🌷", "🌹"] as const;

// localStorage is the source of truth; this tiny store just lets React
// re-render the button when the same tab writes a new stage.
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function readStage(): number {
  try {
    const stored = Number(window.localStorage.getItem(STORAGE_KEY));
    if (Number.isInteger(stored) && stored >= 0 && stored < STAGES.length) {
      return stored;
    }
  } catch {
    // Private mode or blocked storage: start from the seed.
  }
  return 0;
}

function writeStage(stage: number) {
  try {
    window.localStorage.setItem(STORAGE_KEY, String(stage));
  } catch {
    // Still re-render so the click is visible this session.
  }
  for (const listener of listeners) listener();
}

// Server snapshot is null so SSR and the first client render both show the
// seed; the stored stage appears once hydration completes.
function getServerStage(): number | null {
  return null;
}

export default function FooterPlant() {
  const stage = useSyncExternalStore(subscribe, readStage, getServerStage);

  return (
    <button
      type="button"
      aria-label="Water the tulsi"
      title="Water the tulsi"
      className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background px-1.5 text-sm leading-none text-primary transition-transform hover:scale-110"
      onClick={() => {
        writeStage(Math.min((stage ?? 0) + 1, STAGES.length - 1));
      }}
    >
      <span aria-hidden="true">{stage === null ? "·" : STAGES[stage]}</span>
    </button>
  );
}
