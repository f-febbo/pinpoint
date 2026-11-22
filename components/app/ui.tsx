"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

export const ease = [0.23, 1, 0.32, 1] as const; // strong ease-out
export const easeInOut = [0.77, 0, 0.175, 1] as const;

const s = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
type P = { className?: string };

export const Icon = {
  today: ({ className = "size-[18px]" }: P) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...s}>
      <rect x="3.5" y="5" width="17" height="15" rx="3" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </svg>
  ),
  ask: ({ className = "size-[18px]" }: P) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...s}>
      <path d="M12 3.5l1.6 4.4 4.4 1.6-4.4 1.6L12 15.5l-1.6-4.4L6 9.5l4.4-1.6z" />
      <path d="M18.5 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z" />
    </svg>
  ),
  recordings: ({ className = "size-[18px]" }: P) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...s}>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5.5 11a6.5 6.5 0 0013 0M12 17.5V21" />
    </svg>
  ),
  follow: ({ className = "size-[18px]" }: P) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...s}>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <path d="M8.5 12.2l2.3 2.3 4.7-5" />
    </svg>
  ),
  people: ({ className = "size-[18px]" }: P) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...s}>
      <circle cx="9" cy="9" r="3.2" />
      <path d="M3.5 19a5.5 5.5 0 0111 0M15.5 6.2a3 3 0 010 5.6M17 14.5a5 5 0 013.5 4.5" />
    </svg>
  ),
  places: ({ className = "size-[18px]" }: P) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...s}>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0113 0c0 5.4-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.3" />
    </svg>
  ),
  notes: ({ className = "size-[18px]" }: P) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...s}>
      <path d="M6 3.5h8.5L19 8v12.5H6z" />
      <path d="M14 3.5V8h5M9 12.5h6M9 16h4" />
    </svg>
  ),
  settings: ({ className = "size-[18px]" }: P) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...s}>
      <path d="M4 7h10M18 7h2M4 17h4M12 17h8" />
      <circle cx="16" cy="7" r="2.2" />
      <circle cx="10" cy="17" r="2.2" />
    </svg>
  ),
  search: ({ className = "size-4" }: P) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...s}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4 4" />
    </svg>
  ),
  bell: ({ className = "size-[18px]" }: P) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...s}>
      <path d="M6 16.5V11a6 6 0 0112 0v5.5l1.5 2h-15z" />
      <path d="M10 20.5a2.2 2.2 0 004 0" />
    </svg>
  ),
  walk: ({ className = "size-4" }: P) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...s}>
      <circle cx="13" cy="4.5" r="1.8" />
      <path d="M10 21l2-6 3 3v3M8.5 12.5L10 8.5l3.5-1 2.5 3.5 3 1M10 8.5L7 10l-1 3" />
    </svg>
  ),
  wave: ({ className = "size-4" }: P) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...s}>
      <path d="M3 12h1.5M7 8.5v7M11 5v14M15 8v8M19 10.5v3M21 12h0" />
    </svg>
  ),
  mic: ({ className = "size-4" }: P) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...s}>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5.5 11a6.5 6.5 0 0013 0" />
    </svg>
  ),
  phone: ({ className = "size-4" }: P) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...s}>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.8" />
      <path d="M10.5 18.5h3" />
    </svg>
  ),
  bolt: ({ className = "size-4" }: P) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...s}>
      <path d="M13 2.5L5 13.5h6l-1 8 8-11h-6z" />
    </svg>
  ),
  lock: ({ className = "size-4" }: P) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...s}>
      <rect x="5" y="10.5" width="14" height="10" rx="2.5" />
      <path d="M8.5 10.5V8a3.5 3.5 0 017 0v2.5" />
    </svg>
  ),
  alert: ({ className = "size-4" }: P) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...s}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5v5M12 16.2v.1" />
    </svg>
  ),
  chevron: ({ className = "size-4" }: P) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...s}>
      <path d="M7 10l5 5 5-5" />
    </svg>
  ),
  check: ({ className = "size-3" }: P) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...s} strokeWidth={3}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  ),
  play: ({ className = "size-3.5" }: P) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M8 5.5v13l10.5-6.5z" />
    </svg>
  ),
};

export function Battery({ level = 0.82 }: { level?: number }) {
  return (
    <svg viewBox="0 0 26 14" className="h-3 w-[22px]" aria-hidden>
      <rect x="0.75" y="0.75" width="21.5" height="12.5" rx="3.5" fill="none" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.5" />
      <rect x="23.5" y="4.5" width="2" height="5" rx="1" fill="currentColor" fillOpacity="0.5" />
      <rect x="3" y="3" width={17 * level} height="8" rx="1.8" fill="var(--color-g-mint)" />
    </svg>
  );
}

export function Card({ title, aside, children, className = "" }: { title?: ReactNode; aside?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div className={`g-card rounded-[18px] p-5 ${className}`}>
      {title && (
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="text-[15px] font-medium tracking-[-0.01em]">{title}</p>
          {aside}
        </div>
      )}
      {children}
    </div>
  );
}

const tints: Record<string, string> = {
  P: "bg-g-lilac/20 text-g-lilac",
  S: "bg-g-mint/20 text-g-mint",
  D: "bg-g-peach/20 text-g-peach",
  O: "bg-g-sky/20 text-g-sky",
  J: "bg-g-rose/20 text-g-rose",
};

export function Avatar({ name, size = "size-7" }: { name: string; size?: string }) {
  const initial = name[0];
  return (
    <span className={`grid ${size} shrink-0 place-items-center rounded-full text-[11px] font-semibold ${tints[initial] ?? "bg-white/10 text-g-text"}`}>
      {name
        .split(" ")
        .map((p) => p[0])
        .join("")
        .slice(0, 2)}
    </span>
  );
}

/** Toggle whose knob stretches 12% while it travels. */
export function Toggle({ on }: { on: boolean }) {
  return (
    <span className={`relative inline-flex h-[22px] w-[38px] shrink-0 items-center rounded-full p-[3px] transition-colors duration-200 ${on ? "bg-g-sky" : "bg-white/12"}`}>
      <motion.span
        className="size-4 rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.35)]"
        initial={false}
        animate={{ x: on ? 16 : 0, scaleX: [1, 1.12, 1] }}
        transition={{ x: { duration: 0.22, ease: easeInOut }, scaleX: { duration: 0.22, times: [0, 0.5, 1] } }}
        style={{ originX: on ? 1 : 0 }}
      />
    </span>
  );
}
